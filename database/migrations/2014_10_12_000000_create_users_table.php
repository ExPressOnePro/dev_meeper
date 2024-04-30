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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('login')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('congregation_id')->nullable()->default(null);
            $table->string('code', 6);
            $table->string('role');
            $table->string('account_status');
            $table->string('mobile_phone')->nullable()->default(null);
            $table->text('user_agent');
            $table->timestamp('last_login');
            $table->string('ip');
            $table->timestamp('email_verified_at')->nullable()->default(null);
            $table->rememberToken()->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
