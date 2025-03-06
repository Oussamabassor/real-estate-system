<?php

namespace App\Console\Commands;

use App\Models\Property;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CheckStatus extends Command
{
    protected $signature = 'app:status';
    protected $description = 'Check the application status';

    public function handle()
    {
        $this->info('Checking application status...');

        // Check database connection
        try {
            DB::connection('mongodb')->getPdo();
            $this->info('✓ Database connection successful');
        } catch (\Exception $e) {
            $this->error('✗ Database connection failed: ' . $e->getMessage());
            return 1;
        }

        // Check collections
        $collections = [
            'users' => User::class,
            'properties' => Property::class,
            'reservations' => Reservation::class,
            'reviews' => Review::class,
        ];

        foreach ($collections as $name => $model) {
            try {
                $count = $model::count();
                $this->info("✓ {$name} collection exists ({$count} records)");
            } catch (\Exception $e) {
                $this->error("✗ {$name} collection error: " . $e->getMessage());
            }
        }

        // Check storage directory
        if (is_writable(storage_path())) {
            $this->info('✓ Storage directory is writable');
        } else {
            $this->error('✗ Storage directory is not writable');
        }

        // Check .env file
        if (file_exists(base_path('.env'))) {
            $this->info('✓ .env file exists');
        } else {
            $this->error('✗ .env file is missing');
        }

        // Check required PHP extensions
        $requiredExtensions = [
            'mongodb',
            'fileinfo',
            'json',
            'mbstring',
            'openssl',
            'pdo',
            'tokenizer',
            'xml',
        ];

        foreach ($requiredExtensions as $extension) {
            if (extension_loaded($extension)) {
                $this->info("✓ PHP {$extension} extension is loaded");
            } else {
                $this->error("✗ PHP {$extension} extension is not loaded");
            }
        }

        // Check PHP version
        $phpVersion = PHP_VERSION;
        $this->info("✓ PHP version: {$phpVersion}");

        // Check Laravel version
        $laravelVersion = app()->version();
        $this->info("✓ Laravel version: {$laravelVersion}");

        // Check application key
        if (config('app.key')) {
            $this->info('✓ Application key is set');
        } else {
            $this->error('✗ Application key is not set');
        }

        // Check debug mode
        if (config('app.debug')) {
            $this->warn('⚠ Debug mode is enabled');
        } else {
            $this->info('✓ Debug mode is disabled');
        }

        // Check maintenance mode
        if (app()->isDownForMaintenance()) {
            $this->warn('⚠ Application is in maintenance mode');
        } else {
            $this->info('✓ Application is not in maintenance mode');
        }

        $this->info('Status check completed!');

        return 0;
    }
} 