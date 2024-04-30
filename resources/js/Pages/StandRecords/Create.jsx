import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';

export default function StandRecordCreate({stand}) {
    const { data, setData, post, errors } = useForm({
        date: '',
        time: '',
        user_1: '',
        user_2: '',
        user_3: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('stand.records.store', stand.id), {
            onSuccess: () => toast.success('Запись успешно добавлена'),
            onError: () => toast.error('Ошибка при добавлении записи')
        });
    };

    return (
        <div>
            <h1>Добавить запись для {stand.name}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Дата</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                    />
                    {errors.date && <div>{errors.date}</div>}
                </div>
                <div>
                    <label>Время</label>
                    <input
                        type="time"
                        value={data.time}
                        onChange={e => setData('time', e.target.value)}
                    />
                    {errors.time && <div>{errors.time}</div>}
                </div>
                <div>
                    <label>Пользователь 1</label>
                    <input
                        type="text"
                        value={data.user_1}
                        onChange={e => setData('user_1', e.target.value)}
                    />
                    {errors.user_1 && <div>{errors.user_1}</div>}
                </div>
                <div>
                    <label>Пользователь 2</label>
                    <input
                        type="text"
                        value={data.user_2}
                        onChange={e => setData('user_2', e.target.value)}
                    />
                    {errors.user_2 && <div>{errors.user_2}</div>}
                </div>
                <div>
                    <label>Пользователь 3</label>
                    <input
                        type="text"
                        value={data.user_3}
                        onChange={e => setData('user_3', e.target.value)}
                    />
                    {errors.user_3 && <div>{errors.user_3}</div>}
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};
