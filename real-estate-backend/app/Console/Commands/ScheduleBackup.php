<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schedule;

class ScheduleBackup extends Command
{
    protected $signature = 'backup:schedule {--frequency=daily} {--time=00:00}';
    protected $description = 'Schedule database backups';

    public function handle()
    {
        $frequency = $this->option('frequency');
        $time = $this->option('time');

        $this->info("Scheduling database backups ({$frequency} at {$time})...");

        try {
            // Get the schedule instance
            $schedule = app(Schedule::class);

            // Schedule the backup based on frequency
            switch ($frequency) {
                case 'hourly':
                    $schedule->command('db:backup')
                        ->hourly()
                        ->withoutOverlapping();
                    break;

                case 'daily':
                    $schedule->command('db:backup')
                        ->dailyAt($time)
                        ->withoutOverlapping();
                    break;

                case 'weekly':
                    $schedule->command('db:backup')
                        ->weekly()
                        ->at($time)
                        ->withoutOverlapping();
                    break;

                case 'monthly':
                    $schedule->command('db:backup')
                        ->monthly()
                        ->at($time)
                        ->withoutOverlapping();
                    break;

                default:
                    $this->error("Invalid frequency: {$frequency}");
                    $this->info('Valid frequencies are: hourly, daily, weekly, monthly');
                    return 1;
            }

            // Add cleanup task to remove old backups
            $schedule->command('db:backup-cleanup')
                ->daily()
                ->at('01:00')
                ->withoutOverlapping();

            $this->info('Backup schedule created successfully!');
            $this->info('Make sure to add the following to your crontab:');
            $this->info('* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1');

        } catch (\Exception $e) {
            $this->error('Failed to schedule backup: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 