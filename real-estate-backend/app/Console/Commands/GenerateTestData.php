<?php

namespace App\Console\Commands;

use App\Models\Property;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Console\Command;

class GenerateTestData extends Command
{
    protected $signature = 'test:data {--users=10} {--properties=20} {--reservations=50} {--reviews=100}';
    protected $description = 'Generate test data for the application';

    public function handle()
    {
        $this->info('Generating test data...');

        // Create users
        $this->info('Creating users...');
        $users = User::factory($this->option('users'))->create();

        // Create properties
        $this->info('Creating properties...');
        $properties = Property::factory($this->option('properties'))->create([
            'owner_id' => function () use ($users) {
                return $users->random()->id;
            },
        ]);

        // Create reservations
        $this->info('Creating reservations...');
        Reservation::factory($this->option('reservations'))->create([
            'property_id' => function () use ($properties) {
                return $properties->random()->id;
            },
            'user_id' => function () use ($users) {
                return $users->random()->id;
            },
            'status' => function () {
                return collect(['pending', 'confirmed', 'completed', 'cancelled'])->random();
            },
        ]);

        // Create reviews
        $this->info('Creating reviews...');
        Review::factory($this->option('reviews'))->create([
            'property_id' => function () use ($properties) {
                return $properties->random()->id;
            },
            'user_id' => function () use ($users) {
                return $users->random()->id;
            },
            'is_verified' => function () {
                return rand(0, 1);
            },
        ]);

        // Update property ratings
        $this->info('Updating property ratings...');
        foreach ($properties as $property) {
            $property->rating = $property->reviews()->avg('rating') ?? 0;
            $property->reviews_count = $property->reviews()->count();
            $property->save();
        }

        // Add properties to favorites
        $this->info('Adding properties to favorites...');
        foreach ($users as $user) {
            $favoriteProperties = $properties->random(rand(1, 5));
            foreach ($favoriteProperties as $property) {
                $user->favorites()->attach($property->id);
            }
        }

        $this->info('Test data generated successfully!');
        $this->info('Users: ' . $users->count());
        $this->info('Properties: ' . $properties->count());
        $this->info('Reservations: ' . Reservation::count());
        $this->info('Reviews: ' . Review::count());

        return 0;
    }
} 