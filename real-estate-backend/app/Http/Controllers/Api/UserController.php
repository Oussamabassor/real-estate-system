<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'string|max:20',
            'avatar' => 'nullable|string',
            'bio' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->update($request->all());
        return response()->json($user);
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }

    public function favorites(Request $request)
    {
        $user = $request->user();
        return response()->json($user->favorites()->with('owner')->get());
    }

    public function addFavorite(Request $request, $propertyId)
    {
        $user = $request->user();

        if (!$user->favorites()->where('property_id', $propertyId)->exists()) {
            $user->favorites()->attach($propertyId);
            return response()->json([
                'message' => 'Property added to favorites'
            ]);
        }

        return response()->json([
            'message' => 'Property is already in favorites'
        ], 422);
    }

    public function removeFavorite(Request $request, $propertyId)
    {
        $user = $request->user();

        if ($user->favorites()->where('property_id', $propertyId)->exists()) {
            $user->favorites()->detach($propertyId);
            return response()->json([
                'message' => 'Property removed from favorites'
            ]);
        }

        return response()->json([
            'message' => 'Property is not in favorites'
        ], 422);
    }
}