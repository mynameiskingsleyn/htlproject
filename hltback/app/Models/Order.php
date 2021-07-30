<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = [];

    public function key()
    {
        return $this->hasOne(Key::class);
    }

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }

    public function technician()
    {
        return $this->hasOne(Technisian::class);
    }
}
