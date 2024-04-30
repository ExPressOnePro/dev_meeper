import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default ({ icon, link, text }) => {


    return (
        <div className="mb-4">
            <InertiaLink href={route(link)} className="flex items-center group py-3">
                <div>{text}</div>
            </InertiaLink>
        </div>
    );
};
