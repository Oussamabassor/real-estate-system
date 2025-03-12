<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'city',
        'state',
        'zip_code',
        'avatar',
        'is_admin',
        'is_verified',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
        'is_verified' => 'boolean',
    ];

    /**
     * Get the properties owned by the user.
     */
    public function properties()
    {
        return $this->hasMany(Property::class, 'owner_id');
    }

    /**
     * Get the reservations made by the user.
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Get the reviews written by the user.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the properties favorited by the user.
     */
    public function favorites()
    {
        return $this->belongsToMany(Property::class, 'favorites')
            ->withTimestamps();
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin()
    {
        return $this->is_admin;
    }

    /**
     * Check if the user is verified.
     */
    public function isVerified()
    {
        return $this->is_verified;
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute()
    {
        return $this->name;
    }

    /**
     * Get the user's initials.
     */
    public function getInitialsAttribute()
    {
        $names = explode(' ', $this->name);
        $initials = '';
        foreach ($names as $name) {
            $initials .= strtoupper(substr($name, 0, 1));
        }
        return $initials;
    }

    /**
     * Get the user's avatar URL.
     */
    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }
        return "https://ui-avatars.com/api/?name=" . urlencode($this->name) . "&color=7F9CF5&background=EBF4FF";
    }

    /**
     * Get the user's full address.
     */
    public function getFullAddressAttribute()
    {
        return "{$this->address}, {$this->city}, {$this->state} {$this->zip_code}";
    }

    /**
     * Check if the user has favorited a property.
     */
    public function hasFavorited($propertyId)
    {
        return $this->favorites()->where('property_id', $propertyId)->exists();
    }

    /**
     * Get the user's active reservations.
     */
    public function getActiveReservationsAttribute()
    {
        return $this->reservations()
            ->where('status', 'confirmed')
            ->where('check_in_date', '<=', now())
            ->where('check_out_date', '>=', now())
            ->get();
    }

    /**
     * Get the user's upcoming reservations.
     */
    public function getUpcomingReservationsAttribute()
    {
        return $this->reservations()
            ->where('status', 'confirmed')
            ->where('check_in_date', '>', now())
            ->get();
    }

    /**
     * Get the user's past reservations.
     */
    public function getPastReservationsAttribute()
    {
        return $this->reservations()
            ->where('check_out_date', '<', now())
            ->get();
    }

    /**
     * Get the user's pending reservations.
     */
    public function getPendingReservationsAttribute()
    {
        return $this->reservations()
            ->where('status', 'pending')
            ->get();
    }

    /**
     * Get the user's cancelled reservations.
     */
    public function getCancelledReservationsAttribute()
    {
        return $this->reservations()
            ->where('status', 'cancelled')
            ->get();
    }

    /**
     * Get the user's completed reservations.
     */
    public function getCompletedReservationsAttribute()
    {
        return $this->reservations()
            ->where('status', 'completed')
            ->get();
    }

    /**
     * Get the user's total reservations count.
     */
    public function getTotalReservationsAttribute()
    {
        return $this->reservations()->count();
    }

    /**
     * Get the user's total reviews count.
     */
    public function getTotalReviewsAttribute()
    {
        return $this->reviews()->count();
    }

    /**
     * Get the user's average rating.
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Get the user's total properties count.
     */
    public function getTotalPropertiesAttribute()
    {
        return $this->properties()->count();
    }

    /**
     * Get the user's total favorites count.
     */
    public function getTotalFavoritesAttribute()
    {
        return $this->favorites()->count();
    }

    // Add a mutator to hash the password when setting it
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
