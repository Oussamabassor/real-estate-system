<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Scheduling\Schedule;

class BackupServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(
            __DIR__.'/../../config/backup.php', 'backup'
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../../config/backup.php' => config_path('backup.php'),
            ], 'backup-config');

            $this->commands([
                \App\Console\Commands\BackupDatabase::class,
                \App\Console\Commands\RestoreDatabase::class,
                \App\Console\Commands\ListBackups::class,
                \App\Console\Commands\DeleteBackup::class,
                \App\Console\Commands\ScheduleBackup::class,
                \App\Console\Commands\CleanupBackups::class,
                \App\Console\Commands\TestBackup::class,
                \App\Console\Commands\MonitorBackups::class,
                \App\Console\Commands\GenerateBackupReport::class,
                \App\Console\Commands\PublishBackupConfig::class,
            ]);

            $this->app->booted(function () {
                $schedule = $this->app->make(Schedule::class);
                $schedule->command('db:backup-cleanup')
                    ->daily()
                    ->at('01:00')
                    ->withoutOverlapping();
            });
        }
    }
} 