<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Technician;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $keyId = 5;
        $vehicle = Vehicle::inRandomOrder()->first();
        $keys = $vehicle->keys;
        $numKeys = count($keys);
        $keyNum = rand(0, $numKeys);
        $selectedKey = $keys[$keyNum] ?? null;
        if ($selectedKey) {
            $keyId = $selectedKey->id;
        }
        return [
          'vehicle_id'=> $vehicle->id,
          'key_id' => $keyId,
          'technician_id'=> Technician::inRandomOrder()->first()->id
        ];
    }
}
