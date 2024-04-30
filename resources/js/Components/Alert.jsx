import React from 'react';

const Alert = ({ type, message }) => {
    let bgColor;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            break;
        default:
            bgColor = 'bg-gray-500';
    }

    return (
        <div className={`p-4 ${bgColor} text-white`}>
            {message}
        </div>
    );
};

export default Alert;
