<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class MonitorBackups extends Command
{
    protected $signature = 'backup:monitor {--check-interval=24} {--max-age=48}';
    protected $description = 'Monitor backup status and send notifications if needed';

    public function handle()
    {
        $checkInterval = $this->option('check-interval');
        $maxAge = $this->option('max-age');

        $this->info('Checking backup status...');

        try {
            $issues = [];

            // Check local backups
            $backupPath = storage_path('app/backups');
            if (file_exists($backupPath)) {
                $files = glob("{$backupPath}/backup_*.json");
                if (empty($files)) {
                    $issues[] = 'No local backups found';
                } else {
                    $latestBackup = max($files);
                    $backupAge = (time() - filemtime($latestBackup)) / 3600;
                    if ($backupAge > $maxAge) {
                        $issues[] = "Latest local backup is {$backupAge} hours old";
                    }
                }
            }

            // Check remote backups if configured
            if (config('backup.upload_to_storage', false)) {
                $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
                if (empty($files)) {
                    $issues[] = 'No remote backups found';
                } else {
                    $latestBackup = max($files);
                    $backupAge = (time() - Storage::disk(config('backup.storage_disk', 's3'))->lastModified($latestBackup)) / 3600;
                    if ($backupAge > $maxAge) {
                        $issues[] = "Latest remote backup is {$backupAge} hours old";
                    }
                }
            }

            // Check backup size
            $totalSize = 0;
            if (file_exists($backupPath)) {
                $files = glob("{$backupPath}/backup_*.json");
                foreach ($files as $file) {
                    $totalSize += filesize($file);
                }
            }

            if (config('backup.upload_to_storage', false)) {
                $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
                foreach ($files as $file) {
                    $totalSize += Storage::disk(config('backup.storage_disk', 's3'))->size($file);
                }
            }

            if ($totalSize > 1024 * 1024 * 1024) { // 1GB
                $issues[] = 'Total backup size exceeds 1GB';
            }

            // Check number of backups
            $backupCount = count(glob("{$backupPath}/backup_*.json"));
            if (config('backup.upload_to_storage', false)) {
                $backupCount += count(Storage::disk(config('backup.storage_disk', 's3'))->files('backups'));
            }

            if ($backupCount > 10) {
                $issues[] = "Total number of backups ({$backupCount}) exceeds recommended limit";
            }

            // Send notification if there are issues
            if (!empty($issues)) {
                $this->sendNotification($issues);
                $this->error('Backup issues found:');
                foreach ($issues as $issue) {
                    $this->line("- {$issue}");
                }
            } else {
                $this->info('No backup issues found');
            }

            return 0;

        } catch (\Exception $e) {
            $this->error('Failed to monitor backups: ' . $e->getMessage());
            return 1;
        }
    }

    protected function sendNotification(array $issues): void
    {
        if (!config('backup.notify_on_failure', true)) {
            return;
        }

        $email = config('backup.notification_email');
        if (!$email) {
            return;
        }

        try {
            Mail::raw(
                "Backup Issues Found:\n\n" . implode("\n", $issues),
                function ($message) use ($email) {
                    $message->to($email)
                        ->subject('Backup System Alert');
                }
            );
        } catch (\Exception $e) {
            $this->error('Failed to send notification: ' . $e->getMessage());
        }
    }
} 