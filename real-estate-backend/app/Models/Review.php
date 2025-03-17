<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Review extends Model
{
    use HasFactory;
    use SoftDeletes;

    // Remove the MongoDB connection
    // protected $connection = 'mongodb';
    protected $collection = 'reviews';

    protected $fillable = [
        'property_id',
        'user_id',
        'rating',
        'comment',
        'images',
        'is_verified',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'is_verified' => 'boolean',
        'images' => 'array',
    ];

    /**
     * Get the property that owns the review.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the user that owns the review.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include verified reviews.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Scope a query to only include reviews for a specific property.
     */
    public function scopeForProperty($query, $propertyId)
    {
        return $query->where('property_id', $propertyId);
    }

    /**
     * Scope a query to only include reviews from a specific user.
     */
    public function scopeFromUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include reviews with a minimum rating.
     */
    public function scopeMinRating($query, $rating)
    {
        return $query->where('rating', '>=', $rating);
    }

    /**
     * Scope a query to only include reviews with a maximum rating.
     */
    public function scopeMaxRating($query, $rating)
    {
        return $query->where('rating', '<=', $rating);
    }

    /**
     * Get the review's rating in stars.
     */
    public function getStarsAttribute()
    {
        return str_repeat('★', floor($this->rating)) .
               str_repeat('☆', 5 - floor($this->rating));
    }

    /**
     * Get the review's rating percentage.
     */
    public function getRatingPercentageAttribute()
    {
        return ($this->rating / 5) * 100;
    }

    /**
     * Check if the review has images.
     */
    public function hasImages()
    {
        return !empty($this->images);
    }

    /**
     * Get the review's first image.
     */
    public function getFirstImageAttribute()
    {
        return $this->images[0] ?? null;
    }

    /**
     * Get the review's remaining images.
     */
    public function getRemainingImagesAttribute()
    {
        return array_slice($this->images, 1) ?? [];
    }

    /**
     * Get the review's formatted date.
     */
    public function getFormattedDateAttribute()
    {
        return $this->created_at->format('F j, Y');
    }

    /**
     * Get the review's time ago.
     */
    public function getTimeAgoAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    /**
     * Check if the review can be edited.
     */
    public function canBeEdited()
    {
        return $this->created_at->diffInHours(now()) <= 24;
    }

    /**
     * Check if the review can be deleted.
     */
    public function canBeDeleted()
    {
        return $this->created_at->diffInHours(now()) <= 24;
    }

    /**
     * Get the review's sentiment.
     */
    public function getSentimentAttribute()
    {
        if ($this->rating >= 4) {
            return 'positive';
        } elseif ($this->rating >= 3) {
            return 'neutral';
        } else {
            return 'negative';
        }
    }
}
