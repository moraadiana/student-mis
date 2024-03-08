<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //add record

        Course::create(
            [
                'courses_name' => 'Computer Science',
                'start_date' => now(),
                'end_date' => now()->addDays(30)
            ],

        );
    }
}
