<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use App\Providers\RouteServiceProvider;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'login' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        do {
            $uniqueCode = strtoupper(Str::random(6));
        } while (User::where('code', $uniqueCode)->exists());
        Log::info('Generated unique code for user:' . $request->first_name . $request->first_name . ' code -' . $uniqueCode);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'login' => $request->login,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'congregation_id' => 1,
            'code' => $uniqueCode,
            'role' => 'guest',
            'mobile_phone' => '',
            'account_status' => 'active',
            'ip' => $request->ip(),
            'last_login' => Carbon::now()->format('Y-m-d H:i:s'),
            'user_agent' => $request->header('User-Agent'),
        ]);


        event(new Registered($user));
        $user->notify(new EmailVerificationNotification($user));
        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
