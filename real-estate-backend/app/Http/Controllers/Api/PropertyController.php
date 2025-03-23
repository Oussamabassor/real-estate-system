<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Property::query();

            // Apply filters
            if ($request->has('type')) {
                $query->where('property_type', $request->type);
            }

            if ($request->has('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }

            if ($request->has('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            if ($request->has('bedrooms')) {
                $query->where('bedrooms', '>=', $request->bedrooms);
            }

            if ($request->has('bathrooms')) {
                $query->where('bathrooms', '>=', $request->bathrooms);
            }

            if ($request->has('location')) {
                $query->where(function($q) use ($request) {
                    $q->where('city', 'like', '%' . $request->location . '%')
                      ->orWhere('address', 'like', '%' . $request->location . '%');
                });
            }

            // Apply sorting
            $sortField = $request->get('sort_by', 'created_at');
            $sortDirection = $request->get('sort_direction', 'desc');
            $query->orderBy($sortField, $sortDirection);

            // Get paginated results
            $properties = $query->with('owner')->paginate($request->get('per_page', 24));

            return response()->json($properties);
        } catch (\Exception $e) {
            \Log::error('Error fetching properties: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while fetching properties'], 500);
        }
    }

    public function show($id)
    {
        $property = Property::with('owner')->findOrFail($id);
        $property->increment('views');
        return response()->json($property);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'area' => 'required|numeric|min:0',
            'property_type' => 'required|string',
            'status' => 'required|string|in:available,rented,sold',
            'images' => 'required|array',
            'features' => 'required|array',
            'is_featured' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property = Property::create([
            ...$request->all(),
            'owner_id' => auth()->id(),
            'views' => 0,
            'rating' => 0,
            'reviews_count' => 0
        ]);

        return response()->json($property, 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        // Check if user is authorized to update this property
        if ($property->owner_id !== auth()->id() && !auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'location' => 'string',
            'bedrooms' => 'integer|min:0',
            'bathrooms' => 'integer|min:0',
            'area' => 'numeric|min:0',
            'property_type' => 'string',
            'status' => 'string|in:available,rented,sold',
            'images' => 'array',
            'features' => 'array',
            'is_featured' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $property->update($request->all());
        return response()->json($property);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);

        // Check if user is authorized to delete this property
        if ($property->owner_id !== auth()->id() && !auth()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $property->delete();
        return response()->json(null, 204);
    }

    public function featured()
    {
        $properties = Property::where('is_featured', true)
            ->where('status', 'available')
            ->with('owner')
            ->take(6)
            ->get();
        return response()->json($properties);
    }
}