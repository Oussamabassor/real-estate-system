# Real Estate System Backend

A Laravel-based backend API for the Real Estate System, using MongoDB Atlas as the database.

## Requirements

- PHP >= 8.0
- Composer
- MongoDB Atlas account
- Laravel 9.x

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure MongoDB Atlas:
- Create a new cluster in MongoDB Atlas
- Get your connection string
- Update the `.env` file with your MongoDB credentials:
```
DB_CONNECTION=mongodb
MONGO_DB_HOST=your-cluster.mongodb.net
MONGO_DB_PORT=27017
MONGO_DB_DATABASE=real_estate
MONGO_DB_USERNAME=your-username
MONGO_DB_PASSWORD=your-password
MONGO_DB_AUTH_SOURCE=admin
MONGO_DB_SSL=true
```

6. Start the development server:
```bash
php artisan serve
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/user` - Get authenticated user

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/{id}` - Get property details
- `POST /api/properties` - Create new property
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property
- `GET /api/properties/featured` - Get featured properties

### Reservations
- `GET /api/reservations` - List all reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations/{id}` - Get reservation details
- `PUT /api/reservations/{id}` - Update reservation
- `DELETE /api/reservations/{id}` - Delete reservation

### User Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/password` - Update password
- `GET /api/favorites` - Get user's favorite properties
- `POST /api/favorites` - Add property to favorites
- `DELETE /api/favorites` - Remove property from favorites

## Authentication

The API uses Laravel Sanctum for authentication. All protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
    "message": "Error message",
    "errors": {
        "field": ["Error details"]
    }
}
```

## Rate Limiting

API requests are limited to 60 requests per minute per user.

## CORS

The API supports CORS and is configured to accept requests from any origin. You can modify the CORS settings in the `Cors` middleware.

## Development

To run tests:
```bash
php artisan test
```

To generate API documentation:
```bash
php artisan l5-swagger:generate
```

## Deployment

1. Set up your production environment
2. Update the `.env` file with production settings
3. Run migrations:
```bash
php artisan migrate
```
4. Configure your web server (Apache/Nginx)
5. Set up SSL certificates
6. Configure MongoDB Atlas network access

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
