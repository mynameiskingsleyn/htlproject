<?php

namespace Database\Factories;

use App\Models\Technician;
use Illuminate\Database\Eloquent\Factories\Factory;

class TechnicianFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Technician::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
          'firstname'=> $this->getFirstName(),
          'lastname'=> $this->getLastName(),
          'trucknumber'=> rand(12345, 60000),
            //
        ];
    }

    public function getFirstName()
    {
        $firsts = ['Mattew','Jon','James','Scott','Petter','Amanda','Stepheny'];
        $max = count($firsts) - 1;
        $l = rand(0, $max);
        return $firsts[$l];
    }

    public function getLastName()
    {
        $lasts = ['Mattews','Jondon','Japherson','ScottMan','PetterSon','Anda','Rock'];
        $max = count($lasts) - 1;
        $l = rand(0, $max);
        return $lasts[$l];
    }
}
