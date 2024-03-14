<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CourseController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = Auth::user();
        if ($user->role->id == '1') {
            return Inertia::render('Course/Index', [
                'courses' => Inertia::lazy(fn () => Course::with('enrollments')
                    ->orderBy('created_at', 'asc')->paginate($request->pageSize)), 'user' => User::with('role')->find($user->id),
            ]);
        } else
            return Inertia::render('Course/Index', [
                'courses' => Inertia::lazy(fn () => Course::with('enrollments')->
                    //where current user id matches the student id in enrollment table - that a pivot table for course and student 
                    whereHas('enrollments', function ($query) use ($user) {
                        $query->where('student_id', $user->student->id);
                    })
                    ->orderBy('created_at', 'asc')->paginate($request->pageSize)),
                'user' => User::with('role')->find($user->id),
            ]);
    }

    public function create()
    {
        return Inertia::render(
            'Course/Create',
            [
                'courses' => Course::all()

            ]
        );
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        
        Course::create($request->all());
    }

    public function edit(Course $course)
    {
        return Inertia::render(
            'Course/Edit',
            [
                'courses' => $course,


            ]
        );
    }

    public function update(Request $request, Course $course)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        
        ]);
        $course->update([
            'name' => $request->input('name'),
            'id' => $request->input('id'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),


        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();
    }
}
