<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupBackups extends Command
{
    protected $signature = 'db:backup-cleanup {--keep=5} {--force}';
    protected $description = 'Clean up old database backups';

    public function handle()
    {
        $keep = $this->option('keep');

        if (!$this->option('force')) {
            if (!$this->confirm("This will delete all backups except the {$keep} most recent ones. Continue?")) {
                return 1;
            }
        }

        $this->info('Cleaning up old backups...');

        try {
            // Clean up local backups
            $backupPath = storage_path('app/backups');
            if (file_exists($backupPath)) {
                $files = glob("{$backupPath}/backup_*.json");
                $this->cleanupFiles($files, $keep);
            }

            // Clean up remote backups if configured
            if (config('backup.upload_to_storage', false)) {
                $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
                $this->cleanupRemoteFiles($files, $keep);
            }

            $this->info('Backup cleanup completed successfully!');

        } catch (\Exception $e) {
            $this->error('Failed to clean up backups: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    protected function cleanupFiles(array $files, int $keep): void
    {
        if (count($files) <= $keep) {
            return;
        }

        // Sort files by modification time (newest first)
        usort($files, function ($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        // Get files to delete
        $filesToDelete = array_slice($files, $keep);

        // Delete files
        foreach ($filesToDelete as $file) {
            unlink($file);
            $this->info("Deleted old backup: " . basename($file));
        }
    }

    protected function cleanupRemoteFiles(array $files, int $keep): void
    {
        if (count($files) <= $keep) {
            return;
        }

        // Get file information
        $fileInfo = [];
        foreach ($files as $file) {
            $fileInfo[] = [
                'path' => $file,
                'modified' => Storage::disk(config('backup.storage_disk', 's3'))->lastModified($file),
            ];
        }

        // Sort files by modification time (newest first)
        usort($fileInfo, function ($a, $b) {
            return $b['modified'] - $a['modified'];
        });

        // Get files to delete
        $filesToDelete = array_slice($fileInfo, $keep);

        // Delete files
        foreach ($filesToDelete as $file) {
            Storage::disk(config('backup.storage_disk', 's3'))->delete($file['path']);
            $this->info("Deleted old remote backup: " . basename($file['path']));
        }
    }
} 