<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Review::with(['property', 'user']);

        // Filter by property
        if ($request->has('property_id')) {
            $query->where('property_id', $request->property_id);
        }

        // Filter by user
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by rating
        if ($request->has('min_rating')) {
            $query->where('rating', '>=', $request->min_rating);
        }
        if ($request->has('max_rating')) {
            $query->where('rating', '<=', $request->max_rating);
        }

        // Filter by verification status
        if ($request->has('verified')) {
            $query->where('is_verified', $request->verified);
        }

        // Sort by date
        $query->orderBy('created_at', 'desc');

        $reviews = $query->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,_id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if user has already reviewed this property
        $existingReview = Review::where('property_id', $request->property_id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already reviewed this property'
            ], 422);
        }

        // Check if user has stayed at this property
        $hasStayed = Property::find($request->property_id)
            ->reservations()
            ->where('user_id', Auth::id())
            ->where('status', 'completed')
            ->exists();

        if (!$hasStayed) {
            return response()->json([
                'status' => 'error',
                'message' => 'You can only review properties you have stayed at'
            ], 422);
        }

        $review = Review::create([
            'property_id' => $request->property_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_verified' => false,
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $images[] = $path;
            }
            $review->images = $images;
            $review->save();
        }

        // Update property rating
        $property = Property::find($request->property_id);
        $property->rating = $property->reviews()->avg('rating');
        $property->reviews_count = $property->reviews()->count();
        $property->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Review created successfully',
            'data' => $review->load(['property', 'user'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = Review::with(['property', 'user'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $review
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $review = Review::where('user_id', Auth::id())
            ->findOrFail($id);

        // Check if review can be edited
        if (!$review->canBeEdited()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Reviews can only be edited within 24 hours of creation'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'nullable|numeric|min:1|max:5',
            'comment' => 'nullable|string|min:10|max:1000',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $review->update($request->only(['rating', 'comment']));

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $images[] = $path;
            }
            $review->images = $images;
            $review->save();
        }

        // Update property rating
        $property = $review->property;
        $property->rating = $property->reviews()->avg('rating');
        $property->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Review updated successfully',
            'data' => $review->load(['property', 'user'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $review = Review::where('user_id', Auth::id())
            ->findOrFail($id);

        // Check if review can be deleted
        if (!$review->canBeDeleted()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Reviews can only be deleted within 24 hours of creation'
            ], 422);
        }

        $property = $review->property;
        $review->delete();

        // Update property rating
        $property->rating = $property->reviews()->avg('rating');
        $property->reviews_count = $property->reviews()->count();
        $property->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Verify a review.
     */
    public function verify(string $id)
    {
        $review = Review::findOrFail($id);
        $review->is_verified = true;
        $review->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Review verified successfully',
            'data' => $review->load(['property', 'user'])
        ]);
    }
} 