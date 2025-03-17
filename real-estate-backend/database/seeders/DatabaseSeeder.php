<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Property;
use App\Models\Reservation;
use App\Models\Review;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Create test user
        User::create([
            'name' => 'Test User',
            'email' => 'test@test1.com',
            'password' => Hash::make('Test@123'),
            'role' => 'user',
            'is_verified' => true,
            'phone' => '1234567890'
        ]);

        // Create additional users
        $users = User::factory(5)->create();

        // Create properties
        $properties = Property::factory(10)->create([
            'owner_id' => function () use ($users) {
                return $users->random()->id;
            },
        ]);

        // Create reservations
        foreach ($properties as $property) {
            Reservation::factory(rand(1, 3))->create([
                'property_id' => $property->id,
                'user_id' => function () use ($users) {
                    return $users->random()->id;
                },
                'status' => function () {
                    return collect(['pending', 'confirmed', 'completed', 'cancelled'])->random();
                },
            ]);
        }

        // Create reviews
        foreach ($properties as $property) {
            Review::factory(rand(1, 5))->create([
                'property_id' => $property->id,
                'user_id' => function () use ($users) {
                    return $users->random()->id;
                },
                'is_verified' => function () {
                    return rand(0, 1);
                },
            ]);
        }

        // Update property ratings
        foreach ($properties as $property) {
            $property->rating = $property->reviews()->avg('rating') ?? 0;
            $property->reviews_count = $property->reviews()->count();
            $property->save();
        }

        // Add some properties to favorites
        foreach ($users as $user) {
            $favoriteProperties = $properties->random(rand(1, 3));
            foreach ($favoriteProperties as $property) {
                $user->favorites()->attach($property->id);
            }
        }
    }
}
