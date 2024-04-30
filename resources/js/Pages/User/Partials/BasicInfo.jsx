import React from "react";

export default function BasicInfo({
                                      flash,
                                      user,
                                      isEditing,
                                      setIsEditing,
                                      data,
                                      setData,
                                      errors,
                                      handleSubmit,
                                      processing,
                                  }) {
    return (
        <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="border-b border-gray-200">
                {flash.success && <div className="mb-4 text-green-600">{flash.success}</div>}
                {!isEditing ? (
                    <div>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Основная информация</h3>
                            <p className="mt-2 text-gray-700">Имя: {user.first_name}</p>
                            <p className="mt-2 text-gray-700">Фамилия: {user.last_name}</p>
                            <p className="mt-2 text-gray-700">Электронная почта: {user.email}</p>
                            <p className="mt-2 text-gray-700">code: {user.code}</p>
                            <p className="mt-2 text-gray-700">language: {user.language}</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Изменить
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Имя</label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className={`mt-1 block w-full border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Фамилия</label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className={`mt-1 block w-full border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Электронная почта</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                disabled={processing}
                            >
                                Сохранить изменения
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
