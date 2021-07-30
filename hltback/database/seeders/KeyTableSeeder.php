<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class KeyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \App\Models\Key::factory(50)->create();

        $this->command->info('Keys table seeded..');
    }
}
