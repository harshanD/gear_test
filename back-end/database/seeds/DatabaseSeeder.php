<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = new \App\User();
        $user->name = 'Gears Test';
        $user->email = 'gears@email.com';
        $user->password = bcrypt('gears');
        $user->save();
    }
}
