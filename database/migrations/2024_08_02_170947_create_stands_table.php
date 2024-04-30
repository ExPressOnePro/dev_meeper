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
        Schema::create('stands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->foreignId('congregation_id')->constrained();
            $table->json('weeks_schedules');
            $table->integer('publishers_to_stand')->default(2);
            $table->boolean('show_next_weeks')->default(false);
            $table->json('day_to_active');
            $table->json('time_to_active');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });;
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stands');
    }
};
