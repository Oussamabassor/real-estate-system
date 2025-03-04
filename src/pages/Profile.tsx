import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            await updateProfile(formData);
            setSuccess(true);
        } catch (error) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!user) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Please sign in to view your profile
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                        Profile updated successfully
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input mt-1"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-8 border-t">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Account Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm text-gray-500">Account Type</span>
                            <p className="text-sm font-medium text-gray-900">
                                {user.role === 'admin' ? 'Administrator' : 'User'}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Member Since</span>
                            <p className="text-sm font-medium text-gray-900">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 