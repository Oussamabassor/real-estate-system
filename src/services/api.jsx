import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const BASE_URL = 'http://localhost:8000';  // Always use localhost:8000 for consistency

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'  // Required for Laravel to recognize the request as AJAX
    },
    withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

// Get CSRF token
const getCsrfToken = async () => {
    try {
        console.log('Fetching CSRF token...');

        // Use the base Axios instance for CSRF request
        const response = await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        // Wait for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 100));

        const cookies = document.cookie.split('; ');
        const xsrfToken = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='))?.split('=')[1];

        if (!xsrfToken) {
            throw new Error('CSRF token not found in cookies');
        }

        return decodeURIComponent(xsrfToken);
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        throw error;
    }
};

// Property endpoints
export const propertyApi = {
    getAll: (page = 1) => api.get(`/properties?page=${page}`),
    getById: (id) => api.get(`/properties/${id}`),
    create: (data) => api.post('/properties', data),
    update: (id, data) => api.put(`/properties/${id}`, data),
    delete: (id) => api.delete(`/properties/${id}`),
    toggleFavorite: (id) => api.post(`/favorites/${id}`),
    contactOwner: (data) => api.post('/properties/contact', data),
};

// Reservation endpoints
export const reservationApi = {
    getAll: () => api.get('/reservations'),
    getById: (id) => api.get(`/reservations/${id}`),
    create: (data) => api.post('/reservations', data),
    update: (id, data) => api.put(`/reservations/${id}`, data),
    cancel: (id) => api.post(`/reservations/${id}/cancel`),
};

// User endpoints
export const userApi = {
    login: async (loginData) => {
        try {
            // Get CSRF token first
            const csrfToken = await getCsrfToken();

            // Create login request config
            const config = {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            };

            // Make login request
            const response = await axios.post(`${API_URL}/login`, {
                email: loginData.email,
                password: loginData.password,
                remember: loginData.remember || false
            }, config);

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }

            return response;
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    },
    register: async (data) => {
        try {
            await getCsrfToken();
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            if (!csrfToken) {
                console.error('CSRF token not found in cookies');
                throw new Error('CSRF token not found');
            }

            console.log('Registration data:', data);
            console.log('Request URL:', `${API_URL}/auth/register`);

            const response = await api.post('/auth/register', data, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Registration response:', response.data);

            // Check if we have a token in the expected location
            const token = response.data?.data?.token || response.data?.token || response.data?.access_token;
            if (token) {
                console.log('Storing token from registration');
                localStorage.setItem('token', token);
                // Immediately set the token in the axios instance
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                console.warn('No token received in registration response');
            }

            return response;
        } catch (error) {
            console.error('Registration failed:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                error: error.response?.data?.error,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
                request: {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: JSON.parse(error.config?.data || '{}')
                }
            });
            throw error;
        }
    },
    getProfile: () => api.get('/profile'),
    updateProfile: (data) => api.put('/profile', data),
};

// Payment endpoints
export const paymentApi = {
    createReceipt: (data) => api.post('/payments/receipts', data),
    getReceipt: (id) => api.get(`/payments/receipts/${id}`),
    updateStatus: (id, status) => api.put(`/payments/receipts/${id}/status`, { status }),
};

export default api; 