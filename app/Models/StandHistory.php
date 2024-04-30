<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'stand_record_id',
        'user_id',
        'action',
        'date',
        'before',
        'after',
    ];

    protected $casts = [
        'before' => 'array',
        'after' => 'array',
    ];

    public function standRecord()
    {
        return $this->belongsTo(StandRecord::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
