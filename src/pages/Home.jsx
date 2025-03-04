import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { propertyApi } from '../services/api';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            try {
                const { data } = await propertyApi.getAll();
                setFeaturedProperties(data.slice(0, 6));
                setLoading(false);
            } catch (err) {
                setError('Failed to load featured properties');
                setLoading(false);
            }
        };

        fetchFeaturedProperties();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gray-900">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        alt="Real Estate"
                    />
                    <div className="absolute inset-0 bg-gray-900 mix-blend-multiply"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Find Your Dream Home
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Discover the perfect property from our extensive collection of apartments and bungalows.
                    </p>
                    <div className="mt-10">
                        <Link
                            to="/properties"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Browse Properties
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Properties */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                    Featured Properties
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Wide Range of Properties</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Choose from our extensive collection of apartments and bungalows.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Booking Process</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Simple and quick reservation process with secure payment options.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Our dedicated support team is always ready to help you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.propTypes = {
    featuredProperties: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['apartment', 'bungalow']).isRequired,
        bedrooms: PropTypes.number.isRequired,
        bathrooms: PropTypes.number.isRequired,
        area: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        floor: PropTypes.number,
    })),
}; 