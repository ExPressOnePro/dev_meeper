import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

export default function StandRecordIndex({ stand, records }) {
    return (
        <div>
            <h1>Records for {stand.name}</h1>
            <InertiaLink href={route('stands.show', stand.id)} className="btn btn-secondary">Back to Stand</InertiaLink>
            <InertiaLink href={route('stand.records.create', stand.id)} className="btn btn-primary">Create Record</InertiaLink>
            <ul>
                {records.map(record => (
                    <li key={record.id}>
                        {record.date} {record.time} - {record.user1?.name}, {record.user2?.name}, {record.user3?.name}
                        <InertiaLink href={route('stand.records.edit', record.id)} className="btn btn-primary">Edit</InertiaLink>
                        <InertiaLink href={route('records.histories.index', record.id)} className="btn btn-secondary">View History</InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
