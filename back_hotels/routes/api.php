<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HotelController;
use App\Http\Controllers\API\ReservationController;
use App\Http\Controllers\API\AuthController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::get('/hotels', action: [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);
Route::post('/hotels', [HotelController::class, 'store']);
Route::put('/hotels/{id}', [HotelController::class, 'update']);
Route::delete('/hotels/{id}', [HotelController::class, 'destroy']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
Route::post('/register', action: [AuthController::class, 'register']);


Route::get('/reservations', [ReservationController::class, 'index']);
Route::middleware('auth:api')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
});



Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']); 
    Route::get('/user', [AuthController::class, 'getUser']); 
});
