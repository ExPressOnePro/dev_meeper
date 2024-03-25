<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandRecords extends Model
{
    use HasFactory;
    protected $fillable = [
        'stand_id',
        'date',
        'time',
        'user_1',
        'user_2',
        'user_3',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
