<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\Key;
use KeyFactory;
use DB;
use Illuminate\Database\Eloquent\Factories\Factory;
use \Log;
use FactoryTrait;

class VehicleFactory extends Factory
{
    use FactoryTrait;
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Vehicle::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            //'key_id'=>$this->uniqueKeyId('vehicles', 'key_id'),
            // 'key_id'=>function () {
            //     //Key::inRandomOrder()->first()->id
            //     return Key::factory()->create()->id;
            // },
            'year'=>$this->getYear(),
            'make'=>$this->getMake(),
            'model'=>$this->getModel(),
            'vin'=>$this->getVin(9)
        ];
    }
}
