<?php

namespace App\Http\Controllers;

use App\Models\Stand;
use App\Models\StandHistory;
use App\Models\StandRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StandRecordController extends Controller
{
    public function index($standId)
    {
        $stand = Stand::findOrFail($standId);
        $records = StandRecord::where('stand_id', $standId)->get();
        return Inertia::render('StandRecords/Index', ['stand' => $stand, 'records' => $records]);
    }

    public function create($standId)
    {
        $stand = Stand::findOrFail($standId);
        return Inertia::render('StandRecords/Create', ['stand' => $stand]);
    }

    public function store(Request $request, $standId)
    {

        $data = $request->validate([
            'date' => 'required',
            'time' => 'required',
//            'user_1' => 'nullable|exists:users,id',
//            'user_2' => 'nullable|exists:users,id',
//            'user_3' => 'nullable|exists:users,id',
        ]);

        //3333333333333333333333333333333333333333333333333333333333333333333333333 Пример проверки на дублирование
        $existingRecord = StandRecord::where('date', $data['date'])
            ->where('time', $data['time'])
            ->first();
        if ($existingRecord) {
            Log::info('Конфликт записи:', $data);
            return response()->json(['error' => 'Запись уже существует.'], 409);
        }

        // Создание новой записи
        StandRecord::create([
            'stand_id' => $standId,
            'date' => $data['date'],
            'time' => $data['time'],
            'user_1' => $data['user_1'],
            'user_2' => $data['user_2'],
            'user_3' => $data['user_3'],
        ]);

        Log::info('Запись успешно добавлена:', $data);

        return response()->json(['success' => 'Запись успешно добавлена.']);
    }
    public function edit($standId, $recordId)
    {
        $stand = Stand::findOrFail($standId);
        $record = StandRecord::findOrFail($recordId);
        return Inertia::render('StandRecords/Edit', ['stand' => $stand, 'record' => $record]);
    }

    public function update(Request $request, $standId, $recordId)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|time',
            'user_1' => 'nullable|exists:users,id',
            'user_2' => 'nullable|exists:users,id',
            'user_3' => 'nullable|exists:users,id',
        ]);

        $record = StandRecord::findOrFail($recordId);
        $record->update([
            'date' => $request->date,
            'time' => $request->time,
            'user_1' => $request->user_1,
            'user_2' => $request->user_2,
            'user_3' => $request->user_3,
        ]);

        return redirect()->route('stand.records.index', $standId);
    }

    public function destroy($standId, $recordId)
    {
        $record = StandRecord::findOrFail($recordId);
        $record->delete();

        return redirect()->route('stand.records.index', $standId);
    }
}
