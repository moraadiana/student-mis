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
            $table->id('users_id');
            $table->string('users_username');
            //email
            $table->string('users_email')->unique();
            
            $table->string('users_password');
            //foreign key to roles table
            $table->unsignedBigInteger('roles_id');
            $table->foreign('roles_id')->references('roles_id')->on('roles');

            $table->rememberToken();
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
