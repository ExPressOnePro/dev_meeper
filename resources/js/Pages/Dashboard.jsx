import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React  from "react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                    <div className="container mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
                                <div className="flex justify-between">
                                    <div className="flex-1 text-gray-900 text-lg">Понедельник</div>
                                    <div className="flex flex-col items-end flex-1">
                                        <div className="text-gray-700 text-lg font-semibold">25.07.2023</div>
                                        <div className="text-gray-700 text-lg font-semibold">17:00</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-700 text-sm">Место: <span className="font-medium">Центральная остановка</span>
                                    </p>
                                    <p className="text-gray-700 text-sm">Партнер: <span className="font-medium">Головенко Владислав</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                                <div className="flex justify-between">
                                    <div className="flex-1 text-gray-900 text-lg">Понедельник</div>
                                    <div className="flex flex-col items-end flex-1">
                                        <div className="text-gray-700 text-lg font-semibold">25.07.2023</div>
                                        <div className="text-gray-700 text-lg font-semibold">17:00</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-700 text-sm">Место: <span
                                        className="font-medium text-gray-800">Центральная остановка</span></p>
                                    <p className="text-gray-700 text-sm">Партнер: <span
                                        className="font-medium text-gray-800">Головенко Владислав</span></p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex-1 text-gray-900 text-lg">Понедельник</div>
                                    <div className="flex flex-col items-end flex-1">
                                        <div className="text-gray-700 text-2xl font-bold">25.07.2023</div>
                                        <div className="text-gray-700 text-xl font-bold">17:00</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-700 text-sm">Место: Центральная остановка</p>
                                    <p className="text-gray-700 text-sm">Партнер: Головенко Владислав</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg shadow-md mb-4">
                                <div className="text-white text-center">
                                    <h3 className="text-lg font-bold">Понедельник, 25.07.2023</h3>
                                    <p className="text-lg">17:00</p>
                                </div>
                                <div className="mt-4 text-white">
                                    <p>Место: Центральная остановка</p>
                                    <p>Партнер: Головенко Владислав</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
                                <div className=" text-center">
                                    <h3 className="text-lg font-bold">Понедельник, 25.07.2023 </h3>
                                    <p className="text-lg">17:00</p>
                                </div>
                                <div className="flex justify-between mt-4 ">
                                    <div><p>Место:</p></div>
                                    <div><p>Центральная остановка</p></div>
                                </div>
                                <div className="flex justify-between ">
                                    <div><p>Партнер:</p></div>
                                    <div><p>Головенко Владислав</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
