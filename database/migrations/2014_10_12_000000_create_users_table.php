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
            $table->id('id');
           // $table->string('username');
            //email
            $table->string('email')->unique();
            
            $table->string('password');
            //foreign key to roles table
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');

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
