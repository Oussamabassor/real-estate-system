<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Property;
use App\Models\Discount;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);

        // Create sample properties
        $properties = [
            [
                'title' => 'Luxury Apartment',
                'description' => 'Beautiful luxury apartment in the city center',
                'price' => 250000,
                'type' => 'apartment',
                'location' => 'City Center',
                'status' => 'available'
            ],
            [
                'title' => 'Modern Bungalow',
                'description' => 'Spacious modern bungalow with garden',
                'price' => 350000,
                'type' => 'bungalow',
                'location' => 'Suburbs',
                'status' => 'available'
            ]
        ];

        foreach ($properties as $property) {
            Property::create($property);
        }

        // Create sample discount
        Discount::create([
            'property_id' => 1,
            'discount_rate' => 10.00,
            'valid_until' => now()->addDays(30)
        ]);
    }
} 