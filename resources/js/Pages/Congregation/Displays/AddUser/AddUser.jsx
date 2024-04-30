import React, { useEffect } from 'react';
import Congregation from '@/Pages/Congregation/Congregation';
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function AddUser({ auth, flash }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        user_code: '',
    });

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }
        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.addToCongregation'), {
            preserveState: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.user_code) {
                    toast.error(errors.user_code);
                }
            },
        });
    };

    return (
        <Congregation auth={auth}>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg  mx-auto ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Добавление пользователя
                </h2>
                <p className="text-gray-700 mb-4">
                    Чтобы добавить пользователя, пожалуйста, введите код пользователя в поле ниже и нажмите кнопку
                    «Добавить».
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="user_code" className="block text-gray-600 text-sm font-medium mb-2">
                            Код пользователя
                        </label>
                        <input
                            id="user_code"
                            type="text"
                            placeholder="Введите код пользователя"
                            value={data.user_code}
                            onChange={(e) => setData('user_code', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <InputError message={errors.user_code} className="mt-2" />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        </Congregation>
    );
}
