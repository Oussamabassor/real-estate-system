<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use Jenssegers\Mongodb\Eloquent\Model;

class MongoDBServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        // Model::setConnectionResolver($this->app['db']);
    }
} 