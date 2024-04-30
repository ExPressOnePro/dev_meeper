import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import styles from '@/Pages/User/UserShow.module.css';
import Sidebar from "@/Pages/Congregation/Partials/Sidebar";
import UserDataRow from "@/Pages/User/Partials/UserDataRow";

export default function Show({auth, user}) {

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Собрание / Пользователь /
                    {user.first_name} {user.last_name}</h2>}
            >
                <div className="flex">
                    <Sidebar/>

                    <div className="max-w-2xl mx-auto mt-3">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic details about the user.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <UserDataRow label="ID" value={user.id}/>
                                    <UserDataRow label="Имя" value={user.first_name}/>
                                    <UserDataRow label="Фамилия" value={user.last_name}/>
                                    <UserDataRow label="Почта" value={user.email}/>
                                    <UserDataRow label="Собрание" value={user.congregation.name}/>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl  mt-3">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Permissions</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic details about the user.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>

                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl mx-auto mt-3">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Information obout this
                                    week</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic details about the user.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>

                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
