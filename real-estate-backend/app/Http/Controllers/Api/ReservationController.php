<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $query = Reservation::with(['property', 'user']);

        // Filter by user if not admin
        if (!auth()->user()->isAdmin()) {
            $query->where('user_id', auth()->id());
        }

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('property_id')) {
            $query->where('property_id', $request->property_id);
        }

        // Apply date filters
        if ($request->has('start_date')) {
            $query->where('start_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('end_date', '<=', $request->end_date);
        }

        // Get paginated results
        $reservations = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,_id',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'notes' => 'nullable|string',
            'payment_method' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if property is available for the selected dates
        $property = Property::findOrFail($request->property_id);
        $isAvailable = $property->isAvailable($request->start_date, $request->end_date);

        if (!$isAvailable) {
            return response()->json(['message' => 'Property is not available for the selected dates'], 422);
        }

        // Calculate total price
        $days = $request->start_date->diffInDays($request->end_date);
        $totalPrice = $property->price * $days;

        $reservation = Reservation::create([
            'property_id' => $request->property_id,
            'user_id' => auth()->id(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $totalPrice,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $request->payment_method,
            'notes' => $request->notes
        ]);

        return response()->json($reservation, 201);
    }

    public function show($id)
    {
        $reservation = Reservation::with(['property', 'user'])->findOrFail($id);

        // Check if user is authorized to view this reservation
        if ($reservation->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($reservation);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        // Check if user is authorized to update this reservation
        if ($reservation->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'string|in:pending,confirmed,cancelled,completed',
            'payment_status' => 'string|in:pending,paid,refunded',
            'notes' => 'nullable|string',
            'cancellation_reason' => 'required_if:status,cancelled|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $reservation->update($request->all());
        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        // Check if user is authorized to delete this reservation
        if ($reservation->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $reservation->delete();
        return response()->json(null, 204);
    }
} 