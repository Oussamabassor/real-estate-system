import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Your Profile
                </h1>

                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {user.role === 'admin' ? 'Administrator' : 'User'}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            {error}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">
                                            {success}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                    'Update Profile'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Change Password
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                        To change your password, please contact support for assistance.
                    </p>
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
    );
} 