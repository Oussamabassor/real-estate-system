<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class TestBackup extends Command
{
    protected $signature = 'backup:test';
    protected $description = 'Test the backup system';

    public function handle()
    {
        $this->info('Testing backup system...');

        try {
            // Test database connection
            $this->info('Testing database connection...');
            $this->call('db:backup', [
                '--path' => storage_path('app/backups/test'),
            ]);

            // Test backup listing
            $this->info('Testing backup listing...');
            $this->call('db:backups');

            // Test backup restoration
            $this->info('Testing backup restoration...');
            $backupPath = storage_path('app/backups/test');
            $files = glob("{$backupPath}/backup_*.json");
            if (!empty($files)) {
                $latestBackup = basename($files[0]);
                $this->call('db:restore', [
                    'backup' => $latestBackup,
                    '--force' => true,
                ]);
            }

            // Test backup cleanup
            $this->info('Testing backup cleanup...');
            $this->call('db:backup-cleanup', [
                '--keep' => 1,
                '--force' => true,
            ]);

            // Test remote storage if configured
            if (config('backup.upload_to_storage', false)) {
                $this->info('Testing remote storage...');
                $this->call('db:backup', [
                    '--path' => storage_path('app/backups/test'),
                ]);

                // Verify backup was uploaded
                $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
                if (!empty($files)) {
                    $this->info('Backup successfully uploaded to remote storage');
                }
            }

            $this->info('Backup system test completed successfully!');

        } catch (\Exception $e) {
            $this->error('Backup system test failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 