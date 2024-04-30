<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUserToCongregationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_code' => 'required|max:6|min:6|exists:users,code',
        ];
    }

    public function messages()
    {
        return [
            'user_code.required' => 'Код пользователя должен быть заполнен.',
            'user_code.max' => 'Код пользователя должен содержать ровно 6 символов.',
            'user_code.min' => 'Код пользователя должен содержать ровно 6 символов.',
            'user_code.exists' => 'Указанный код пользователя не существует.',
        ];
    }
}
