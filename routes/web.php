<?php

use App\Http\Controllers\API\StandController;
use App\Http\Controllers\API\StandRecordsController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (auth()->check()) {
        return Inertia::location(route('home'));
    } else {
        return Inertia::location(route('login'));
    }
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/home', [Controller::class, 'index'])->name('home');
    Route::get('/congregation', [Controller::class, 'congregation'])->name('congregation');
    Route::get('/congregation/users', [Controller::class, 'congregationUsers'])->name('congregationUsers');
    Route::get('/congregation/settings', [Controller::class, 'congregationSettings'])->name('congregationSettings');
    Route::get('/congregation/stands', [Controller::class, 'congregationStands'])->name('congregationStands');
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/user/{userId}', [UserController::class, 'show'])->name('user.show');

});


Route::get('/standsss/{id}', [StandRecordsController::class, 'index'])->name('stands.index');

require __DIR__.'/auth.php';
