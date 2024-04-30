import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Home({auth, congregationId, message, greeting, code }) {
    const copyCode = () => {
        const codeElement = document.getElementById('user-code');
        if (codeElement) {
            const range = document.createRange();
            range.selectNode(codeElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        }
    };
    const messaged = `Пожалуйста, добавь меня в собрание по этому коду: ${code}`;
    const telegramLink = `tg://msg?text=${encodeURIComponent(messaged)}`;
    const openTelegramApp = () => {
        window.location.href = telegramLink;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home Page</h2>}
        >
            <div>
                {!congregationId && (
                    <div className="container mt-5 mx-auto">
                        <div className="bg-white text-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <h5 className="text-xl font-bold mb-4">Важное уведомление!</h5>
                            <p className="text-lg mb-4">Пожалуйста, передайте следующий код ответственному:</p>
                            <code id="user-code"
                                  className="text-2xl font-semibold bg-gray-200 p-2 mb-4">{ code }
                            </code>
                            <hr className="mb-4"/>
                            <div className="flex justify-center">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={copyCode}>
                                    <i className="fa fa-copy"></i> Копировать
                                </button>
                                <button onClick={openTelegramApp}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <i className="fa fa-telegram"></i> отправить в Telegram
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {congregationId > 0 && (
                    <div>
                    <h1>{greeting}</h1>
                        <p>Your congregation ID: {congregationId}</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
