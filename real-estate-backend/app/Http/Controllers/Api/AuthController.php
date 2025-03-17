<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20',
            'role' => 'required|string|in:user,agent,admin'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role,
            'is_active' => true
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Log the attempt details (excluding password)
        \Log::info('Login attempt', [
            'email' => $request->email,
            'remember' => $request->boolean('remember'),
            'headers' => $request->headers->all()
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            // Log failed attempt
            \Log::warning('Login failed - invalid credentials', [
                'email' => $request->email
            ]);

            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        // Log successful authentication
        \Log::info('User authenticated successfully', [
            'user_id' => $user->id,
            'email' => $user->email
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Update last login
        $user->update(['last_login' => now()]);

        // Ensure session is started and regenerated
        if (!$request->session()->isStarted()) {
            $request->session()->start();
        }
        $request->session()->regenerate();

        // Log session details
        \Log::info('Session details', [
            'session_id' => session()->getId(),
            'session_started' => session()->isStarted(),
            'session_token' => csrf_token()
        ]);

        $response = response()->json([
            'status' => 'success',
            'message' => 'User logged in successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
                'session_id' => session()->getId()
            ]
        ]);

        // Log response cookies
        \Log::info('Response cookies', [
            'cookies' => collect($response->headers->getCookies())->map(function($cookie) {
                return [
                    'name' => $cookie->getName(),
                    'value' => 'hidden',
                    'domain' => $cookie->getDomain(),
                    'path' => $cookie->getPath(),
                    'secure' => $cookie->isSecure(),
                    'httpOnly' => $cookie->isHttpOnly(),
                    'sameSite' => $cookie->getSameSite()
                ];
            })->toArray()
        ]);

        return $response;
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
} 