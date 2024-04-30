import React from 'react';
import PrimaryButtonHref from "@/Components/PrimaryButtonHref";

export default function Sidebar() {

    return (
            <div className="sticky top-[90px]">
                <div className="border-2 border-gray-200 rounded-md mt-0">
                    <div className="p-6 border-b-2 border-gray-200">
                        <h5 className="font-bold text-xl">Documentation</h5>
                    </div>
                    <nav className="p-6">
                        <ul className="space-y-2.5">
                            <PrimaryButtonHref
                                className=" w-full justify-center"
                                href={route('AddUser')}
                                active={route().current('AddUser')}>
                                Добавить пользователя
                            </PrimaryButtonHref>

                            <PrimaryButtonHref
                                className=" w-full justify-center"
                                href={route('UserManager')}
                                active={route().current('UserManager')}>
                                Управление Пользователями
                            </PrimaryButtonHref>

                            <PrimaryButtonHref
                                className=" w-full justify-center"
                                href={route('AddStand')}
                                active={route().current('AddStand')}>
                                Добавить новый стенд
                            </PrimaryButtonHref>

                            <PrimaryButtonHref
                                className=" w-full justify-center"
                                href={route('AddStand')}
                                active={route().current('AddStand')}>
                                Управление Стендами
                            </PrimaryButtonHref>


                            <li className="intro"><a href="#intro" className="hover:text-blue-600">Introduction</a></li>
                            <li className="installation"><a href="#installation"
                                                            className="hover:text-blue-600">Installation</a></li>
                            <li className="file_structure"><a href="#file_structure" className="hover:text-blue-600">File
                                Structure</a></li>
                            <li className="html"><a href="#html" className="hover:text-blue-600">HTML</a></li>
                            <li className="css"><a href="#css" className="hover:text-blue-600">CSS</a></li>
                            <li className="javascript"><a href="#javascript"
                                                          className="hover:text-blue-600">Javascript</a></li>
                            <li className="features"><a href="#features" className="hover:text-blue-600">Features</a>
                            </li>
                            <li className="credit"><a href="#credit"
                                                      className="hover:text-blue-600">Credit &amp; Resources</a></li>
                            <li className="support"><a href="#support" className="hover:text-blue-600">Support</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

        // <div className="bg-gray-500 text-white h-screen w-1/6">
        //     <div className="p-4">
        //         <ul>
        //             <li>
        //             </li>
        //             <li>
        //                 <Link
        //                     href={route('congregationUsers')}
        //                     className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        //                 >
        //                     Управление пользователями
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link
        //                     href={route('congregationSettings')}
        //                     className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        //                 >
        //                     Настройки собрания
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link
        //                     href={route('congregationStands')}
        //                     className="sidebar-link block py-2 px-4 mb-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        //                 >
        //                     Стенды
        //                 </Link>
        //             </li>
        //         </ul>
        //     </div>
        //
        //
        // </div>


    );
};


