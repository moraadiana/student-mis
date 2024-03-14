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


        return Inertia::render('User/Index', [
            'users' => Inertia::lazy(fn () => User::with('role')->orderBy('created_at', 'desc')->paginate($request->pageSize)),
        ]);
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

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }

    public function store(Request $request)
    {

        $user = User::create([

            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => $request->input('role_id'),
        ]);
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
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role_id' => $request->input('role_id'),
        ]);
        return redirect()->route('usesr.index')->with('success', 'User updated successfully');
    }
    //function to delete user and associated records

}
