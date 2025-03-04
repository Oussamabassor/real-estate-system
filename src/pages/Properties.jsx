import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { propertyApi } from '../services/api';
import PropertyCard from '../components/PropertyCard';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        sortBy: 'price_asc'
    });

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const { data } = await propertyApi.getAll();
            let filteredProperties = [...data];

            // Apply filters
            if (filters.type !== 'all') {
                filteredProperties = filteredProperties.filter(prop => prop.type === filters.type);
            }

            if (filters.minPrice) {
                filteredProperties = filteredProperties.filter(prop => prop.price >= Number(filters.minPrice));
            }

            if (filters.maxPrice) {
                filteredProperties = filteredProperties.filter(prop => prop.price <= Number(filters.maxPrice));
            }

            if (filters.bedrooms) {
                filteredProperties = filteredProperties.filter(prop => prop.bedrooms >= Number(filters.bedrooms));
            }

            // Apply sorting
            switch (filters.sortBy) {
                case 'price_asc':
                    filteredProperties.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    filteredProperties.sort((a, b) => b.price - a.price);
                    break;
                case 'bedrooms_desc':
                    filteredProperties.sort((a, b) => b.bedrooms - a.bedrooms);
                    break;
                case 'area_desc':
                    filteredProperties.sort((a, b) => b.area - a.area);
                    break;
                default:
                    break;
            }

            setProperties(filteredProperties);
            setError(null);
        } catch (err) {
            setError('Failed to load properties');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                Available Properties
            </h1>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Property Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="all">All Types</option>
                            <option value="apartment">Apartments</option>
                            <option value="bungalow">Bungalows</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                            Min Price
                        </label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                            Max Price
                        </label>
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="1000000"
                        />
                    </div>

                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                            Min Bedrooms
                        </label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            value={filters.bedrooms}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                            Sort By
                        </label>
                        <select
                            id="sortBy"
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleFilterChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="bedrooms_desc">Bedrooms: High to Low</option>
                            <option value="area_desc">Area: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            {error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : properties.length === 0 ? (
                <div className="text-center text-gray-500">
                    No properties found matching your criteria.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
}

Properties.propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({
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