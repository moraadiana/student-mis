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
            'enrollment' => $enrollments,
            'courses' => Course::with('students')->get(),
            'students' => Student::with('courses')->get(),
        ]);
    }

    public function create()
    {

        $student = Student::with('courses')->get();

        //get courses not enrolled in by selected student 
        $course = Course::with('students')->whereNotIn('id', function ($query) {
            $query->select('course_id')
                ->from('enrollments')
                ->whereColumn('student_id', 'id');
        })
            ->get();



        return Inertia::render(
            'Enrollment/Create',
            [
                'students' => $student,
                'courses' => $course,

            ]
        );
    }

    public function store(Request $request)
    {
        // dd($request->all());

        $student = Student::find($request->input('student_id'));
        // check courses the student is enrolled into using enrollments relationship if enrolled to any course, check if the previous enrollments is expired if yes enroll them if not return an error that they cant be enrolled to another course. Ensure that one student is not enrolled in the same course twice.
        $enrollments = $student->enrollments;
        // check if all enrollments are expired using expiry date column
        $notExpired = $enrollments->where('expiry_date', '>=', now());
        // dd($notExpired);
        if ($notExpired->count() > 0) {
            return redirect()->back()->withErrors(['enrollment' => 'Student is already enrolled in another course']);
        } else {


            $enrollment = Enrollment::create([
                'student_id' => $request->input('student_id'),
                'course_id' => $request->input('course_id'),
                'expiry_date' => $request->input('expiry_date'),

            ]);
        }
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
