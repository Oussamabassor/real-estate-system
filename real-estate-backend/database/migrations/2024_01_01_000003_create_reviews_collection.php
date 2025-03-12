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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('user_id');
            $table->tinyInteger('rating'); // تقييم بين 1-5
            $table->boolean('is_verified')->default(false);
            $table->text('review')->nullable();
            $table->timestamps();

            // إضافة فهارس لتحسين الأداء
            $table->index('property_id');
            $table->index('user_id');
            $table->index('rating');
            $table->index('is_verified');

            // إضافة قيود العلاقات
            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
