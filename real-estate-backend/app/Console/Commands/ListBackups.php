<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ListBackups extends Command
{
    protected $signature = 'db:backups';
    protected $description = 'List all available database backups';

    public function handle()
    {
        $this->info('Listing available backups...');

        // Get local backups
        $backupPath = storage_path('app/backups');
        $localBackups = [];

        if (file_exists($backupPath)) {
            $files = glob("{$backupPath}/backup_*.json");
            foreach ($files as $file) {
                $localBackups[] = [
                    'name' => basename($file),
                    'size' => $this->formatSize(filesize($file)),
                    'date' => date('Y-m-d H:i:s', filemtime($file)),
                    'location' => 'local',
                ];
            }
        }

        // Get remote backups if configured
        $remoteBackups = [];
        if (config('backup.upload_to_storage', false)) {
            $this->info('Fetching remote backups...');
            $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
            foreach ($files as $file) {
                $remoteBackups[] = [
                    'name' => basename($file),
                    'size' => $this->formatSize(Storage::disk(config('backup.storage_disk', 's3'))->size($file)),
                    'date' => date('Y-m-d H:i:s', Storage::disk(config('backup.storage_disk', 's3'))->lastModified($file)),
                    'location' => 'remote',
                ];
            }
        }

        // Merge and sort backups
        $allBackups = array_merge($localBackups, $remoteBackups);
        usort($allBackups, function ($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });

        if (empty($allBackups)) {
            $this->warn('No backups found.');
            return 0;
        }

        // Display backups in a table
        $this->table(
            ['Name', 'Size', 'Date', 'Location'],
            collect($allBackups)->map(function ($backup) {
                return [
                    $backup['name'],
                    $backup['size'],
                    $backup['date'],
                    $backup['location'],
                ];
            })->toArray()
        );

        $this->info('Total backups: ' . count($allBackups));

        return 0;
    }

    protected function formatSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);

        return round($bytes, 2) . ' ' . $units[$pow];
    }
} 