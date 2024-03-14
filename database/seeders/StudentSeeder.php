<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create student record
        Student::create([
            'fname' => 'John',
            'lname' => 'Doe',
            'address' => '123 Main St',
            'contact' => '555-555-5555',
            'dob' => '1990-01-01',
            'gender' => 'Male',
            'user_id' => 2

        ]);
    }
}
