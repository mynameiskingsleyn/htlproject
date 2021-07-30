<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $with = ['keys'];
    public function keys()
    {
        return $this->hasMany(Key::class, 'vehicle_id');
    }
}
