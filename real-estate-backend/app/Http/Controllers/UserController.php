<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function profile(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'zip_code' => ['nullable', 'string', 'max:20'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->update($request->only([
            'name',
            'phone',
            'address',
            'city',
            'state',
            'zip_code',
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Update the authenticated user's password.
     */
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully'
        ]);
    }

    /**
     * Get the authenticated user's favorite properties.
     */
    public function favorites(Request $request)
    {
        $favorites = $request->user()
            ->favorites()
            ->with(['owner', 'reviews'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $favorites
        ]);
    }

    /**
     * Add a property to the authenticated user's favorites.
     */
    public function addFavorite(Request $request, $propertyId)
    {
        $user = $request->user();

        if ($user->hasFavorited($propertyId)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Property is already in favorites'
            ], 422);
        }

        $user->favorites()->attach($propertyId);

        return response()->json([
            'status' => 'success',
            'message' => 'Property added to favorites successfully'
        ]);
    }

    /**
     * Remove a property from the authenticated user's favorites.
     */
    public function removeFavorite(Request $request, $propertyId)
    {
        $user = $request->user();

        if (!$user->hasFavorited($propertyId)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Property is not in favorites'
            ], 422);
        }

        $user->favorites()->detach($propertyId);

        return response()->json([
            'status' => 'success',
            'message' => 'Property removed from favorites successfully'
        ]);
    }

    /**
     * Get the authenticated user's properties.
     */
    public function properties(Request $request)
    {
        $properties = $request->user()
            ->properties()
            ->with(['owner', 'reviews'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $properties
        ]);
    }

    /**
     * Get the authenticated user's reservations.
     */
    public function reservations(Request $request)
    {
        $reservations = $request->user()
            ->reservations()
            ->with(['property', 'property.owner'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reservations
        ]);
    }

    /**
     * Get the authenticated user's reviews.
     */
    public function reviews(Request $request)
    {
        $reviews = $request->user()
            ->reviews()
            ->with(['property', 'property.owner'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }

    /**
     * Get the authenticated user's statistics.
     */
    public function statistics(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_properties' => $user->total_properties,
                'total_reservations' => $user->total_reservations,
                'total_reviews' => $user->total_reviews,
                'total_favorites' => $user->total_favorites,
                'average_rating' => $user->average_rating,
                'active_reservations' => $user->active_reservations,
                'upcoming_reservations' => $user->upcoming_reservations,
                'past_reservations' => $user->past_reservations,
                'pending_reservations' => $user->pending_reservations,
                'cancelled_reservations' => $user->cancelled_reservations,
                'completed_reservations' => $user->completed_reservations,
            ]
        ]);
    }
}
