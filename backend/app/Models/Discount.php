<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        'property_id',
        'discount_rate',
        'valid_until'
    ];

    protected $casts = [
        'discount_rate' => 'decimal:2',
        'valid_until' => 'date'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
} 