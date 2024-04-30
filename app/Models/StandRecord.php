<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandRecord extends Model
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

    public function stand()
    {
        return $this->belongsTo(Stand::class);
    }

    public function user1()
    {
        return $this->belongsTo(User::class, 'user_1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'user_2');
    }

    public function user3()
    {
        return $this->belongsTo(User::class, 'user_3');
    }

    public function histories()
    {
        return $this->hasMany(StandHistory::class);
    }
}
