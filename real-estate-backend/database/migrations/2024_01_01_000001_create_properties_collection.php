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
        Schema::create('properties', function (Blueprint $table) { // تغيير Blueprint بدلاً من collection
            $table->id();
            $table->string('title');
            $table->string('property_type');
            $table->string('status');
            $table->decimal('price', 10, 2);
            $table->string('city');
            $table->string('state');
            $table->unsignedBigInteger('owner_id');
            $table->boolean('is_featured')->default(false);
            $table->decimal('rating', 3, 2)->nullable();
            $table->timestamps();

            // إضافة الفهارس
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
