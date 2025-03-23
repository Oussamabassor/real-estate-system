import { useState, useEffect } from "react";
import { userApi } from "../services/api";

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

      localStorage.setItem("token", token); // Store token

      setState({ user: data.user, loading: false, error: null });

      return { data, message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      return { error: errorMessage };
    }
  };

  const register = async (registrationData) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { data, message, token } = await userApi.register(registrationData);

      localStorage.setItem("token", token); // Store token

      setState({ user: data.user, loading: false, error: null });

      return { data, message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      return { error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, loading: false, error: null });
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
  };
}
