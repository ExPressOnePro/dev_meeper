import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Congregation from '@/Pages/Congregation/Congregation';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserPermissions from '@/Pages/User/Partials/UserPermissions';
import BasicInfo from "@/Pages/User/Partials/BasicInfo";

export default function Show({ auth, user }) {
    const { permissions, status, flash } = usePage().props;
    const [userPermissions, setUserPermissions] = useState(permissions || []);

    const { data, setData, put, processing, errors } = useForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        code: user.code || '',
        language: user.language || '',
        account_status: user.account_status || '',
    });

    useEffect(() => {
        if (flash.message.success) {
            toast.success(flash.message.success);
        }
        if (flash.message.error) {
            toast.error(flash.message.error);
        }
    }, [flash]);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    const handleDeletePermission = (permissionId) => {
        axios.delete(route('users.permissions.delete', { userId: user.id, permissionId }))
            .then(() => {
                toast.success('Разрешение удалено');
                setUserPermissions(prevPermissions =>
                    prevPermissions.filter(permission => permission.id !== permissionId)
                );
            })
            .catch(() => {
                toast.error('Ошибка при удалении разрешения');
            });
    };

    const handleAddPermission = (permissionId) => {
        axios.get(`/api/permissions/${permissionId}`)
            .then(response => {
                setUserPermissions(prevPermissions => [
                    ...prevPermissions,
                    response.data,
                ]);
            })
            .catch(() => {
                toast.error('Ошибка при добавлении разрешения');
            });
    };

    return (
        <>
            <Congregation
                auth={auth}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Собрание / Пользователь / {user.first_name} {user.last_name}</h2>}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        <BasicInfo
                            flash={flash}
                            user={user}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            data={data}
                            setData={(key, value) => setData({ ...data, [key]: value })}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            processing={processing}
                        />
                        <div className="w-full md:w-80 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="border-b border-gray-200">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Статус</h3>
                                <p className="mt-2 text-gray-700">{user.account_status}</p>
                            </div>
                            <UserPermissions
                                permissions={userPermissions}
                                user={user}
                                onDelete={handleDeletePermission}
                                onAdd={handleAddPermission}
                            />
                        </div>
                    </div>
                </div>
            </Congregation>
        </>
    );
}
