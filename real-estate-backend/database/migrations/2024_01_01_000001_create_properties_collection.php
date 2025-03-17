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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('property_type');
            $table->string('address');
            $table->string('status');
            $table->decimal('price', 10, 2);
            $table->string('city');
            $table->string('state');
            $table->unsignedBigInteger('owner_id');
            $table->string('zip_code');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->integer('area');
            $table->json('features')->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->decimal('rating', 3, 2)->nullable();
            $table->integer('reviews_count')->default(0);
            $table->softDeletes();
            $table->timestamps();

            $table->index('title');
            $table->index('property_type');
            $table->index('status');
            $table->index('price');
            $table->index('city');
            $table->index('state');
            $table->index('owner_id');
            $table->index('is_featured');
            $table->index('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
