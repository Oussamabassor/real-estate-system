<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = \App\Models\Review::class;

    public function definition()
    {
        return [
            'property_id' => Property::factory(),
            'user_id' => User::factory(),
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'comment' => $this->faker->paragraph(),
            'is_verified' => $this->faker->boolean(80),
        ];
    }

    public function verified()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => true,
            ];
        });
    }

    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_verified' => false,
            ];
        });
    }
}