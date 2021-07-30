<?php

namespace Database\Seeders;

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
        // \App\Models\User::factory(10)->create()
        $this->call(TechnicianTableSeeder::class);
        $this->call(VehicleTableSeeder::class);
        $this->call(KeyTableSeeder::class);
        $this->call(OrderTableSeeder::class);
    }
}
