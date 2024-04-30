import React from 'react';
import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Pages/Congregation/Partials/Sidebar";
export default function UsersManagement({auth}) {
    const { users } = usePage().props;

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Собрание</h2>}
            >
                <div className="flex">
                    <Sidebar/>
                    <div className="content">
                        <h1>Настройки</h1>
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>{user.first_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    );
};
