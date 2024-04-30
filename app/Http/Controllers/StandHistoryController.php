<?php

namespace App\Http\Controllers;

use App\Models\StandRecord;
use Illuminate\Http\Request;
class StandHistoryController extends Controller
{
    public function index(StandRecord|Request $standRecord)
    {
        $histories = $standRecord->histories()->with('user')->get();
        return inertia('StandHistories/Index', ['standRecord' => $standRecord, 'histories' => $histories]);
    }
}
