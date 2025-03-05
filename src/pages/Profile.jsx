import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserCircleIcon, PhoneIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            await updateProfile(formData);
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <UserCircleIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Not Logged In</h3>
                    <p className="mt-1 text-sm text-gray-500">Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="max-w-3xl mx-auto">
                <div className="animate-fade-in">
                    <div className="flex items-center mb-8 space-x-4">
                        <div className="flex items-center justify-center rounded-full h-14 w-14 bg-primary-100">
                            <UserCircleIcon className="w-8 h-8 text-primary-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                            <p className="text-sm text-gray-500">Manage your account preferences and settings</p>
                        </div>
                    </div>

                    <div className="card animate-slide-up">
                        <div className="card-header">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary-100">
                                            <UserCircleIcon className="w-6 h-6 text-secondary-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Account Type</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {user.role === 'admin' ? 'Administrator' : 'User'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 card-body">
                            {error && (
                                <div className="p-4 rounded-lg bg-red-50 animate-fade-in">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="p-4 rounded-lg bg-green-50 animate-fade-in">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-green-800">{success}</h3>
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
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <UserCircleIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="pl-10 input-field"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="pl-10 input-field"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <PhoneIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="pl-10 input-field"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 loading-spinner"></div>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-6 card animate-slide-up">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                                            <KeyIcon className="w-6 h-6 text-yellow-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Password Settings</h2>
                                        <p className="text-sm text-gray-500">
                                            Manage your password and security preferences
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => window.location.href = 'mailto:support@realestate.com'}
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 