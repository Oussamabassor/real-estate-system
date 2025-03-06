<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class OptimizeApp extends Command
{
    protected $signature = 'optimize:all';
    protected $description = 'Optimize the application for production';

    public function handle()
    {
        $this->info('Optimizing application for production...');

        $this->info('Clearing all caches...');
        Artisan::call('cache:clear-all');
        $this->info('All caches cleared!');

        $this->info('Optimizing class loader...');
        Artisan::call('optimize');
        $this->info('Class loader optimized!');

        $this->info('Caching configuration...');
        Artisan::call('config:cache');
        $this->info('Configuration cached!');

        $this->info('Caching routes...');
        Artisan::call('route:cache');
        $this->info('Routes cached!');

        $this->info('Caching views...');
        Artisan::call('view:cache');
        $this->info('Views cached!');

        $this->info('Application optimized successfully!');

        return 0;
    }
} 