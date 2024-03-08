<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //make user recode
        User::create([
            'users_username' => 'admin',
            'users_password' => bcrypt('admin'),
            'users_email' => 'admin@gmail.com',
            'roles_id' => 1
        ]);
    }
}
