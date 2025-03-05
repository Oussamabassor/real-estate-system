import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { propertyApi } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import {
    AdjustmentsHorizontalIcon,
    BuildingOfficeIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        type: 'all',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        minArea: '',
        maxArea: '',
        sortBy: 'price_asc'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const { data } = await propertyApi.getAll();
            setProperties(data);
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

    const resetFilters = () => {
        setFilters({
            type: 'all',
            minPrice: '',
            maxPrice: '',
            bedrooms: '',
            bathrooms: '',
            minArea: '',
            maxArea: '',
            sortBy: 'price_asc'
        });
        setSearchQuery('');
    };

    const filteredProperties = properties.filter(property => {
        const matchesSearch = !searchQuery ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = filters.type === 'all' || property.type === filters.type;
        const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
        const matchesBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms);
        const matchesBathrooms = !filters.bathrooms || property.bathrooms >= Number(filters.bathrooms);
        const matchesMinArea = !filters.minArea || property.area >= Number(filters.minArea);
        const matchesMaxArea = !filters.maxArea || property.area <= Number(filters.maxArea);

        return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice &&
            matchesBedrooms && matchesBathrooms && matchesMinArea && matchesMaxArea;
    }).sort((a, b) => {
        switch (filters.sortBy) {
            case 'price_asc':
                return a.price - b.price;
            case 'price_desc':
                return b.price - a.price;
            case 'bedrooms_desc':
                return b.bedrooms - a.bedrooms;
            case 'area_desc':
                return b.area - a.area;
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading-spinner h-12 w-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Available Properties
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                {filteredProperties.length} properties found
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="btn btn-secondary inline-flex items-center"
                            >
                                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
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
                        <div className="flex items-center space-x-4">
                            <select
                                value={filters.sortBy}
                                onChange={handleFilterChange}
                                name="sortBy"
                                className="input-field"
                            >
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="bedrooms_desc">Most Bedrooms</option>
                                <option value="area_desc">Largest Area</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            <div className={`bg-white border-t border-gray-200 transition-all duration-300 ${showFilters ? 'py-8' : 'py-0 h-0 overflow-hidden'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label htmlFor="type" className="form-label">
                                Property Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="input-field"
                            >
                                <option value="all">All Types</option>
                                <option value="apartment">Apartments</option>
                                <option value="bungalow">Bungalows</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="bedrooms" className="form-label">
                                Min Bedrooms
                            </label>
                            <select
                                id="bedrooms"
                                name="bedrooms"
                                value={filters.bedrooms}
                                onChange={handleFilterChange}
                                className="input-field"
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                                <option value="5">5+</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="bathrooms" className="form-label">
                                Min Bathrooms
                            </label>
                            <select
                                id="bathrooms"
                                name="bathrooms"
                                value={filters.bathrooms}
                                onChange={handleFilterChange}
                                className="input-field"
                            >
                                <option value="">Any</option>
                                <option value="1">1+</option>
                                <option value="2">2+</option>
                                <option value="3">3+</option>
                                <option value="4">4+</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="minPrice" className="form-label">
                                Price Range
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    className="input-field"
                                    placeholder="Min"
                                />
                                <input
                                    type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    className="input-field"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={resetFilters}
                            className="btn btn-secondary"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error ? (
                    <div className="text-center text-red-500 animate-fade-in">
                        <div className="mx-auto h-12 w-12 text-red-500">
                            <XMarkIcon className="h-12 w-12" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium">{error}</h3>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center animate-fade-in">
                        <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your filters or search criteria
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 btn btn-primary"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
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