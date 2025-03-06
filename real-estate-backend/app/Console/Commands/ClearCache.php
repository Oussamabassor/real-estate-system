<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ClearCache extends Command
{
    protected $signature = 'cache:clear-all';
    protected $description = 'Clear all application caches';

    public function handle()
    {
        $this->info('Clearing application cache...');
        Artisan::call('cache:clear');
        $this->info('Application cache cleared!');

        $this->info('Clearing config cache...');
        Artisan::call('config:clear');
        $this->info('Config cache cleared!');

        $this->info('Clearing route cache...');
        Artisan::call('route:clear');
        $this->info('Route cache cleared!');

        $this->info('Clearing view cache...');
        Artisan::call('view:clear');
        $this->info('View cache cleared!');

        $this->info('Clearing compiled classes...');
        Artisan::call('clear-compiled');
        $this->info('Compiled classes cleared!');

        $this->info('All caches cleared successfully!');

        return 0;
    }
} 