<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => fake()->optional(0.8)->dateTime(), // 80% chance of being verified
            'password' => bcrypt('password'),
            'phone' => fake()->optional(0.7)->phoneNumber(),
            'address' => fake()->optional(0.7)->streetAddress(),
            'city' => fake()->optional(0.7)->city(),
            'state' => fake()->optional(0.7)->state(),
            'zip_code' => fake()->optional(0.7)->postcode(),
            'avatar' => fake()->optional(0.3)->imageUrl(200, 200, 'people'),
            'is_admin' => false,
            'is_verified' => fake()->boolean(80), // 80% chance of being verified
        ];
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_admin' => true,
            'is_verified' => true,
            'email_verified_at' => now(),
        ]);
    }

    /**
     * Indicate that the user is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'email_verified_at' => now(),
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
