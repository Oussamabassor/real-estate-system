<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use MongoDB\Client;

class RestoreDatabase extends Command
{
    protected $signature = 'db:restore {backup} {--force}';
    protected $description = 'Restore the database from a backup file';

    public function handle()
    {
        $backup = $this->argument('backup');

        if (!$this->option('force')) {
            if (!$this->confirm('This will overwrite all existing data. Are you sure you want to continue?')) {
                return 1;
            }
        }

        $this->info('Restoring database from backup...');

        try {
            // Get MongoDB connection details
            $host = config('database.connections.mongodb.host');
            $port = config('database.connections.mongodb.port');
            $database = config('database.connections.mongodb.database');
            $username = config('database.connections.mongodb.username');
            $password = config('database.connections.mongodb.password');

            // Check if backup exists
            $backupPath = storage_path('app/backups');
            $filepath = "{$backupPath}/{$backup}";

            if (!file_exists($filepath)) {
                // Check if backup exists in storage
                if (Storage::disk(config('backup.storage_disk', 's3'))->exists("backups/{$backup}")) {
                    $this->info('Downloading backup from storage...');
                    Storage::disk(config('backup.storage_disk', 's3'))
                        ->get("backups/{$backup}", $filepath);
                } else {
                    $this->error("Backup file not found: {$backup}");
                    return 1;
                }
            }

            // Read backup file
            $backupData = json_decode(file_get_contents($filepath), true);

            // Connect to MongoDB
            $client = new Client("mongodb://{$username}:{$password}@{$host}:{$port}/{$database}");

            // Drop existing collections
            $this->info('Dropping existing collections...');
            $collections = $client->selectDatabase($database)->listCollections();
            foreach ($collections as $collection) {
                $client->selectDatabase($database)
                    ->selectCollection($collection->getName())
                    ->drop();
            }

            // Restore each collection
            foreach ($backupData as $collection => $documents) {
                $this->info("Restoring collection: {$collection}");
                if (!empty($documents)) {
                    $client->selectDatabase($database)
                        ->selectCollection($collection)
                        ->insertMany($documents);
                }
            }

            $this->info('Database restored successfully!');

        } catch (\Exception $e) {
            $this->error('Restore failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 