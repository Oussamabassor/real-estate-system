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
        Schema::connection('mongodb')->create('reservations', function (Blueprint $collection) {
            $collection->index('property_id');
            $collection->index('user_id');
            $collection->index('check_in_date');
            $collection->index('check_out_date');
            $collection->index('status');
            $collection->index('created_at');
            $collection->index('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mongodb')->dropIfExists('reservations');
    }
}; 