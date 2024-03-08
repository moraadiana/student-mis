<?php

namespace App\Http\Controllers;

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
}
