import React from 'react';
import {Link} from "@inertiajs/react";
import {InertiaLink} from "@inertiajs/inertia-react";

export default function Sidebar({show}) {

    return (
        <div className="bg-gray-500 text-white h-screen w-1/6">
            <div className="p-4">
                <ul>
                    <li>
                        <InertiaLink
                            href={route('congregationUsers')}
                            className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        >
                            Управление пользователями
                        </InertiaLink>
                    </li>
                    <li>
                        <InertiaLink
                            href={route('congregationSettings')}
                            className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        >
                            Настройки собрания
                        </InertiaLink>
                    </li>
                    <li>
                        <InertiaLink
                            href={route('congregationStands')}
                            className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        >
                            Стенды
                        </InertiaLink>
                    </li>
                </ul>
            </div>
        </div>

    );
};


