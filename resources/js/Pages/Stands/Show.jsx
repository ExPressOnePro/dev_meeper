import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

export default function  StandShow ({stand}){
    return (
        <div>
            <h1>{stand.name}</h1>
            <p>{stand.location}</p>
            <InertiaLink href={route('stands.edit', stand.id)} className="btn btn-primary">Edit Stand</InertiaLink>
            <InertiaLink href={route('stand_records.index', stand.id)} className="btn btn-secondary">View Records</InertiaLink>
        </div>
    );
}
