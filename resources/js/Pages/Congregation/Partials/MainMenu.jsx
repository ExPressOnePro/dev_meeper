import React from 'react';
import MainMenuItem from "@/Pages/Congregation/Partials/MainMenuItem";

export default ({ className }) => {
    return (
        <div className={className}>
            <MainMenuItem text="Users" link="congregationUsers" />
            <MainMenuItem text="Settings" link="congregationSettings" icon="dashboard" />
        </div>
    );
};

