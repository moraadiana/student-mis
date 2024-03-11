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
        return Inertia::render('Enrollment/Index', [
            'enrollment' => Inertia::lazy(fn () => Enrollment::with('student', 'course')->orderBy('created_at', 'desc')->paginate($request->pageSize)),
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
        // dd($request->all());
        // Enrollment::create([
        //     //store multiple data
        //     'student_id' => $request->input('student_id'),
        //     'course_id' => $request->input('course_id'),


        // ]);
        //store multiple entry

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
}
