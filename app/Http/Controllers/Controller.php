<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index(Request $request)
    {
        $congregationId = $request->user()->congregation_id;
        $code = auth()->user()->code;

        if (!$congregationId ) {
            return Inertia::render('Home', [
                'message' => 'Вам нужно связаться с ответственным для того чтобы вас добавили в группу! отправьте код' . $code,
                'congregationId' => $congregationId,
                'code' => $code
            ]);
        }

        return Inertia::render('Home', [
            'congregationId' => $congregationId,
            'greeting' => 'Добро пожаловать!'
        ]);
    }
    public function congregation(Request $request)
    {
        $users = User::all();

        return Inertia::render('Congregation/Congregation', [
            'users' => $users,
        ]);
    }

    public function congregationUsers()
    {
        $users = User::all();
        return Inertia::render('Congregation/Partials/UsersManagement', [
            'users' => $users,
        ]);
    }
    public function congregationSettings()
    {
        $users = User::all();
        return Inertia::render('Congregation/Partials/Settings', [
            'users' => $users,
        ]);
    }
    public function congregationStands()
    {
        $users = User::all();
        return Inertia::render('Congregation/Partials/Stand', [
            'users' => $users,
        ]);
    }
}
