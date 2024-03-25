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
        Schema::create('stand_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stand_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->time('time');
            $table->unsignedBigInteger('user_1')->nullable();
            $table->unsignedBigInteger('user_2')->nullable();
            $table->unsignedBigInteger('user_3')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stand_records');
    }
};
