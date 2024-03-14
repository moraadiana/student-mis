<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
 
class DashboardController extends Controller
{
   
    public function index( )
    { 
   
        $totalStudentsCount = Student::count();
        $allStudents = Student::with('courses', 'user')->get();
        $totalCoursesCount = Course::count();
        $allCourses = Course::with('enrollments', 'students')->get();
        $enrolledCourses = Enrollment ::with('student', 'course') ->count();
        $allEnrolledCourses = Enrollment ::with('student', 'course') ->get();
      //  dd($allEnrolledCourses);
        return Inertia::render('Dashboard',
    [
        //'users' => User::all(),
        'totalStudentsCount' => $totalStudentsCount,
        'totalCoursesCount' => $totalCoursesCount,
       // 'totalFemaleStudents' => $totalFemaleStudents,
       // 'totalMaleStudents' => $totalMaleStudents,
        'enrolledCourses' => $enrolledCourses,
        
        'allStudents' => $allStudents,
        'allCourses' => $allCourses,
        '$allEnrolledCourses' => $allEnrolledCourses,
        'courses' => Course::with('students')->get(),
        'students' => Student::with('courses')->get(),
    ]);
    }
}
