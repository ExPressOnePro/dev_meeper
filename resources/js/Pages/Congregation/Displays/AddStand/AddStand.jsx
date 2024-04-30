import React, {useEffect, useState} from 'react';
import Congregation from '@/Pages/Congregation/Congregation';
import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";

export default function AddStand({ auth, flash }) {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1); // Шаг текущего этапа
    const [data, setData] = useState({ name: '', location: '', days: {} });
    const [errors, setErrors] = useState({ name: '', location: '' });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setStep(1);
    };

    const handleNextStep = () => {
        // Валидация для первого этапа
        if (step === 1) {
            if (!data.name || !data.location) {
                setErrors({
                    name: !data.name ? 'Название обязательно' : '',
                    location: !data.location ? 'Местоположение обязательно' : '',
                });
                return;
            }
            setStep(2);
        } else if (step === 2) {
            // Валидация для второго этапа
            if (Object.keys(data.days).length === 0) {
                // Пример проверки на наличие выбранных дней
                // Установите сообщение об ошибке, если дни не выбраны
                return;
            }
            // Сохранение данных или отправка формы
            console.log('Creating new stand with data:', data);
            handleCloseModal(); // Закрытие модального окна после завершения
        }
    };

    const handleDayChange = (day, time) => {
        setData(prevData => ({
            ...prevData,
            days: {
                ...prevData.days,
                [day]: [...(prevData.days[day] || []), time]
            }
        }));
    };

    const handleTimeRemove = (day, timeToRemove) => {
        setData(prevData => ({
            ...prevData,
            days: {
                ...prevData.days,
                [day]: prevData.days[day].filter(time => time !== timeToRemove)
            }
        }));
    };

    return (
        <Congregation auth={auth}>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg  mx-auto ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Добавление пользователя
                </h2>
                <p className="text-gray-700 mb-4">
                    Чтобы добавить пользователя, пожалуйста, введите код пользователя в поле ниже и нажмите кнопку
                    «Добавить».
                </p>
                <form className="p-6">
                    {step === 1 && (
                        <>
                            <h2 className="text-lg font-medium text-gray-900">Создание нового стенда</h2>
                            <p className="mt-1 text-sm text-gray-600">Заполните поля ниже для того чтобы добавить новый
                                стенд</p>

                            <div className="mt-6">
                                <InputLabel htmlFor="name" value="Название" className="sr-only"/>
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    className="mt-1 block w-full"
                                    placeholder="Название"
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-6">
                                <InputLabel htmlFor="location" value="Местоположение" className="sr-only"/>
                                <TextInput
                                    id="location"
                                    type="text"
                                    name="location"
                                    onChange={(e) => setData({...data, location: e.target.value})}
                                    className="mt-1 block w-full"
                                    placeholder="Местоположение"
                                />
                                <InputError message={errors.location} className="mt-2"/>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={handleCloseModal}>Отменить</SecondaryButton>
                                <SuccessButton className="ms-3" onClick={handleNextStep}>
                                    Перейти к следующему этапу
                                </SuccessButton>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-lg font-medium text-gray-900">Выберите дни недели и часы</h2>
                            <p className="mt-1 text-sm text-gray-600">Укажите дни недели и часы для каждого дня.</p>

                            <div className="mt-6">
                                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                                    <div key={day} className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-700">{day}</h3>
                                        <div className="mt-2 space-y-2">
                                            {(data.days[day] || []).map(time => (
                                                <div key={time}
                                                     className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                                    <span>{time}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleTimeRemove(day, time)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <input
                                            type="time"
                                            onChange={(e) => handleDayChange(day, e.target.value)}
                                            className="mt-2 block w-full"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={() => setStep(1)}>Назад</SecondaryButton>
                                <SuccessButton className="ms-3" onClick={handleNextStep}>
                                    Завершить
                                </SuccessButton>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </Congregation>
    );
}
