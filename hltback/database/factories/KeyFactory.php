<?php

namespace Database\Factories;

use App\Models\Key;
use VehicleFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use FactoryTrait;

class KeyFactory extends Factory
{
    use FactoryTrait;
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Key::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            'vehicle_id'=> $this->getRandomKeyId('vehicles'),//$this->uniqueKeyId('keys', 'vehicle_id'),
            'name'=>$this->faker->word(),
            'description'=>$this->faker->sentence(),
            'price'=>$this->getPrice()
        ];
    }

    public function getPrice()
    {
        $prices = [1.00,2.50,3.20,1.25,2.20,5.00];
        $l = rand(0, count($prices)-1);
        return $prices[$l];
    }
}
