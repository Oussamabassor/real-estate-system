import { useState, useEffect } from "react";
import { userApi } from "../services/api";
import toast from 'react-hot-toast';

export function useAuth() {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userApi
        .getProfile()
        .then(({ data }) => {
          setState({ user: data, loading: false, error: null });
        })
        .catch(() => {
          logout(); // Ensure token is removed if invalid
        });
    } else {
      setState({ user: null, loading: false, error: null });
    }
  }, []);

  const login = async (loginData) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { data, message, token } = await userApi.login(loginData);

      localStorage.setItem("token", token);
      
      setState({ 
        user: { 
          ...data.user,
          role: data.user.is_admin ? 'admin' : 'user' // Convert is_admin to role
        }, 
        loading: false, 
        error: null 
      });

      toast.success('Successfully logged in!');
      return { data, message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Authentication failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const register = async (registrationData) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { data, message, token } = await userApi.register(registrationData);

      localStorage.setItem("token", token);

      setState({ 
        user: { 
          ...data.user,
          role: 'user' // New users are always regular users
        }, 
        loading: false, 
        error: null 
      });

      toast.success('Account created successfully!');
      return { data, message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, loading: false, error: null });
    toast.success('Logged out successfully');
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAdmin: state.user?.role === 'admin',
    login,
    register,
    logout,
  };
}
