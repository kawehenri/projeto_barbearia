<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'barber_id',
        'day_of_week',
        'start_time',
        'end_time',
        'available',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'available' => 'boolean',
    ];

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }
}

