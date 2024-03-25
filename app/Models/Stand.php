<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stand extends Model
{
    use HasFactory;

    protected $fillable = [
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
}
