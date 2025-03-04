import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Property endpoints
export const propertyApi = {
    getAll: () => api.get('/properties'),
    getById: (id) => api.get(`/properties/${id}`),
    create: (data) => api.post('/properties', data),
    update: (id, data) => api.put(`/properties/${id}`, data),
    delete: (id) => api.delete(`/properties/${id}`),
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
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.put('/auth/profile', data),
};

// Payment endpoints
export const paymentApi = {
    createReceipt: (data) => api.post('/payments/receipts', data),
    getReceipt: (id) => api.get(`/payments/receipts/${id}`),
    updateStatus: (id, status) => api.put(`/payments/receipts/${id}/status`, { status }),
};

export default api; 