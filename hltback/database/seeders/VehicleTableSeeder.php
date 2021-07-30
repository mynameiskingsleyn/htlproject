<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class VehicleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Vehicle::factory(20)->create();

        $this->command->info('Vehicle table seeded..');
    }
}
