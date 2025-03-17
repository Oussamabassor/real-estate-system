import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * API Configuration
 */
const apiConfig = {
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 15000, // 15 seconds
};

/**
 * Create API instance
 */
const api = axios.create(apiConfig);

/**
 * Request interceptor
 */
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add language header if available
        const lang = localStorage.getItem('language') || 'en';
        config.headers['Accept-Language'] = lang;
        
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle different error scenarios
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access forbidden:', data.message);
                    break;
                case 404:
                    // Not found
                    console.error('Resource not found:', data.message);
                    break;
                case 422:
                    // Validation error
                    console.error('Validation error:', data.errors);
                    break;
                case 500:
                    // Server error
                    console.error('Server error:', data.message);
                    break;
                default:
                    console.error('API error:', data.message);
            }
            
            return Promise.reject(new Error(data.message || 'An error occurred'));
        }
        
        if (error.request) {
            // Request made but no response received
            console.error('Network error:', error.message);
            return Promise.reject(new Error('Network error. Please check your connection.'));
        }
        
        // Error in request configuration
        console.error('Request error:', error.message);
        return Promise.reject(new Error('Request configuration error.'));
    }
);

export default api;