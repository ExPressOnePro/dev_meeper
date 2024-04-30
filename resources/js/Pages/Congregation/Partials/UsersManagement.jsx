import React, { useState } from 'react';
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Pages/Congregation/Partials/Sidebar";
import {InertiaLink} from "@inertiajs/inertia-react";

export default function UsersManagement({ auth }) {
    const { users } = usePage().props;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedUsers = users.slice().sort((a, b) => {
        if (sortConfig.key !== null) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    const handleSort = (key) => {
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            setSortConfig({ key, direction: 'desc' });
        } else {
            setSortConfig({ key, direction: 'asc' });
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    // Вычисление индекса первой и последней записи на текущей странице
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedUsers.slice(indexOfFirstRecord, indexOfLastRecord);

    // Вычисление общего количества страниц
    const totalPages = Math.ceil(sortedUsers.length / recordsPerPage);

    // Изменение текущей страницы
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowClick = (userId) => {
        // Перенаправляем пользователя на страницу пользователя
        InertiaLink({ href: route('user.account', userId) });
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Собрание / Управление пользователями</h2>}
            >
                <div className="flex">
                    <Sidebar />
                    <div className="content">

                        <div className="flex items-center space-x-2 mb-4">
                            <span>Записей на странице:</span>
                            <select
                                className="border border-gray-300 rounded"
                                value={recordsPerPage}
                                onChange={(e) => {
                                    setRecordsPerPage(parseInt(e.target.value));
                                    setCurrentPage(1); // Сбросить текущую страницу при изменении кол-ва записей
                                }}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th
                                    onClick={() => handleSort('first_name')}
                                    className="cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div className="flex items-center">
                                        <span>Имя</span>
                                        {sortConfig.key === 'first_name' && (
                                            <svg
                                                className={`ml-2 h-4 w-4 ${sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                {sortConfig.direction === 'asc' ? (
                                                    <path fillRule="evenodd"
                                                          d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                ) : (
                                                    <path fillRule="evenodd"
                                                          d="M13.707 12.707a1 1 0 01-1.414 0L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                )}
                                            </svg>
                                        )}
                                    </div>
                                </th>

                                <th
                                    onClick={() => handleSort('last_name')}
                                    className="cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div className="flex items-center">
                                        <span>Фамилия</span>
                                        {sortConfig.key === 'last_name' && (
                                            <svg
                                                className={`ml-2 h-4 w-4 ${sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                {sortConfig.direction === 'asc' ? (
                                                    <path fillRule="evenodd"
                                                          d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                ) : (
                                                    <path fillRule="evenodd"
                                                          d="M13.707 12.707a1 1 0 01-1.414 0L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                )}
                                            </svg>
                                        )}
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('email')}
                                    className="cursor-pointer px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div className="flex items-center">
                                        <span>почта</span>
                                        {sortConfig.key === 'email' && (
                                            <svg
                                                className={`ml-2 h-4 w-4 ${sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                {sortConfig.direction === 'asc' ? (
                                                    <path fillRule="evenodd"
                                                          d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                ) : (
                                                    <path fillRule="evenodd"
                                                          d="M13.707 12.707a1 1 0 01-1.414 0L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                    />
                                                )}
                                            </svg>
                                        )}
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentRecords.map(user => (
                                <tr key={user.id} className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleRowClick(user.id)}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <InertiaLink href={route('user.show', user.id)}>
                                            {user.first_name}
                                        </InertiaLink>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                {Array.from({length: totalPages}, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                            currentPage === index + 1 ? 'text-blue-500' : 'text-gray-700'
                                        } hover:bg-gray-50`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};
