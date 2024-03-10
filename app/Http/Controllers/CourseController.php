<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    //
    public function index()
    {
        $course = Course::with('enrollments')->get();
        return Inertia::render('Course/Index',
        [
            'course' => $course
            
        ]
    );
    }
}
