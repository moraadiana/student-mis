<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentController extends Controller
{
    //
    public function index(Request $request)

    {
        $user = Auth::user();
         
        // if role is admin show all students details
        if ($user->role->name == 'admin') {
            return Inertia::render('Student/Index', [
                'students' => Inertia::lazy(fn () => Student::with('user', 'courses', 'enrollments' )
                ->orderBy('created_at', 'desc')->paginate($request->pageSize)),
                'user' => User::with ('role')->find($user->id),
        ]);
                
          
            
        }
        else

        return Inertia::render('Student/Index', [
            'students' => Inertia::lazy(fn () => Student::with('user', 'courses', 'enrollments' )
            //where the user id matches the user id of the logged in user
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')->paginate($request->pageSize)),
            'user' => User::with ('role')->find($user->id)
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
        $request->validate([
            
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'dob' => 'required|date|before:today',
            'gender' => 'required|in:Male,Female,Other',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'course_id' => 'required|array',
            'course_id.*' => 'exists:courses,id',
        ]);


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
        $student = Student::with('user', 'courses', 'enrollments')->find($student->id);
        return Inertia::render(
            'Student/Edit',
            [
                'student' => $student,
                'user' => User::all(),
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

        //update selected courses
        $courseIds =  $request->input('course_id', []);
        $student->courses()->sync($courseIds);
    }

 
}
