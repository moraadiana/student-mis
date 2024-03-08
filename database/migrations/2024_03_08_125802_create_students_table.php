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
        Schema::create('students', function (Blueprint $table) {
            $table->id('students_id');
            $table->string('students_fname');
            $table->string('students_lname');
            $table->string('students_address');
            $table->string('students_contact');
            $table->string('students_dob');
            $table->string('students_gender');
            //foreign key to users table
            $table->unsignedBigInteger('users_id');
            $table->foreign('users_id')->references('users_id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
