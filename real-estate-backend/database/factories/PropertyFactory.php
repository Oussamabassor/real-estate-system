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
            'price' => $this->faker->randomFloat(2, 1000000, 10000000),
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->randomElement([
                    "Tahanaout",
                    "Aït Ourir",
                    "Amizmiz",
                    "Asni",
                    "Moulay Brahim",
                    "Oukaïmeden",
                    "Sidi Fadel",
                    "Aghouatim",
                    "Imlil",
                    "Ourika",
                    "Setti Fatma"
                    ]),
            'state' => 'Haouz',
            'zip_code' => $this->faker->postcode,
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'area' => $this->faker->numberBetween(50, 500),
            'property_type' => $this->faker->randomElement(['apartment', 'bungalow']),
            'status' => $this->faker->randomElement(['available', 'reserved', 'sold']),
            'images' => [$this->faker->imageUrl()],
            'owner_id' => \App\Models\User::factory(),
            'is_featured' => $this->faker->boolean,
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'reviews_count' => $this->faker->numberBetween(0, 100),
        ];
    }
}
