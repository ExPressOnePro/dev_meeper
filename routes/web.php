<?php

use App\Http\Controllers\API\StandRecordsController;
use App\Http\Controllers\API\UserCongregationController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StandController;
use App\Http\Controllers\StandHistoryController;
use App\Http\Controllers\StandRecordController;
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
Route::delete('/users/{userId}/permissions/{permissionId}', [UserController::class, 'deletePermission'])
    ->name('users.permissions.delete');

Route::post('/users/{userId}/permissions', [UserController::class, 'attachPermission'])
    ->name('users.permissions.attach');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('stands', StandController::class);
    Route::get('stands/{stand}/records', [StandRecordController::class, 'index'])->name('stand.records.index');
    Route::get('stands/{stand}/records/create', [StandRecordController::class, 'create'])->name('stand.records.create');
    Route::post('stand/{stand}/records', [StandRecordController::class, 'store'])->name('stand.records.store');
    Route::get('stands/{stand}/records/{record}/edit', [StandRecordController::class, 'edit'])->name('stand.records.edit');
    Route::put('stands/{stand}/records/{record}', [StandRecordController::class, 'update'])->name('stand.records.update');
    Route::delete('stands/{stand}/records/{record}', [StandRecordController::class, 'destroy'])->name('stand.records.destroy');



    Route::get('/home', [Controller::class, 'index'])->name('home');
    Route::get('/congregation', [Controller::class, 'congregation'])->name('congregation');
    Route::get('/congregation/UserManager', [Controller::class, 'congregationUsers'])->name('UserManager');
    Route::get('/congregation/settings', [Controller::class, 'congregationSettings'])->name('congregationSettings');
    Route::get('/congregation/stands', [Controller::class, 'congregationStands'])->name('congregationStands');
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/user/{userId}', [UserController::class, 'show'])->name('user.show');
    Route::post('/users/add-to-congregation', [UserCongregationController::class, 'addUserToCongregation'])->name('users.addToCongregation');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
});


Route::get('/upload-page', function () {
    return Inertia::render('UploadPage');
});

Route::get('congregation/AddUser', function () {
    return Inertia::render('Congregation/Displays/AddUser/AddUser');
})->name('AddUser');

Route::get('congregation/AddStand', function () {
    return Inertia::render('Congregation/Displays/AddStand/AddStand');
})->name('AddStand');

Route::get('/fileGallery', function () {
    return Inertia::render('Files/FileGallery');
})->name('fileGallery');

Route::get('/files/{fileName}', [FileController::class, 'show']);
Route::get('/thumbnail/{fileName}', [FileController::class, 'thumbnail'])->name('file.thumbnail');
Route::get('/file-list', [FileController::class, 'index'])->name('file.list');
Route::get('/download/{fileName}', [FileController::class, 'download'])->name('file.download');

Route::post('/upload', [FileController::class, 'uploadMultiple']);

Route::middleware(['json.request'])->group(function () {
    Route::get('/files', [FileController::class, 'getFiles'])->name('files');
    // Добавьте другие маршруты, возвращающие JSON
});

Route::get('/file/{fileName}', [FileController::class, 'getFile']);


Route::get('/standsss/{id}', [StandRecordsController::class, 'index'])->name('stands.index');


require __DIR__.'/auth.php';
