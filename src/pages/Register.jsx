import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    LockClosedIcon,
    ExclamationCircleIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);

        if (name === 'password') {
            // Calculate password strength
            let strength = 0;
            if (value.length >= 8) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[0-9]/.test(value)) strength++;
            if (/[^A-Za-z0-9]/.test(value)) strength++;
            setPasswordStrength(strength);
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
                return 'bg-red-500';
            case 1:
                return 'bg-orange-500';
            case 2:
                return 'bg-yellow-500';
            case 3:
                return 'bg-lime-500';
            case 4:
                return 'bg-green-500';
            default:
                return 'bg-gray-200';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!termsAccepted) {
            setError('Please accept the terms of service');
            return;
        }

        if (passwordStrength < 3) {
            setError('Please choose a stronger password');
            return;
        }

        try {
            setError(null);
            setLoading(true);
            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });
            navigate('/');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center animate-fade-in">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                        <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center gap-1">
                            <ArrowLeftIcon className="h-4 w-4" />
                            Sign in here
                        </Link>
                    </p>
                </div>

                <div className="mt-8">
                    <div className="card animate-slide-up">
                        <div className="card-body">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="rounded-lg bg-red-50 p-4 animate-fade-in">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="form-label">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="form-label">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                <span>Password strength:</span>
                                                <span>{['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength]}</span>
                                            </div>
                                            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                        I accept the{' '}
                                        <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                                            terms of service
                                        </Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                                            privacy policy
                                        </Link>
                                    </label>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <div className="loading-spinner h-5 w-5" />
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRightIcon className="h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="btn bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 w-full"
                                    >
                                        <svg className="h-5 w-5 text-[#4285F4]" viewBox="0 0 24 24">
                                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor" />
                                        </svg>
                                        <span className="ml-2">Google</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 w-full"
                                    >
                                        <svg className="h-5 w-5 text-[#1DA1F2]" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor" />
                                        </svg>
                                        <span className="ml-2">Twitter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 