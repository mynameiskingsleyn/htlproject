<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\TechnicianController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('orders', OrderController::class);
Route::apiResource('vehicles', VehicleController::class);
Route::apiResource('technicians', TechnicianController::class);

Route::post('register', [AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);
