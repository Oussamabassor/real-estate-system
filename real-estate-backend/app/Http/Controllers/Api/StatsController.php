<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function index(): JsonResponse
    {
        $stats = [
            'total_properties' => Property::count(),
            'available_properties' => Property::where('status', 'available')->count(),
            'featured_properties' => Property::where('is_featured', true)->count(),
            'property_types' => Property::select('property_type')
                ->groupBy('property_type')
                ->get()
                ->mapWithKeys(function ($property) {
                    return [
                        $property->property_type => Property::where('property_type', $property->property_type)->count()
                    ];
                }),
        ];

        return response()->json($stats);
    }
} 