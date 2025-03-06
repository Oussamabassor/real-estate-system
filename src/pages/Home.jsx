import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    MapPinIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function Home() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('all');

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            setLoading(true);
            const response = await propertyService.getAll(1, 6);
            setFeaturedProperties(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch featured properties:', err);
            setError(err.message || 'Failed to load featured properties');
        } finally {
            setLoading(false);
        }
    };

    const filteredProperties = featuredProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = propertyType === 'all' || property.type === propertyType;
        return matchesSearch && matchesType;
    });

    const stats = [
        { label: 'Properties Listed', value: '2,000+', icon: HomeIcon },
        { label: 'Happy Clients', value: '10,000+', icon: UserGroupIcon },
        { label: 'Cities Covered', value: '50+', icon: MapPinIcon },
        { label: 'Successful Deals', value: '15,000+', icon: CurrencyDollarIcon },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading-spinner h-12 w-12"></div>
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
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        className="w-full h-full object-cover opacity-40"
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        alt="Real Estate"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent mix-blend-multiply"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="md:ml-auto md:w-1/2 md:pl-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in">
                            Find Your Dream Home
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl animate-slide-up">
                            Discover the perfect property from our extensive collection of luxury homes, apartments, and bungalows.
                        </p>

                        <div className="mt-10 max-w-xl animate-slide-up">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="input-field pl-10"
                                            placeholder="Search properties..."
                                        />
                                    </div>
                                </div>
                                <select
                                    value={propertyType}
                                    onChange={(e) => setPropertyType(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="all">All Types</option>
                                    <option value="apartment">Apartments</option>
                                    <option value="bungalow">Bungalows</option>
                                </select>
                                <Link
                                    to="/properties"
                                    className="btn btn-primary inline-flex items-center justify-center whitespace-nowrap"
                                >
                                    Search
                                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="card p-6 text-center animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="mx-auto h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                                    <stat.icon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="mt-3">
                                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Properties */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Featured Properties
                        </h2>
                        <p className="mt-3 text-xl text-gray-500">
                            Discover our hand-picked selection of premium properties
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProperties.map((property, index) => (
                            <div
                                key={property.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>

                    {filteredProperties.length === 0 && (
                        <div className="text-center py-12">
                            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search criteria
                            </p>
                        </div>
                    )}

                    {filteredProperties.length > 0 && (
                        <div className="mt-12 text-center">
                            <Link
                                to="/properties"
                                className="btn btn-primary inline-flex items-center"
                            >
                                View All Properties
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Why Choose Us
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Experience the best in real estate services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="card p-6 animate-fade-in">
                            <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                                <HomeIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Wide Range of Properties</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Choose from our extensive collection of apartments and bungalows.
                            </p>
                        </div>

                        <div className="card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
                            <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Transactions</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Simple and secure reservation process with multiple payment options.
                            </p>
                        </div>

                        <div className="card p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <div className="h-12 w-12 rounded-md bg-primary-100 flex items-center justify-center">
                                <UserGroupIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">24/7 Support</h3>
                            <p className="mt-2 text-base text-gray-500">
                                Our dedicated support team is always ready to help you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to find your dream home?</span>
                        <span className="block text-primary-200">Get started today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/properties"
                                className="btn bg-white hover:bg-gray-50 text-primary-600"
                            >
                                Browse Properties
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link
                                to="/contact"
                                className="btn btn-secondary"
                            >
                                Contact Us
                            </Link>
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