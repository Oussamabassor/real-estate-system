<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'reservation_id',
        'amount',
        'method'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }
} 