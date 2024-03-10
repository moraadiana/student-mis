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
      // dd ($request->all());
        //store data in database set default role
        $user = User::create([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => 2,
        ]);


        return redirect()->route('user.index')->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render(
            'User/Edit',
            [
                'user' => $user->load('role'),
                'roles' => Role::all()
            ]

        );
    }

    public function update(Request $request, User $user)
    {
        $user->update([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => $request->input('role_id'),
        ]);
        return redirect()->route('user.index')->with('success', 'User updated successfully');
    }
}
