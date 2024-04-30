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
        'publishers_to_stand',
        'show_next_weeks',
        'day_to_active',
        'time_to_active',
        'active',
    ];

    protected $casts = [
        'weeks_schedules' => 'array',
        'day_to_active' => 'array',
        'time_to_active' => 'array',
    ];

    public function congregation()
    {
        return $this->belongsTo(Congregation::class);
    }

    public function records()
    {
        return $this->hasMany(StandRecord::class);
    }
}
