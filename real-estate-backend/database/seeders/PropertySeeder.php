<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run()
    {
        $properties = [
            [
                'title' => 'Luxury Apartment in Downtown',
                'description' => 'Beautiful luxury apartment with amazing city views',
                'price' => 500000,
                'property_type' => 'apartment',
                'bedrooms' => 3,
                'bathrooms' => 2,
                'area' => 150,
                'address' => 'Downtown',
                'city' => 'New York',
                'state' => 'NY',
                'zip_code' => '10001',
                'images' => ['https://placehold.co/800x600/png'],
                'is_featured' => true,
                'status' => 'available',
                'features' => ['parking', 'gym', 'pool'],
                'owner_id' => 1
            ],
            [
                'title' => 'Modern Bungalow with Pool',
                'description' => 'Spacious bungalow with private pool and garden',
                'price' => 750000,
                'property_type' => 'bungalow',
                'bedrooms' => 4,
                'bathrooms' => 3,
                'area' => 200,
                'address' => 'Suburbs',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'zip_code' => '90001',
                'images' => ['https://placehold.co/800x600/png'],
                'is_featured' => true,
                'status' => 'available',
                'features' => ['pool', 'garden', 'security'],
                'owner_id' => 1
            ],
            [
                'title' => 'Cozy Studio Apartment',
                'description' => 'Perfect starter home in a great location',
                'price' => 200000,
                'property_type' => 'apartment',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 45,
                'address' => 'City Center',
                'city' => 'Chicago',
                'state' => 'IL',
                'zip_code' => '60601',
                'images' => ['https://placehold.co/800x600/png'],
                'is_featured' => true,
                'status' => 'available',
                'features' => ['security', 'parking'],
                'owner_id' => 1
            ]
        ];

        foreach ($properties as $property) {
            Property::create($property);
        }
    }
} 