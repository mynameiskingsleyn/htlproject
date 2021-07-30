<?php

namespace Database\Factories;

use DB;

trait FactoryTrait
{
    public function uniqueKeyId($tableName, $column)
    {
        $max = 20;
        $key = 0;
        for ($i = 1; $i < $max; $i++) {
            $found = DB::table($tableName)->where($column, $i)->count();
            if ($found == 0) {
                $key = $i;
                break;
            }
        }
        return $key;
    }

    public function getRandomKeyId($tableName)
    {
        $item = DB::table($tableName)->inRandomOrder()->first();
        if ($item) {
            return $item->id;
        }
        return null;
    }

    public function getYear()
    {
        $years = [2010,2020,2019,2001,2015,2021,2022,2005];
        $max = count($years) - 1;
        $l = rand(0, $max);
        return $years[$l];
    }

    public function getModel()
    {
        $models = ['model1','model2','model3','model4','model5','model6','model7','model8'];
        $max = count($models) - 1;
        $l = rand(0, $max);
        return $models[$l];
    }

    public function getMake()
    {
        $makes = ['make1','make2','make3','makel4','make5','make6','make7','make8'];
        $max = count($makes) - 1;
        $l = rand(0, $max);
        return $makes[$l];
    }

    public function getVin($len)
    {
        $str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz';
        return substr(str_shuffle($str), 0, $len);
    }
}
