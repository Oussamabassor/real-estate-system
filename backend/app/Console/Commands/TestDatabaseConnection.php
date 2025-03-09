<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestDatabaseConnection extends Command
{
    protected $signature = 'db:test';
    protected $description = 'Test database connection';

    public function handle()
    {
        try {
            $this->info('Attempting to connect to database...');
            DB::connection()->getPdo();
            $this->info('Database connection successful!');
        } catch (\Exception $e) {
            $this->error('Database connection failed: ' . $e->getMessage());
            $this->line('Connection details:');
            $this->line('Host: ' . config('database.connections.mysql.host'));
            $this->line('Database: ' . config('database.connections.mysql.database'));
            $this->line('Username: ' . config('database.connections.mysql.username'));
        }
    }
} 