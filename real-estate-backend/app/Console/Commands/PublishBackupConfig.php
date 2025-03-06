<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PublishBackupConfig extends Command
{
    protected $signature = 'backup:publish-config';
    protected $description = 'Publish the backup configuration file';

    public function handle()
    {
        $this->info('Publishing backup configuration...');

        try {
            $this->call('vendor:publish', [
                '--provider' => 'App\Providers\BackupServiceProvider',
                '--tag' => 'backup-config',
            ]);

            $this->info('Backup configuration published successfully!');
            $this->info('You can now edit the configuration in config/backup.php');

        } catch (\Exception $e) {
            $this->error('Failed to publish backup configuration: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
} 