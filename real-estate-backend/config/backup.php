<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Backup Settings
    |--------------------------------------------------------------------------
    |
    | Here you can configure various settings for the database backup system.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Backup Storage
    |--------------------------------------------------------------------------
    |
    | Configure where backups should be stored. You can choose to store them
    | locally or upload them to a remote storage service like S3.
    |
    */
    'upload_to_storage' => env('BACKUP_UPLOAD_TO_STORAGE', false),
    'storage_disk' => env('BACKUP_STORAGE_DISK', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Backup Retention
    |--------------------------------------------------------------------------
    |
    | Configure how many backups to keep. This applies to both local and
    | remote backups.
    |
    */
    'keep_backups' => env('BACKUP_KEEP_BACKUPS', 5),

    /*
    |--------------------------------------------------------------------------
    | Backup Schedule
    |--------------------------------------------------------------------------
    |
    | Configure the default backup schedule. This is used when running the
    | backup:schedule command without options.
    |
    */
    'schedule_frequency' => env('BACKUP_SCHEDULE_FREQUENCY', 'daily'),
    'schedule_time' => env('BACKUP_SCHEDULE_TIME', '00:00'),

    /*
    |--------------------------------------------------------------------------
    | Backup Notifications
    |--------------------------------------------------------------------------
    |
    | Configure whether to send notifications when backups are created or
    | when backup operations fail.
    |
    */
    'notify_on_success' => env('BACKUP_NOTIFY_ON_SUCCESS', false),
    'notify_on_failure' => env('BACKUP_NOTIFY_ON_FAILURE', true),
    'notification_email' => env('BACKUP_NOTIFICATION_EMAIL'),

    /*
    |--------------------------------------------------------------------------
    | Backup Compression
    |--------------------------------------------------------------------------
    |
    | Configure whether to compress backups before storing them.
    |
    */
    'compress_backups' => env('BACKUP_COMPRESS_BACKUPS', true),

    /*
    |--------------------------------------------------------------------------
    | Backup Encryption
    |--------------------------------------------------------------------------
    |
    | Configure whether to encrypt backups before storing them.
    |
    */
    'encrypt_backups' => env('BACKUP_ENCRYPT_BACKUPS', false),
    'encryption_key' => env('BACKUP_ENCRYPTION_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Backup Collections
    |--------------------------------------------------------------------------
    |
    | Configure which collections should be included in the backup.
    | Set to null to backup all collections.
    |
    */
    'collections' => [
        'users',
        'properties',
        'reservations',
        'reviews',
        'favorites',
    ],

    /*
    |--------------------------------------------------------------------------
    | Backup Exclusions
    |--------------------------------------------------------------------------
    |
    | Configure which collections should be excluded from the backup.
    |
    */
    'exclude_collections' => [
        'password_reset_tokens',
        'failed_jobs',
        'personal_access_tokens',
    ],

    /*
    |--------------------------------------------------------------------------
    | Backup Timeout
    |--------------------------------------------------------------------------
    |
    | Configure the maximum time (in seconds) that a backup operation can take.
    |
    */
    'timeout' => env('BACKUP_TIMEOUT', 300),

    /*
    |--------------------------------------------------------------------------
    | Backup Path
    |--------------------------------------------------------------------------
    |
    | Configure the path where local backups should be stored.
    |
    */
    'path' => env('BACKUP_PATH', storage_path('app/backups')),
]; 