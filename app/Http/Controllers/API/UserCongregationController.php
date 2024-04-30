<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddUserToCongregationRequest;
use App\Models\User;
use http\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class UserCongregationController extends Controller
{
    public function addUserToCongregation(AddUserToCongregationRequest $request)
    {
        $admin = auth()->user();

        try {
            $user = User::where('code', $request->user_code)->first();
            if ($user) {
                if ($user->congregation_id === $admin->congregation_id) {
                    return Redirect::route('AddUser')->with(['error' => 'Пользователь уже добавлен в эту общину.']);
                }
                if ($user->congregation_id != 1) {
                    return Redirect::route('AddUser')->with([
                        'error' => 'Пользователь уже добавлен к другому собранию.'
                    ]);
                }
                $user->update(['congregation_id' => $admin->congregation_id]);
                return Redirect::route('AddUser')->with([
                    'success' => 'Пользователь успешно добавлен в общину.'
                ]);
            }
            return Redirect::route('AddUser')->with([
                'error' => 'Пользователь не найден.',
                ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при добавлении пользователя в общину: ' . $e->getMessage());
            return Redirect::route('AddUser')->with([
                'error' => 'Произошла ошибка при добавлении пользователя.',
            ]);
        }
    }






}
