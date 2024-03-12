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
         $enrollments = Enrollment::with('student', 'course')
         ->orderBy('created_at', 'desc')->paginate($request->pageSize);

         //find student enrolled in a course
    
         return Inertia::render('Enrollment/Index', [
             'enrollment' => $enrollments ,
             'courses' => Course::with('students')->get(),
             'students' => Student::with('courses')->get(),
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
    
    {  
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
        ]);
        $existingEnrollment = Enrollment::where('student_id', $request->input('student_id'))
        ->where('course_id', $request->input('course_id'))
        ->first();
        if ($existingEnrollment) {
            return redirect()->back()->with('error', 'Enrollment already exists for this student and course.');
        }

      $enrollment = Enrollment::where('student_id', $request->input('student_id'))
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
