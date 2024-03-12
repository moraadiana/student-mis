<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class DashboardController extends Controller
{
    //
    public function __invoke()
    {
        return Inertia::render('Dashboard' , [
            'users' => User::all()
           

        ]);
    }
    public function index()
    {
        $totalStudentsCount = Student ::count();
        $totalCoursesCount = Course::count();
        $totalFemaleStudents = Student ::where('gender', 'Female')->count();
        $totalMaleStudents = Student::where('gender', 'Male')->count();
        $enrolledCourses = Enrollment ::with('student', 'course') ->get();
        
        return Inertia::render('Dashboard',
    [
        'totalStudentsCount' => $totalStudentsCount,
        'totalCoursesCount' => $totalCoursesCount,
        'totalFemaleStudents' => $totalFemaleStudents,
        'totalMaleStudents' => $totalMaleStudents,
        'enrolledCourses' => $enrolledCourses,
    ]);
    }
}
