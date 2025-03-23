import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/Layout';
import {
    EnvelopeIcon,
    LockClosedIcon,
    ExclamationCircleIcon,
    ArrowRightIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError(null);
        setLoading(true);

        const loginData = {
          email: formData.email,
          password: formData.password,
          remember: rememberMe,
        };

        console.log("Attempting login with:", loginData);
        const res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: loginData.email,
          password: loginData.password,
          remember: loginData.remember,
        });
        
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (err) {
        console.error("Login error details:", {
          response: err.response?.data,
          status: err.response?.status,
          message: err.response?.data?.message,
        });

        let errorMessage;
        if (err.response?.data?.errors) {
          errorMessage = Object.values(err.response.data.errors)
            .flat()
            .join("\n");
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 401) {
          errorMessage = "Invalid email or password";
        } else {
          errorMessage = "Login failed. Please try again.";
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    return (
        <Layout>
            <div className="min-h-[calc(100vh-4rem)] px-4 py-12 mt-2 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/50 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto">
                    <div className="text-center animate-fade-in">
                        <div className="flex items-center justify-center w-20 h-20 mx-auto shadow-xl rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-primary-500/20">
                            <BuildingOfficeIcon className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-3 text-base text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="inline-flex items-center gap-1 font-medium transition-colors text-primary-600 hover:text-primary-500">
                                Create one now
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="overflow-hidden bg-white shadow-xl rounded-2xl shadow-gray-200/50">
                            <div className="p-8">
                                <form className="space-y-6" onSubmit={handleSubmit} method='post'>
                                    {error && (
                                        <div className="p-4 border border-red-100 rounded-xl bg-red-50/50 animate-fade-in">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <div className="relative mt-1 group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <EnvelopeIcon className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                                                </div>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 transition-all border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative mt-1 group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <LockClosedIcon className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-primary-500" />
                                                </div>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 transition-all border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500/20"
                                            />
                                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <Link to="/forgot-password" className="font-medium transition-colors text-primary-600 hover:text-primary-500">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center justify-center w-full gap-2 px-8 py-3 text-base font-medium text-white transition-all shadow-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-primary-500/25"
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 loading-spinner" />
                                            ) : (
                                                <>
                                                    Sign in
                                                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 text-gray-500 bg-white">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all"
                                        >
                                            <svg className="w-5 h-5 mr-2 text-[#4285F4]" viewBox="0 0 24 24">
                                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor" />
                                            </svg>
                                            Google
                                        </button>

                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all"
                                        >
                                            <svg className="w-5 h-5 mr-2 text-[#1DA1F2]" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor" />
                                            </svg>
                                            Twitter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 