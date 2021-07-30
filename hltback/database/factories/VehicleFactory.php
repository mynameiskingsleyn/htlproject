<?php

namespace Database\Factories;

use App\Models\Vehicle;
use App\Models\Key;
use KeyFactory;
use DB;
use Illuminate\Database\Eloquent\Factories\Factory;
use \Log;
use Database\Factories\FactoryTrait;

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
            'year'=>$this->getYear(),
            'make'=>$this->getMake(),
            'model'=>$this->getModel(),
            'vin'=>$this->getVin(9)
        ];
    }
}
