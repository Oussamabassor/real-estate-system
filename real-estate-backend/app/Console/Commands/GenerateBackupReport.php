<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GenerateBackupReport extends Command
{
    protected $signature = 'backup:report {--period=30} {--format=text}';
    protected $description = 'Generate a report of backup operations';

    public function handle()
    {
        $period = $this->option('period');
        $format = $this->option('format');

        $this->info('Generating backup report...');

        try {
            $report = [
                'period' => $period,
                'start_date' => now()->subDays($period),
                'end_date' => now(),
                'local_backups' => $this->getLocalBackups($period),
                'remote_backups' => $this->getRemoteBackups($period),
                'total_size' => 0,
                'average_size' => 0,
                'success_rate' => 0,
                'issues' => [],
            ];

            // Calculate statistics
            $report['total_size'] = $this->calculateTotalSize($report['local_backups'], $report['remote_backups']);
            $report['average_size'] = $this->calculateAverageSize($report['local_backups'], $report['remote_backups']);
            $report['success_rate'] = $this->calculateSuccessRate($report['local_backups'], $report['remote_backups']);

            // Output report
            if ($format === 'json') {
                $this->outputJson($report);
            } else {
                $this->outputText($report);
            }

            return 0;

        } catch (\Exception $e) {
            $this->error('Failed to generate backup report: ' . $e->getMessage());
            return 1;
        }
    }

    protected function getLocalBackups(int $period): array
    {
        $backupPath = storage_path('app/backups');
        $backups = [];

        if (file_exists($backupPath)) {
            $files = glob("{$backupPath}/backup_*.json");
            foreach ($files as $file) {
                $modified = filemtime($file);
                if ($modified >= now()->subDays($period)->timestamp) {
                    $backups[] = [
                        'name' => basename($file),
                        'size' => filesize($file),
                        'date' => date('Y-m-d H:i:s', $modified),
                        'location' => 'local',
                    ];
                }
            }
        }

        return $backups;
    }

    protected function getRemoteBackups(int $period): array
    {
        $backups = [];

        if (config('backup.upload_to_storage', false)) {
            $files = Storage::disk(config('backup.storage_disk', 's3'))->files('backups');
            foreach ($files as $file) {
                $modified = Storage::disk(config('backup.storage_disk', 's3'))->lastModified($file);
                if ($modified >= now()->subDays($period)->timestamp) {
                    $backups[] = [
                        'name' => basename($file),
                        'size' => Storage::disk(config('backup.storage_disk', 's3'))->size($file),
                        'date' => date('Y-m-d H:i:s', $modified),
                        'location' => 'remote',
                    ];
                }
            }
        }

        return $backups;
    }

    protected function calculateTotalSize(array $localBackups, array $remoteBackups): int
    {
        $total = 0;
        foreach ($localBackups as $backup) {
            $total += $backup['size'];
        }
        foreach ($remoteBackups as $backup) {
            $total += $backup['size'];
        }
        return $total;
    }

    protected function calculateAverageSize(array $localBackups, array $remoteBackups): float
    {
        $total = $this->calculateTotalSize($localBackups, $remoteBackups);
        $count = count($localBackups) + count($remoteBackups);
        return $count > 0 ? $total / $count : 0;
    }

    protected function calculateSuccessRate(array $localBackups, array $remoteBackups): float
    {
        $expectedBackups = $this->calculateExpectedBackups();
        $actualBackups = count($localBackups) + count($remoteBackups);
        return $expectedBackups > 0 ? ($actualBackups / $expectedBackups) * 100 : 0;
    }

    protected function calculateExpectedBackups(): int
    {
        $frequency = config('backup.schedule_frequency', 'daily');
        $period = $this->option('period');

        switch ($frequency) {
            case 'hourly':
                return $period * 24;
            case 'daily':
                return $period;
            case 'weekly':
                return ceil($period / 7);
            case 'monthly':
                return ceil($period / 30);
            default:
                return 0;
        }
    }

    protected function outputJson(array $report): void
    {
        $this->line(json_encode($report, JSON_PRETTY_PRINT));
    }

    protected function outputText(array $report): void
    {
        $this->info('Backup Report');
        $this->line('=============');
        $this->line("Period: {$report['period']} days");
        $this->line("Start Date: {$report['start_date']}");
        $this->line("End Date: {$report['end_date']}");
        $this->line('');

        $this->info('Statistics');
        $this->line('==========');
        $this->line("Total Size: {$this->formatSize($report['total_size'])}");
        $this->line("Average Size: {$this->formatSize($report['average_size'])}");
        $this->line("Success Rate: {$report['success_rate']}%");
        $this->line('');

        $this->info('Local Backups');
        $this->line('=============');
        if (empty($report['local_backups'])) {
            $this->line('No local backups found');
        } else {
            foreach ($report['local_backups'] as $backup) {
                $this->line("- {$backup['name']} ({$this->formatSize($backup['size'])}) - {$backup['date']}");
            }
        }
        $this->line('');

        $this->info('Remote Backups');
        $this->line('==============');
        if (empty($report['remote_backups'])) {
            $this->line('No remote backups found');
        } else {
            foreach ($report['remote_backups'] as $backup) {
                $this->line("- {$backup['name']} ({$this->formatSize($backup['size'])}) - {$backup['date']}");
            }
        }
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