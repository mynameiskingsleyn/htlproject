<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TechnicianTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Technician::factory(5)->create();
        
        $this->command->info('Technicians table seeded..');
    }
}
