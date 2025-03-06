<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->numberBetween(100000, 1000000),
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'zip_code' => fake()->postcode(),
            'bedrooms' => fake()->numberBetween(1, 5),
            'bathrooms' => fake()->numberBetween(1, 3),
            'area' => fake()->numberBetween(500, 5000),
            'property_type' => fake()->randomElement(['house', 'apartment', 'condo', 'villa', 'townhouse']),
            'status' => fake()->randomElement(['available', 'rented', 'sold']),
            'features' => fake()->randomElements([
                'parking',
                'pool',
                'gym',
                'security',
                'elevator',
                'furnished',
                'pet_friendly',
                'wheelchair_accessible',
                'fireplace',
                'garden',
                'balcony',
                'garage',
                'air_conditioning',
                'heating',
                'internet',
                'cable_tv',
                'dishwasher',
                'washer',
                'dryer',
                'microwave',
            ], fake()->numberBetween(5, 15)),
            'images' => [
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
                'https://picsum.photos/800/600?random=' . fake()->numberBetween(1, 1000),
            ],
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
            'rating' => fake()->randomFloat(1, 1, 5),
            'reviews_count' => fake()->numberBetween(0, 50),
        ];
    }
} 