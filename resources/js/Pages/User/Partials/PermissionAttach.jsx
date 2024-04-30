import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function PermissionAttach({ user, onAdd }) {
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Загрузка всех доступных прав
        axios.get('/api/permissions')
            .then(response => {
                setAllPermissions(response.data);
            })
            .catch(() => {
                toast.error('Ошибка при загрузке прав');
            });
    }, []);

    const handleAddPermission = () => {
        if (!selectedPermission) {
            toast.error('Пожалуйста, выберите разрешение');
            return;
        }

        axios.post(route('users.permissions.attach', { userId: user.id }), { permission_id: selectedPermission })
            .then(() => {
                toast.success('Разрешение добавлено');
                onAdd(selectedPermission); // Обновляем родительский компонент
                setSelectedPermission('');
                setIsDropdownOpen(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast.error('Разрешение уже добавлено');
                } else {
                    toast.error('Ошибка при добавлении разрешения');
                }
            });
    };

    return (
        <div className="mt-4">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="ml-2 text-green-600 hover:text-green-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Добавить"
            >
                <FaPlus className="w-5 h-5" />
            </button>

            {isDropdownOpen && (
                <div className="mt-2 relative">
                    <select
                        value={selectedPermission}
                        onChange={(e) => setSelectedPermission(e.target.value)}
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <option value="">Выберите разрешение</option>
                        {allPermissions.map(permission => (
                            <option key={permission.id} value={permission.id}>
                                {permission.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddPermission}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Добавить
                    </button>
                </div>
            )}
        </div>
    );
}
