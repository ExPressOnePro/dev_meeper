<?php

namespace App\Http\Controllers;

use App\Models\Stand;
use App\Models\StandRecord;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandController extends Controller
{
    public function index(Request $request)
    {
        $stands = Stand::all();
        return inertia('Stands/Index', ['stands' => $stands]);
    }

    public function create()
    {
        return inertia('Stands/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'congregation_id' => 'required|integer|exists:congregations,id',
            'weeks_schedules' => 'required|array',
            'publishers_to_stand' => 'required|integer|min:2|max:3',
            'show_next_weeks' => 'required|boolean',
            'day_to_active' => 'required|array',
            'time_to_active' => 'required|array',
            'active' => 'required|boolean',
        ]);

        Stand::create($request->all());

        return redirect()->route('stands.index')->with('success', 'Stand created successfully.');
    }

    public function show(Stand $stand)
    {
        // Преобразование строки JSON в объект, если это необходимо
        if (is_string($stand->weeks_schedules)) {
            $stand->weeks_schedules = json_decode($stand->weeks_schedules, true);
        }

        // Получение записей из таблицы stand_records
        $standRecords = StandRecord::where('stand_id', $stand->id)->get();

        // Получение уникальных ID пользователей из записей
        $userIds = $standRecords->pluck('user_1')
            ->merge($standRecords->pluck('user_2'))
            ->merge($standRecords->pluck('user_3'))
            ->unique()
            ->filter()
            ->all();

        // Получение данных о пользователях
        $users = User::whereIn('id', $userIds)->get()->keyBy('id');

        // Форматирование данных для отображения
        $weeksSchedules = $stand->weeks_schedules;

        $formattedSchedules = [];
        foreach ($weeksSchedules as $week) {
            $weekNumber = $week['week'];
            $startDate = new DateTime();
            $startDate->setISODate((int)date('Y'), (int)date('W')); // Начало текущей недели

            if ($weekNumber == 2) {
                $startDate->modify('+1 week'); // Переход к началу следующей недели
            }

            $dates = [];
            for ($i = 0; $i < 7; $i++) {
                $dates[] = $startDate->format('Y-m-d');
                $startDate->modify('+1 day');
            }

            $formattedSchedules[] = [
                'week' => $weekNumber,
                'days' => array_map(function ($day) use ($dates) {
                    return [
                        'number' => $day['number'],
                        'time' => $day['time'],
                        'date' => $dates[$day['number'] - 1],
                    ];
                }, $week['days']),
            ];
        }

        return Inertia::render('Stands/StandShow', [
            'stand' => $stand,
            'standRecords' => $standRecords,
            'users' => $users,
            'formattedSchedules' => $formattedSchedules,
        ]);
    }

    public function edit(Stand $stand)
    {
        return Inertia::render('Stands/Edit', ['stand' => $stand]);
    }

    public function update(Request $request, Stand $stand)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'congregation_id' => 'required|integer|exists:congregations,id',
            'weeks_schedules' => 'required|array',
            'publishers_to_stand' => 'required|integer|min:2|max:3',
            'show_next_weeks' => 'required|boolean',
            'day_to_active' => 'required|array',
            'time_to_active' => 'required|array',
            'active' => 'required|boolean',
        ]);

        $stand->update($request->all());

        return redirect()->route('stands.index')->with('success', 'Stand updated successfully.');
    }

    public function destroy(Stand $stand)
    {
        $stand->delete();

        return redirect()->route('stands.index')->with('success', 'Stand deleted successfully.');
    }
}

