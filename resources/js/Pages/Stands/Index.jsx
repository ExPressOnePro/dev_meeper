import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

export default function StandIndex({ stands }) {
    return (
        <div>
            <h1>Stands</h1>
            <InertiaLink href={route('stands.create')} className="btn btn-primary">Create Stand</InertiaLink>
            <ul>
                {stands.map(stand => (
                    <li key={stand.id}>
                        <InertiaLink href={route('stands.show', stand.id)}>
                            {stand.name} - {stand.location}
                        </InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

