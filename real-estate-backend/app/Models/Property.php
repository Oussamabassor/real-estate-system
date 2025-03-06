<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Property extends Model
{
    use SoftDeletes;

    protected $connection = 'mongodb';
    protected $collection = 'properties';

    protected $fillable = [
        'title',
        'description',
        'price',
        'address',
        'city',
        'state',
        'zip_code',
        'bedrooms',
        'bathrooms',
        'area',
        'property_type',
        'status',
        'features',
        'images',
        'owner_id',
        'is_featured',
        'rating',
        'reviews_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'area' => 'decimal:2',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'is_featured' => 'boolean',
        'rating' => 'decimal:1',
        'reviews_count' => 'integer',
        'features' => 'array',
        'images' => 'array',
    ];

    /**
     * Get the owner of the property.
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the reservations for the property.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Get the reviews for the property.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the users who have favorited the property.
     */
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }

    /**
     * Scope a query to only include available properties.
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Scope a query to only include featured properties.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include properties in a specific city.
     */
    public function scopeInCity($query, $city)
    {
        return $query->where('city', $city);
    }

    /**
     * Scope a query to only include properties with a minimum rating.
     */
    public function scopeMinRating($query, $rating)
    {
        return $query->where('rating', '>=', $rating);
    }

    /**
     * Scope a query to only include properties within a price range.
     */
    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    /**
     * Scope a query to only include properties with a minimum number of bedrooms.
     */
    public function scopeMinBedrooms($query, $bedrooms)
    {
        return $query->where('bedrooms', '>=', $bedrooms);
    }

    /**
     * Scope a query to only include properties with a minimum number of bathrooms.
     */
    public function scopeMinBathrooms($query, $bathrooms)
    {
        return $query->where('bathrooms', '>=', $bathrooms);
    }

    /**
     * Check if the property is available for the given dates.
     */
    public function isAvailableForDates($checkIn, $checkOut, $excludeReservationId = null)
    {
        $query = $this->reservations()
            ->where(function ($q) use ($checkIn, $checkOut) {
                $q->whereBetween('check_in_date', [$checkIn, $checkOut])
                  ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                  ->orWhere(function ($q) use ($checkIn, $checkOut) {
                      $q->where('check_in_date', '<=', $checkIn)
                        ->where('check_out_date', '>=', $checkOut);
                  });
            })
            ->where('status', '!=', 'cancelled');

        if ($excludeReservationId) {
            $query->where('_id', '!=', $excludeReservationId);
        }

        return !$query->exists();
    }

    /**
     * Calculate the total price for a given date range.
     */
    public function calculateTotalPrice($checkIn, $checkOut)
    {
        $nights = $checkIn->diffInDays($checkOut);
        return $this->price * $nights;
    }

    /**
     * Get the average rating of the property.
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Get the number of reviews for the property.
     */
    public function getReviewsCountAttribute()
    {
        return $this->reviews()->count();
    }

    /**
     * Check if a user has favorited the property.
     */
    public function isFavoritedBy($userId)
    {
        return $this->favoritedBy()->where('user_id', $userId)->exists();
    }

    /**
     * Get the full address of the property.
     */
    public function getFullAddressAttribute()
    {
        return "{$this->address}, {$this->city}, {$this->state} {$this->zip_code}";
    }

    /**
     * Get the price per square foot.
     */
    public function getPricePerSquareFootAttribute()
    {
        return $this->area > 0 ? $this->price / $this->area : 0;
    }

    /**
     * Get the main image of the property.
     */
    public function getMainImageAttribute()
    {
        return $this->images[0] ?? null;
    }

    /**
     * Get the thumbnail images of the property.
     */
    public function getThumbnailsAttribute()
    {
        return array_slice($this->images, 1) ?? [];
    }
} 