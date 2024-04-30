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
        Schema::create('stand_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stand_record_id')->constrained();
            $table->foreignId('user_id')->constrained('users');
            $table->string('action');
            $table->timestamp('date');
            $table->json('before');
            $table->json('after');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stand_histories');
    }
};
