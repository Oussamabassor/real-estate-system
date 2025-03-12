<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 100000, 1000000),
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'zip_code' => $this->faker->postcode,
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'area' => $this->faker->numberBetween(500, 5000),
            'property_type' => $this->faker->randomElement(['apartment', 'bungalow']),
            'status' => $this->faker->randomElement(['available', 'reserved', 'sold']),
            'features' => $this->faker->words(5),
            'images' => [$this->faker->imageUrl()],
            'owner_id' => \App\Models\User::factory(),
            'is_featured' => $this->faker->boolean,
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'reviews_count' => $this->faker->numberBetween(0, 100),
        ];
    }
}