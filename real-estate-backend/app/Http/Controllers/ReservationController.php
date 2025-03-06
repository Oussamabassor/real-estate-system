<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with(['property', 'user'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reservations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,_id',
            'check_in_date' => 'required|date|after:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'guests' => 'required|integer|min:1',
            'special_requests' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if property is available for the selected dates
        $property = Property::findOrFail($request->property_id);
        $isAvailable = $property->isAvailableForDates(
            $request->check_in_date,
            $request->check_out_date
        );

        if (!$isAvailable) {
            return response()->json([
                'status' => 'error',
                'message' => 'Property is not available for the selected dates'
            ], 422);
        }

        $reservation = Reservation::create([
            'property_id' => $request->property_id,
            'user_id' => Auth::id(),
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'guests' => $request->guests,
            'special_requests' => $request->special_requests,
            'status' => 'pending',
            'total_price' => $property->calculateTotalPrice(
                $request->check_in_date,
                $request->check_out_date
            ),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation created successfully',
            'data' => $reservation->load(['property', 'user'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with(['property', 'user'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $reservation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservation = Reservation::where('user_id', Auth::id())
            ->findOrFail($id);

        // Only allow updates if reservation is pending
        if ($reservation->status !== 'pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot update a non-pending reservation'
            ], 422);
        }

        $validator = Validator::make($request->all(), [
            'check_in_date' => 'nullable|date|after:today',
            'check_out_date' => 'nullable|date|after:check_in_date',
            'guests' => 'nullable|integer|min:1',
            'special_requests' => 'nullable|string|max:500',
            'status' => 'nullable|in:cancelled,confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // If dates are being updated, check availability
        if ($request->has('check_in_date') || $request->has('check_out_date')) {
            $checkIn = $request->check_in_date ?? $reservation->check_in_date;
            $checkOut = $request->check_out_date ?? $reservation->check_out_date;

            $isAvailable = $reservation->property->isAvailableForDates(
                $checkIn,
                $checkOut,
                $reservation->_id // Exclude current reservation when checking availability
            );

            if (!$isAvailable) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Property is not available for the selected dates'
                ], 422);
            }
        }

        $reservation->update($request->all());

        // Recalculate total price if dates changed
        if ($request->has('check_in_date') || $request->has('check_out_date')) {
            $reservation->total_price = $reservation->property->calculateTotalPrice(
                $reservation->check_in_date,
                $reservation->check_out_date
            );
            $reservation->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation updated successfully',
            'data' => $reservation->load(['property', 'user'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::where('user_id', Auth::id())
            ->findOrFail($id);

        // Only allow deletion if reservation is pending
        if ($reservation->status !== 'pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot delete a non-pending reservation'
            ], 422);
        }

        $reservation->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation deleted successfully'
        ]);
    }
} 