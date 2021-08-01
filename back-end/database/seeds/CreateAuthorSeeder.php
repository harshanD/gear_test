<?php

use Illuminate\Database\Seeder;
use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class CreateAuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Gears Author',
            'email' => 'author@email.com',
            'password' => bcrypt('1234')
        ]);

        $role = Role::create(['name' => 'Author']);

        $permissions = Permission::whereIn('name', array('books-list', 'books-create', 'books-edit', 'books-delete'))->pluck('id', 'id');

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
    }
}
