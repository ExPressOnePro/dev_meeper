<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Congregation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class CongregationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResource
    {
        $congregations = Congregation::query()->select('id', 'name')->get();

        return JsonResource::collection($congregations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResource
    {
        $congregation = Congregation::query()->create([
            'name' => $request->post('name'),
        ]);

        return new JsonResource($congregation);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $congregation = Congregation::find($id);

        if (!$congregation) {
            return new JsonResponse(['message' => 'Congregation not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse(['data' => $congregation], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResource
    {
        $congregation = Congregation::query()->findOrFail($id);

        $congregation->update([
            'name' => $request->post('name'),
        ]);

        return new JsonResource($congregation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
