import React, {useEffect, useState} from 'react';
import Sidebar from "@/Pages/Congregation/Partials/Sidebar";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {usePage} from "@inertiajs/react";
import UsersManagement from "@/Pages/Congregation/Partials/UsersManagement";
import Settings from "@/Pages/Congregation/Partials/Settings";
import Stand from "@/Pages/Congregation/Partials/Stand";
import MainMenu from "@/Pages/Congregation/Partials/MainMenu";


const componentsMap = {
    '/congregation/users': <UsersManagement />,
    '/congregation/settings': <Settings />,
    '/congregation/stands': <Stand />,

};

export default function congregation({auth, menu}) {
    const [component, setComponent] = useState(null);
    const { pathname } = usePage().url;

    useEffect(() => {
        if (menu === 'users') {
            setComponent(<UsersManagement />);
        } else if (menu === 'settings') {
            setComponent(<Settings />);
        } else if (menu === 'stands') {
            setComponent(<Stand />);
        } else {
            setComponent(null);
        }
    }, [menu]);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Собрание</h2>}
            >
                <div className="congregation">
                    <Sidebar/>
                    {/*<MainMenu className="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-gray-500 md:block" />*/}
                    <div className="content">
                        {component}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

