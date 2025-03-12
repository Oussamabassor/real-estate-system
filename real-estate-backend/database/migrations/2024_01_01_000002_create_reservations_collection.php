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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('user_id');
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->string('status')->default('pending');
            $table->timestamps();

            // إضافة فهارس لتحسين البحث والأداء
            $table->index('property_id');
            $table->index('user_id');
            $table->index('check_in_date');
            $table->index('check_out_date');
            $table->index('status');

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
        Schema::dropIfExists('reservations');
    }
};
