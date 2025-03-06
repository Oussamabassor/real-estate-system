<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteBackup extends Command
{
    protected $signature = 'db:backup-delete {backup} {--force}';
    protected $description = 'Delete a database backup';

    public function handle()
    {
        $backup = $this->argument('backup');

        if (!$this->option('force')) {
            if (!$this->confirm("Are you sure you want to delete backup '{$backup}'?")) {
                return 1;
            }
        }

        $this->info("Deleting backup '{$backup}'...");

        try {
            // Check local backup
            $backupPath = storage_path('app/backups');
            $filepath = "{$backupPath}/{$backup}";

            if (file_exists($filepath)) {
                unlink($filepath);
                $this->info("Deleted local backup: {$backup}");
            }

            // Check remote backup
            if (config('backup.upload_to_storage', false)) {
                $remotePath = "backups/{$backup}";
                if (Storage::disk(config('backup.storage_disk', 's3'))->exists($remotePath)) {
                    Storage::disk(config('backup.storage_disk', 's3'))->delete($remotePath);
                    $this->info("Deleted remote backup: {$backup}");
                }
            }

            $this->info('Backup deleted successfully!');

        } catch (\Exception $e) {
            $this->error('Failed to delete backup: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 