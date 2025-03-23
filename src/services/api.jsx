import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const BASE_URL = "http://localhost:8000";

console.log("Using BASE_URL:", BASE_URL);
console.log("Using API_URL:", API_URL);

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

// Create axios instance for API calls
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

// User endpoints
export const userApi = {
  login: async ({ email, password, remember }) => {
    try {
      // Get CSRF cookie first using the base URL
      console.log("Fetching CSRF cookie...");
      await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      
      console.log("Making login request...");
      // Make login request using the API URL
      const response = await api.post("/login", {
        email,
        password,
        remember: remember || false
      });

      console.log("Login response:", response.data);

      // Check if login was successful
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
    console.log("Fetching CSRF cookie...");
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);

    console.log("Making registration request...");
    const response = await api.post("/register", data);

    const token =
      response.data?.data?.token || response.data?.token || response.data?.access_token;

    if (token) {
      console.log("Token received, storing in localStorage...");
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token received in registration response");
    }

    return response;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
},
  getProfile: () => api.get("/profile"),
  updateProfile: (data) => api.put("/profile", data),
};

// Property endpoints
export const propertyApi = {
  getAll: (page = 1) => api.get(`/properties?page=${page}`),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post("/properties", data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
  toggleFavorite: (id) => api.post(`/favorites/${id}`),
  contactOwner: (data) => api.post("/properties/contact", data),
};

// Reservation endpoints
export const reservationApi = {
  getAll: () => api.get("/reservations"),
  getById: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post("/reservations", data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.post(`/reservations/${id}/cancel`),
};

// Payment endpoints
export const paymentApi = {
  createReceipt: (data) => api.post("/payments/receipts", data),
  getReceipt: (id) => api.get(`/payments/receipts/${id}`),
  updateStatus: (id, status) =>
    api.put(`/payments/receipts/${id}/status`, { status }),
};

export default api;
