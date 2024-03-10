<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    //
    public function index(Request $request)

    {$students = Student::with('user', )
        ->orderBy('created_at', 'desc')
        ->paginate($request->input('per_page', 10));



    return Inertia::render(
        'Student/Index',
        [
            'students' => $students,
            //'role' => Role::all()
        ]
    );

    }
    public function create()
    {

        return Inertia::render(
            'Student/Create',
            [
                'users' => User::all(),
                'students' => Student::all()
            ]
        );
    }
    //
    public function store(Request $request)
    {
        // dd ($request->all());
        //store data in database set default role
        $student = Student::create([
            'fname' => $request->input('fname'),
            'lname' => $request->input('lname'),
            'dob' => $request->input('dob'),
            'gender' => $request->input('gender'),
            'address' => $request->input('address'),
            'user_id' => $request->input('user_id'),
        ]);
    }
    public function edit(Student $student)
    {
        return Inertia::render(
            'Student/Edit',
            [
                'student' => $student,
                'users' => User::all()
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
