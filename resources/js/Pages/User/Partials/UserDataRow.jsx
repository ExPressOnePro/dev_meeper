import React from 'react';

export default function UserDataRow({ label, value, index }) {
    const backgroundColorClass = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

    return (
        <div className={`${backgroundColorClass} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{value}</dd>
        </div>
    );
}
