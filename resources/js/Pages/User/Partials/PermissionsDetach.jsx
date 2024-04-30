import { FaTrash } from "react-icons/fa";
import React from "react";

export default function PermissionsDetach({ permissions, onDelete }) {
    return (
        <ul className="list-disc pl-5 mt-2">
            {permissions && permissions.length > 0 ? (
                permissions.map(permission => (
                    <li key={permission.id} className="flex justify-between items-center text-gray-700 py-2">
                        {permission.name}
                        <button
                            onClick={() => onDelete(permission.id)}
                            className="ml-2 text-red-600 hover:text-red-800 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Удалить"
                        >
                            <FaTrash className="w-5 h-5"/>
                        </button>
                    </li>
                ))
            ) : (
                <li className="text-gray-500">Нет разрешений</li>
            )}
        </ul>
    );
}
