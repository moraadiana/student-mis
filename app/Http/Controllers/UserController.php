<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('role')
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 10));



        return Inertia::render(
            'User/Index',
            [
                'users' => $users,
                //'role' => Role::all()
            ]
        );
    }
    public function create()
    {
        return Inertia::render(
            'User/Create',
            [
                'users' => User::all(),
                'roles' => Role::all()

            ]
        );
    }

    //store fnction

    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8'],
            'role_id' => ['required', 'exists:roles,id']
        ]);
       

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id

        ]);

        return redirect()->route('user.index')->with('success', 'User created successfully');
    }
}
