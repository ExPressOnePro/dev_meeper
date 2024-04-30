import React  from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from "@/Pages/Congregation/Partials/Sidebar";

export default function congregation({auth, children, header}) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={header}
            >
                <div className="congregation py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                            <div className="lg:col-span-3">
                                <Sidebar/>
                            </div>
                            <div className="lg:col-span-9">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

