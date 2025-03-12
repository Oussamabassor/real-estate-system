<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use SoftDeletes;

    // Remove the MongoDB connection
    // protected $connection = 'mongodb';
    protected $collection = 'reservations';

    protected $fillable = [
        'property_id',
        'user_id',
        'check_in_date',
        'check_out_date',
        'guests',
        'special_requests',
        'status',
        'total_price',
    ];

    protected $casts = [
        'check_in_date' => 'datetime',
        'check_out_date' => 'datetime',
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the property that owns the reservation.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the user that owns the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include pending reservations.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include confirmed reservations.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope a query to only include cancelled reservations.
     */
    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    /**
     * Scope a query to only include reservations for a specific property.
     */
    public function scopeForProperty($query, $propertyId)
    {
        return $query->where('property_id', $propertyId);
    }

    /**
     * Scope a query to only include reservations for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include reservations within a date range.
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->where(function ($q) use ($startDate, $endDate) {
            $q->whereBetween('check_in_date', [$startDate, $endDate])
              ->orWhereBetween('check_out_date', [$startDate, $endDate])
              ->orWhere(function ($q) use ($startDate, $endDate) {
                  $q->where('check_in_date', '<=', $startDate)
                    ->where('check_out_date', '>=', $endDate);
              });
        });
    }

    /**
     * Check if the reservation is active.
     */
    public function isActive()
    {
        return $this->status === 'confirmed' && 
               $this->check_in_date <= now() && 
               $this->check_out_date >= now();
    }

    /**
     * Check if the reservation is upcoming.
     */
    public function isUpcoming()
    {
        return $this->status === 'confirmed' && 
               $this->check_in_date > now();
    }

    /**
     * Check if the reservation is past.
     */
    public function isPast()
    {
        return $this->check_out_date < now();
    }

    /**
     * Check if the reservation can be cancelled.
     */
    public function canBeCancelled()
    {
        return $this->status === 'pending' || 
               ($this->status === 'confirmed' && 
                $this->check_in_date > now()->addDays(24));
    }

    /**
     * Get the number of nights for the reservation.
     */
    public function getNightsAttribute()
    {
        return $this->check_in_date->diffInDays($this->check_out_date);
    }

    /**
     * Get the daily rate for the reservation.
     */
    public function getDailyRateAttribute()
    {
        return $this->total_price / $this->nights;
    }
} 