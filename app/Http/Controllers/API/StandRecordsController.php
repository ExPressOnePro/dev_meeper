<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stand;
use App\Models\StandRecords;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\JsonResponse;

class StandRecordsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id): JsonResponse
    {
        $stand = Stand::findOrFail($id);
        $template = json_decode($stand->weeks_schedules, true);
        $next_weeks = $stand->next_weeks;
        $publishers_to_stand = $stand->publishers_to_stand;
        $weeklyData = [];

        for ($i = 1; $i <= $next_weeks; $i++) {
            $weekKey = "week_$i";
            if (isset($template[$weekKey])) {
                $weekData = $template[$weekKey];
                $startDate = Carbon::now()->startOfWeek();

                $weekStartDate = $startDate->copy()->addWeeks($i)->startOfWeek()->format('Y-m-d');
                $weekEndDate = $startDate->copy()->addWeeks($i)->endOfWeek()->format('Y-m-d');

                $daysData = $this->getDaysData($weekData, $startDate, $i, $publishers_to_stand);

                $weeklyData[$weekKey] = [
                    'date' => "$weekStartDate - $weekEndDate",
                    'days' => $daysData,
                ];
            }
        }

        return response()->json([$weeklyData]);
    }

    private function getDaysData($weekData, $startDate, $weekOffset, $publishers_to_stand)
    {
        $daysData = [];
        foreach ($weekData as $day => $hours) {
            $dayDate = $startDate->copy()->addDays($day - 1)->addWeeks($weekOffset - 1)->format('Y-m-d');
            $hoursData = $this->getHoursData($hours, $dayDate, $publishers_to_stand);
            $daysData[$day] = [
                'date' => $dayDate,
                'hour' => $hoursData,
            ];
        }
        return $daysData;
    }

    private function getHoursData($hours, $dayDate, $publishers_to_stand)
    {
        $hoursData = [];
        foreach ($hours as $hour) {
            $hourData = [
                'time' => $hour,
                'record' => $this->getRecordData($dayDate, $hour, $publishers_to_stand),
            ];
            $hoursData[] = $hourData;
        }
        return $hoursData;
    }

    private function getRecordData($dayDate, $hour, $publishers_to_stand)
    {
        $recordData = [];
        $standRecords = StandRecords::where('date', $dayDate)
            ->where('time', $hour)
            ->get();
        foreach ($standRecords as $record) {
            for ($userIndex = 1; $userIndex <= $publishers_to_stand; $userIndex++) {
                $user = User::find($record->{"user_$userIndex"});
                if ($user) {
                    $userData = [
                        'user_id' => $user->id,
                        'first_name' => $user->name,
                        'last_name' => "",
                    ];
                    $recordData["user_$userIndex"] = $userData;
                }
            }
        }
        return $recordData;
    }
    public function allStands(): JsonResponse
    {
        $stands = Stand::all();
        $standsData = [];

        foreach ($stands as $stand) {
            $standData = $this->getStandData($stand);
            $standsData[] = $standData;
        }

        return response()->json($standsData);
    }

    private function getStandData($stand)
    {
        $template = json_decode($stand->weeks_schedules, true);
        $next_weeks = $stand->next_weeks;
        $publishers_to_stand = $stand->publishers_to_stand;
        $standData = [];

        for ($i = 1; $i <= $next_weeks; $i++) {
            $weekKey = "week_$i";
            if (isset($template[$weekKey])) {
                $weekData = $template[$weekKey];
                $startDate = Carbon::now()->startOfWeek();

                $weekStartDate = $startDate->copy()->addWeeks($i)->startOfWeek()->format('Y-m-d');
                $weekEndDate = $startDate->copy()->addWeeks($i)->endOfWeek()->format('Y-m-d');

                $daysData = $this->getDaysData($weekData, $startDate, $i, $publishers_to_stand);

                $standData[$weekKey] = [
                    'date' => "$weekStartDate - $weekEndDate",
                    'days' => $daysData,
                ];
            }
        }

        return [
            'stand_id' => $stand->id,
            'stand_name' => $stand->name,
            'schedule' => $standData,
        ];
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $fillableFields = [
            'stand_id',
            'date',
            'time',
            'user_1',
            'user_2',
            'user_3'
        ];

        $data = $request->only($fillableFields);

        $validator = \Validator::make($data, [
            'stand_id' => 'required|exists:stands,id',
            'date' => [
                'required',
                'date',
                Rule::unique('stand_records')->where(function ($query) use ($request) {
                    return $query->where('time', $request->input('time'));
                }),
            ],
            'time' => 'required|date_format:H:i',
            'user_1' => 'nullable|exists:users,id',
            'user_2' => 'nullable|exists:users,id',
            'user_3' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $standRecord = StandRecords::create($data);

        return response()->json(['message' => 'StandRecords created successfully', 'data' => $standRecord], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $standRecord = StandRecords::find($id);

        if (!$standRecord) {
            return response()->json(['message' => 'StandRecords not found'], 404);
        }

        return response()->json(['message' => 'StandRecords found', 'data' => $standRecord], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
