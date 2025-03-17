import { useState, useEffect } from 'react';
import { userApi } from '../services/api';
import PropTypes from 'prop-types';

export function useAuth() {
    const [state, setState] = useState({
        user: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            userApi.getProfile()
                .then(({ data }) => {
                    setState({ user: data, loading: false, error: null });
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setState({ user: null, loading: false, error: null });
                });
        } else {
            setState({ user: null, loading: false, error: null });
        }
    }, []);

    const login = async (loginData) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const { data } = await userApi.login(loginData);

            if (data.token) {
                localStorage.setItem('token', data.token);
                setState({ user: data.user, loading: false, error: null });
            } else if (data.data?.token) {
                localStorage.setItem('token', data.data.token);
                setState({ user: data.data.user, loading: false, error: null });
            } else {
                throw new Error('No token received');
            }

            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const { data } = await userApi.register(userData);
            localStorage.setItem('token', data.token);
            setState({ user: data.user, loading: false, error: null });
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.errors
                ? Object.values(error.response.data.errors).flat().join('\n')
                : error.response?.data?.message || 'Registration failed';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setState({ user: null, loading: false, error: null });
    };

    const updateProfile = async (userData) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const { data } = await userApi.updateProfile(userData);
            setState({ user: data, loading: false, error: null });
            return data;
        } catch (error) {
            setState(prev => ({ ...prev, loading: false, error: 'Profile update failed' }));
            throw error;
        }
    };

    return {
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        updateProfile,
    };
}

useAuth.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        role: PropTypes.oneOf(['user', 'admin']),
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
};