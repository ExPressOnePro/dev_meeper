import React from 'react';
import PermissionsDetach from '@/Pages/User/Partials/PermissionsDetach';
import PermissionAttach from '@/Pages/User/Partials/PermissionAttach';

export default function UserPermissions({ permissions, user, onDelete, onAdd }) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Разрешения</h3>
            <PermissionsDetach permissions={permissions} user={user} onDelete={onDelete} />
            <PermissionAttach user={user} onAdd={onAdd} />
        </div>
    );
}
