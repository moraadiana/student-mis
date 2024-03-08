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
            'username' => 'admin',
            'password' => bcrypt('admin'),
            'email' => 'admin@gmail.com',
            'role_id' => 1
        ]);
    }
}
