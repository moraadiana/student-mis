<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('Course/Index', [
            'courses' => Inertia::lazy(fn () => Course::orderBy('created_at', 'desc')->paginate($request->pageSize)),
        ]);
    }

    public function create()
    {
        return Inertia::render('Course/Create',
            [
                'courses' => Course::all()

            ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        Course::create($request->all());
        
    }

    public function edit(Course $course)
    {
        return Inertia::render('Course/Edit',
            [
                'courses' => $course,


            ]);
        }

    public function update(Request $request, Course $course)
    {
        // dd($request->all());
        $course->update([
            'name' => $request->input('name'),
            'id' => $request->input('id'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),


        ]);
    }


}
