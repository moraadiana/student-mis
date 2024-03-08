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
            'students_fname' => 'John',
            'students_lname' => 'Doe',
            'students_address' => '123 Main St',
            'students_contact' => '555-555-5555',
            'students_dob' => '1990-01-01',
            'students_gender' => 'Male',
            'users_id' => 2

        ]);
    }
}
