<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index(Request $request)
    {
         // Fetch enrollments with associated students and courses
         $enrollments = Enrollment::with('student', 'course')->orderBy('created_at', 'desc')->paginate($request->pageSize);

         // Fetch students for each course
         $courses = Course::with('students')->get();
 
         return Inertia::render('Enrollment/Index', [
             'enrollment' => $enrollments,
             'courses' => $courses,
         ]);
    }

    public function create()
    {
        return Inertia::render(
            'Enrollment/Create',
            [
                'courses' => Course::all(),
                'students' => Student::all()
            ]
        );
    }

    public function store(Request $request)
    {  $enrollment = Enrollment::where('student_id', $request->input('student_id'))
        ->where('course_id', $request->input('course_id'))
        ->first();

        $enrollment = new Enrollment();
        $enrollment->student_id = $request->input('student_id');
        $enrollment->course_id = $request->input('course_id');
        $enrollment->save();
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $enrollment->update([
            'student_id' => $request->input('student_id'),
            'course_id' => $request->input('course_id'),

        ]);
    }
    public function edit(Enrollment $enrollment)
{
    $enrollment = $enrollment->load('student', 'course'); // Eager load student and course relations
    return Inertia::render('Enrollment/Edit', [
        'enrollment' => $enrollment,
        'courses' => Course::all(),
        'students' => Student::all()
    ]);
}
}
