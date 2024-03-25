<?php

use App\Http\Controllers\API\CongregationController;
use App\Http\Controllers\API\StandController;
use App\Http\Controllers\API\StandRecordsController;
use App\Models\Congregation;
use App\Models\Stand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/stand', [StandController::class, 'index']);
Route::get('/stand/{id}', [StandController::class, 'show']);
Route::post('/stand', [StandController::class, 'store']);
Route::post('/stand-update/{id}', [StandController::class, 'update']);

Route::post('/stand-update-week/{id}/{weekNumber}', [StandController::class, 'updateWeekSchedule']);



Route::get('/stand-record/{id}', [StandRecordsController::class, 'show']);
Route::get('/stand-records/{id}', [StandRecordsController::class, 'index']);
Route::get('/stands-records', [StandRecordsController::class, 'allStands']);
Route::post('/stand-records-store', [StandRecordsController::class, 'store']);




Route::get('/congregations', [CongregationController::class, 'index']);
Route::get('/congregation/{id}', [CongregationController::class, 'show']);
Route::post('/congregation-store', [CongregationController::class, 'store']);
Route::post('/congregation-update/{id}', [CongregationController::class, 'update']);

Route::middleware('auth:sanctum')->group(function () {

Route::middleware('')->group(function () {

});


    Route::post('stand/records', [StandRecordsController::class, 'store']);
    Route::post('stand/records/{id}', [StandRecordsController::class, 'removePublishers']);
    Route::get('stand/records/{id}', [StandRecordsController::class, 'show']);
    Route::put('stand/records/{id}', [StandRecordsController::class, 'update']);
    Route::delete('stand/records/{id}', [StandRecordsController::class, 'destroy']);

});

