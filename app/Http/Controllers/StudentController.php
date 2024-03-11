<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    //
    public function index(Request $request)

    {

        return Inertia::render('Student/Index', [
            'students' => Inertia::lazy(fn () => Student::with('user', 'enrollments.course')->orderBy('created_at', 'desc')->paginate($request->pageSize)),
        ]);
    }
    public function create()
    {

        return Inertia::render(
            'Student/Create',
            [
                'users' => User::all(),
                'students' => Student::all(),
                'courses' => Course::all(),
                'enrollments' => Enrollment::all()

            ]
        );
    }
    //
    public function store(Request $request)
    {
        // dd ($request->all());
        //store data in database set default role
        $user = User::create([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => 2,
        ]);



        // create related student
        $user->student()->create([
            'fname' => $request->input('fname'),
            'lname' => $request->input('lname'),
            'dob' => $request->input('dob'),
            'gender' => $request->input('gender'),
            'address' => $request->input('address'),
            'contact' => $request->input('contact'),
        ]);
        //retrieve the selected courses ids
        $courseIds =  $request->input('course_id', []);

        //enroll student to selected courses
        foreach ($courseIds as $courseId) {
            $enrollment = new Enrollment();
            $enrollment->student_id = $user->student->id;
            $enrollment->course_id = $courseId;
            $enrollment->save();
        }
    }
    public function edit(Student $student)
    {
        $student = Student::with('user', 'enrollments.course')->find($student->id);
        return Inertia::render(
            'Student/Edit',
            [
                'student' => $student,
                'users' => User::all(),
                'courses' => Course::all(),
                'enrollments' => Enrollment::all()
            ]
        );
    }

    public function update(Request $request, Student $student)
    {
        $student->update([
            'fname' => $request->input('fname'),
            'lname' => $request->input('lname'),
            'dob' => $request->input('dob'),
            'gender' => $request->input('gender'),
            'address' => $request->input('address'),
            'user_id' => $request->input('user_id'),
        ]);
    }
}
