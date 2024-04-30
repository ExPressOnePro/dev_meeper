import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ title, onClose, children }) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};
