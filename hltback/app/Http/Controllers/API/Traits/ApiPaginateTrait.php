<?php

namespace App\Http\Controllers\API\Traits;

trait ApiPaginateTrait
{
    public function getSkip($page, $count)
    {
        if ($page < 1) {
            $page = 1;
        }
        $skip = ($page - 1) * $count;
        return $skip;
    }
}
