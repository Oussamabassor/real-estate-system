import api from './config';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// User endpoints
export const userApi = {
  login: async ({ email, password, remember }) => {
    try {
      await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true
      });
      
      const response = await api.post("/login", {
        email,
        password,
        remember: remember || false
      });

      if (response.data?.status === 'success' && response.data?.data?.token) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return {
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  },
  register: async (data) => {
    try {
      await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
      const response = await api.post("/register", data);

      const token = response.data?.data?.token || response.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  },
  getProfile: () => api.get("/profile"),
  updateProfile: (data) => api.put("/profile", data),
  logout: () => api.post("/logout"),
};

// Property endpoints
export const propertyApi = {
  getAll: (params) => api.get("/properties", { params }),
  getById: (id) => api.get(`/properties/${id}`),
  getFeatured: () => api.get("/properties/featured"),
  search: (query) => api.get("/properties/search", { params: { query } }),
  create: (data) => api.post("/properties", data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
  toggleFavorite: (id) => api.post(`/properties/${id}/favorite`),
  getFavorites: () => api.get("/favorites"),
  getAvailability: (id, startDate, endDate) => 
    api.get(`/properties/${id}/availability`, {
      params: { start_date: startDate, end_date: endDate }
    }),
};

// Reservation endpoints
export const reservationApi = {
  getAll: () => api.get("/reservations"),
  getById: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post("/reservations", data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.post(`/reservations/${id}/cancel`),
  getUpcoming: () => api.get("/reservations/upcoming"),
  getPast: () => api.get("/reservations/past"),
};

// Admin endpoints
export const adminApi = {
  getDashboardStats: () => api.get("/admin/dashboard-stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getReservations: (params) => api.get("/admin/reservations", { params }),
  updateReservation: (id, data) => api.put(`/admin/reservations/${id}`, data),
};

export default api;
