import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Pages/StandRecords/Modal';
import { toast } from "react-toastify";
import { useForm } from '@inertiajs/inertia-react';

export default function StandShow({ auth, stand, standRecords, users }) {
    const { csrfToken } = usePage().props; // Получаем CSRF-токен из `Inertia`

    const weekDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const { data, setData, post, reset } = useForm({
        date: '',
        time: '',
        user_1: '',
        user_2: '',
        user_3: ''
    });

    const getRecordsForTime = (date, time) => {
        const formattedTime = `${time}:00`;
        return standRecords.filter(record => record.date === date && record.time === formattedTime);
    };

    const getWeekDates = (weekNumber) => {
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

        if (weekNumber === 2) {
            startDate.setDate(startDate.getDate() + 7);
        }

        return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
    };

    const handleTimeClick = (date, time) => {
        console.log('Выбранная дата:', date);
        console.log('Выбранное время:', time);
        setSelectedDate(date);
        setSelectedTime(time);
        setIsModalOpen(true);
    };


    const handleFormSubmit = (data) => {
        post(route('stand.records.store', stand.id), {
            data,
            preserveState: true,
            onSuccess: () => {
                toast.success('Запись успешно добавлена');
                setIsModalOpen(false);
            },
            onError: (errors) => {
                if (errors.user_code) {
                    toast.error(errors.user_code);
                }
            },
        });
    };

    const standRecordsStore = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());

        console.log('Отправляемые данные:', data);
        handleFormSubmit(data);
    };

    const renderSchedule = () => {
        const schedules = stand.weeks_schedules;

        return schedules.map((week, index) => {
            const weekDates = getWeekDates(parseInt(week.week));

            return (
                <div key={index} className="week-schedule mb-8">
                    <h2 className="text-2xl font-bold mb-4">Неделя {week.week}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {week.days.map((day, dayIndex) => {
                            const date = format(weekDates[day.number - 1], 'yyyy-MM-dd');

                            return (
                                <div key={dayIndex} className="day-schedule p-4 border rounded shadow">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {weekDays[day.number - 1]} - {date}
                                    </h3>
                                    {day.time.map((time, timeIndex) => {
                                        const records = getRecordsForTime(date, time);

                                        return (
                                            <div key={timeIndex} className="time-slot mb-2 border p-4 rounded">
                                                <div className="time font-medium flex justify-between items-center">
                                                    {time}
                                                    {records.length === 0 && (
                                                        <button
                                                            onClick={() => handleTimeClick(date, time)}
                                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
                                                            Добавить запись
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="records mt-2">
                                                    {records.length > 0 ? (
                                                        records.map((record, recordIndex) => (
                                                            <div key={recordIndex} className="record mb-1">
                                                                <div>
                                                                    Пользователь 1: {users[record.user_1]?.first_name} {users[record.user_1]?.last_name}
                                                                </div>
                                                                <div>
                                                                    Пользователь 2: {users[record.user_2]?.first_name} {users[record.user_2]?.last_name}
                                                                </div>
                                                                <div>
                                                                    Пользователь 3: {users[record.user_3]?.first_name} {users[record.user_3]?.last_name}
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-gray-500">Нет записей</div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Stand" />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Расписание стенда {stand.name}</h1>
                {renderSchedule()}
                {isModalOpen && (
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        title="Добавить запись"
                    >
                        <form onSubmit={standRecordsStore}>
                            <input type="hidden" name="date" value={selectedDate} />
                            <input type="hidden" name="time" value={`${selectedTime}:00`} />
                            <div className="mb-4">
                                <label htmlFor="user_1" className="block text-sm font-medium text-gray-700">Пользователь 1</label>
                                <select name="user_1" id="user_1" className="form-select mt-1 block w-full">
                                    <option value="">Выберите пользователя</option>
                                    {Object.entries(users).map(([id, user]) => (
                                        <option key={id} value={id}>{user.first_name} {user.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user_2" className="block text-sm font-medium text-gray-700">Пользователь 2</label>
                                <select name="user_2" id="user_2" className="form-select mt-1 block w-full">
                                    <option value="">Выберите пользователя</option>
                                    {Object.entries(users).map(([id, user]) => (
                                        <option key={id} value={id}>{user.first_name} {user.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user_3" className="block text-sm font-medium text-gray-700">Пользователь 3</label>
                                <select name="user_3" id="user_3" className="form-select mt-1 block w-full">
                                    <option value="">Выберите пользователя</option>
                                    {Object.entries(users).map(([id, user]) => (
                                        <option key={id} value={id}>{user.first_name} {user.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Сохранить
                                </button>
                            </div>
                        </form>
                    </Modal>


                )}
            </div>
        </AuthenticatedLayout>
    );
};
