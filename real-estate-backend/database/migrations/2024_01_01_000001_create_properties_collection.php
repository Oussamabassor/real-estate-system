<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mongodb')->create('properties', function (Blueprint $collection) {
            $collection->index('title');
            $collection->index('property_type');
            $collection->index('status');
            $collection->index('price');
            $collection->index('city');
            $collection->index('state');
            $collection->index('owner_id');
            $collection->index('is_featured');
            $collection->index('rating');
            $collection->index('created_at');
            $collection->index('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->dropIfExists('properties');
    }
}; 