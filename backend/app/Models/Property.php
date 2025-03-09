<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'type',
        'bedrooms',
        'bathrooms',
        'area',
        'images',
        'floor',
        'location',
        'is_featured'
    ];

    protected $casts = [
        'price' => 'float',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'area' => 'float',
        'floor' => 'integer',
        'is_featured' => 'boolean',
        'images' => 'array'
    ];
} 