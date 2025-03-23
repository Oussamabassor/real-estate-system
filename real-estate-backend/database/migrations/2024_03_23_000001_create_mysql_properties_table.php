<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('properties', function (Blueprint $table) {
            // Add performance indices
            $table->index('title');
            $table->index('property_type');
            $table->index('status');
            $table->index('price');
            $table->index('city');
            $table->index('state');
            $table->index('rating');
        });
    }

    public function down()
    {
        Schema::table('properties', function (Blueprint $table) {
            // Drop indices
            $table->dropIndex(['title']);
            $table->dropIndex(['property_type']);
            $table->dropIndex(['status']);
            $table->dropIndex(['price']);
            $table->dropIndex(['city']);
            $table->dropIndex(['state']);
            $table->dropIndex(['rating']);
        });
    }
};