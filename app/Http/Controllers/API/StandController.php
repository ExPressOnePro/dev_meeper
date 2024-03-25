<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StandController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
//      $congregationId = $request->get('congregation_id', Auth::user()->congregation_id);

        return new JsonResponse(
            ['data' => Stand::query()->where('congregation_id', 1)->get()]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $fillableFields = [
            'name',
            'location',
            'congregation_id',
            'weeks_schedules',
            'next_weeks',
            'publishers_to_stand',
            'show_next_weeks',
            'day_to_active',
            'time_to_active',
        ];

        $data = $request->only($fillableFields);

        $validator = \Validator::make($data, [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'congregation_id' => 'required|exists:congregations,id',
            'weeks_schedules' => 'required',
            'next_weeks',
            'publishers_to_stand' => 'required|integer',
            'show_next_weeks' => 'required|integer',
            'day_to_active' => 'required|string|max:255',
            'time_to_active' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stand = Stand::create($data);

        return response()->json(['message' => 'Stand created successfully', 'data' => $stand], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $stand = Stand::find($id);
        return new JsonResponse(
            ['data' => $stand]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $stand = Stand::find($id);

        if (!$stand) {
            return response()->json(['message' => 'Stand not found'], 404);
        }

        $fillableFields = [
            'name',
            'location',
            'congregation_id',
            'publishers_to_stand',
            'show_next_weeks',
            'day_to_active',
            'time_to_active',
        ];

        $data = $request->only($fillableFields);

        $validator = \Validator::make($data, [
            'name' => 'string|max:255',
            'location' => 'string|max:255',
            'congregation_id' => [
                Rule::exists('congregations', 'id'),
            ],
            'publishers_to_stand' => 'integer',
            'show_next_weeks' => 'integer',
            'day_to_active' => 'string|max:255',
            'time_to_active' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stand->fill($data);
        $stand->save();

        return response()->json(['message' => 'Stand updated successfully', 'data' => $stand], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateWeekSchedule(Request $request, $id, $weekNumber)
    {
        $stand = Stand::find($id);

        if (!$stand) {
            return response()->json(['message' => 'Stand not found'], 404);
        }

        $data = $request->input('week_'.$weekNumber);
        $weeksSchedules = json_decode($stand->weeks_schedules, true);

        if (isset($weeksSchedules["week_$weekNumber"])) {
            $weeksSchedules["week_$weekNumber"] = $data;
            for ($i = $weekNumber + 1; $i <= 5; $i++) {
                if (isset($weeksSchedules["week_$i"])) {
                    $weeksSchedules["week_$i"] = $data;
                }
            }
        } else {
            return response()->json(['message' => 'Week not found'], 404);
        }

        $stand->weeks_schedules = json_encode($weeksSchedules);
        $stand->save();

        return response()->json(['message' => 'Week schedule updated successfully', 'data' => $stand], 200);
    }
}
