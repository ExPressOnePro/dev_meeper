<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\User;
use App\Traits\HasRolesAndPermissions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    use HasRolesAndPermissions;
    public function edit()
    {
        $user = Auth::user();
        return inertia('Account/Edit', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        // Поиск пользователя по ID
        $user = User::findOrFail($id);

        // Валидация данных запроса
        $validatedData = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],

        ]);

        // Обновление данных пользователя
        $user->first_name = $validatedData['first_name'];
        $user->last_name = $validatedData['last_name'];
        $user->email = $validatedData['email'];

//        if (!empty($validatedData['password'])) {
//            $user->password = Hash::make($validatedData['password']);
//        }

        $user->save();

        // Возвращение ответа
        return redirect()->route('user.show', $user->id)
            ->with('success', 'Пользователь обновлен успешно.');
    }
    public function destroy()
    {
        $user = Auth::user();
        $user->delete();

        return redirect('/')->with('success', 'Account deleted successfully.');
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     */
    public function index(Request $request)
    {

    }

    public function deletePermission(Request $request, $userId, $permissionId)
    {
        try {
            $user = User::findOrFail($userId);
            $permission = Permission::findOrFail($permissionId);

            // Удаление права у пользователя
            $user->permissions()->detach($permissionId);

            return response()->json(['message' => 'Разрешение удалено']);
        } catch (\Exception $e) {
            // Логирование ошибки
            Log::error('Ошибка удаления разрешения: ' . $e->getMessage());

            return response()->json(['message' => 'Ошибка удаления разрешения'], 500);
        }
    }

    public function attachPermission(Request $request, $userId)
    {
        $request->validate([
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $user = User::findOrFail($userId);
        $permission = Permission::findOrFail($request->permission_id);

        // Проверяем, есть ли уже у пользователя это разрешение
        if ($user->permissions->contains($permission)) {
            return response()->json(['message' => 'Разрешение уже добавлено'], 400);
        }

        $user->permissions()->attach($permission);

        return response()->json(['message' => 'Разрешение добавлено'], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show($userId)
    {
        $user = User::with(['congregation', 'permissions'])->findOrFail($userId);
        $allPermissions = Permission::all(); // Получаем все доступные разрешения

        return Inertia::render('User/Show', [
            'user' => $user,
            'permissions' => $user->permissions,
            'allPermissions' => $allPermissions, // Передаем все разрешения
            'status' => 'success' // Пример статуса
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
//    public function update(Request $request, string $id)
//    {
//        //
//    }

    /**
     * Remove the specified resource from storage.
     */
}


