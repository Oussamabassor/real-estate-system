<?php

namespace Database\Factories;

use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        $checkIn = fake()->dateTimeBetween('now', '+6 months');
        $checkOut = fake()->dateTimeBetween($checkIn, '+30 days');

        return [
            'property_id' => fake()->numberBetween(1, 20),
            'user_id' => fake()->numberBetween(1, 10),
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'guests' => fake()->numberBetween(1, 10),
            'special_requests' => fake()->optional(0.7)->sentence(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
            'total_price' => fake()->numberBetween(1000, 10000),
        ];
    }
} 