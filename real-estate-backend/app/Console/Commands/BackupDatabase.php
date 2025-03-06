<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use MongoDB\Client;

class BackupDatabase extends Command
{
    protected $signature = 'db:backup {--path=}';
    protected $description = 'Generate a backup of the MongoDB database';

    public function handle()
    {
        $this->info('Generating database backup...');

        try {
            // Get MongoDB connection details
            $host = config('database.connections.mongodb.host');
            $port = config('database.connections.mongodb.port');
            $database = config('database.connections.mongodb.database');
            $username = config('database.connections.mongodb.username');
            $password = config('database.connections.mongodb.password');

            // Create backup directory if it doesn't exist
            $backupPath = $this->option('path') ?? storage_path('app/backups');
            if (!file_exists($backupPath)) {
                mkdir($backupPath, 0755, true);
            }

            // Generate backup filename with timestamp
            $timestamp = now()->format('Y-m-d_H-i-s');
            $filename = "backup_{$database}_{$timestamp}.json";

            // Connect to MongoDB
            $client = new Client("mongodb://{$username}:{$password}@{$host}:{$port}/{$database}");

            // Get all collections
            $collections = $client->selectDatabase($database)->listCollections();

            $backup = [];

            // Backup each collection
            foreach ($collections as $collection) {
                $this->info("Backing up collection: {$collection->getName()}");
                $documents = $client->selectDatabase($database)
                    ->selectCollection($collection->getName())
                    ->find()
                    ->toArray();

                $backup[$collection->getName()] = json_decode(json_encode($documents), true);
            }

            // Save backup to file
            $filepath = "{$backupPath}/{$filename}";
            file_put_contents($filepath, json_encode($backup, JSON_PRETTY_PRINT));

            // Upload to storage if configured
            if (config('backup.upload_to_storage', false)) {
                $this->info('Uploading backup to storage...');
                Storage::disk(config('backup.storage_disk', 's3'))
                    ->put("backups/{$filename}", file_get_contents($filepath));
            }

            $this->info("Backup completed successfully! File: {$filepath}");

            // Clean up old backups if configured
            if (config('backup.keep_backups', 5) > 0) {
                $this->cleanupOldBackups($backupPath);
            }

        } catch (\Exception $e) {
            $this->error('Backup failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    protected function cleanupOldBackups(string $path): void
    {
        $files = glob("{$path}/backup_*.json");
        if (count($files) > config('backup.keep_backups', 5)) {
            $this->info('Cleaning up old backups...');
            usort($files, function ($a, $b) {
                return filemtime($b) - filemtime($a);
            });

            $filesToDelete = array_slice($files, config('backup.keep_backups', 5));
            foreach ($filesToDelete as $file) {
                unlink($file);
                $this->info("Deleted old backup: {$file}");
            }
        }
    }
} 