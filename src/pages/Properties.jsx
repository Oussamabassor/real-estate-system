import { useState, useEffect } from 'react';
import { propertyApi } from '../services/api';
import PropertyGrid from '../components/PropertyGrid';
import Layout from '../components/Layout';
import {
    AdjustmentsHorizontalIcon,
    BuildingOfficeIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useProperties } from '../hooks/useProperties';

export default function Properties() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
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
    const [searchQuery, setSearchQuery] = useState('');

    const { data, isLoading, error } = useProperties(currentPage, 12);
    const properties = data?.properties || [];
    const totalProperties = data?.total || 0;
    const lastPage = data?.lastPage || 1;

    const filteredProperties = properties.filter(property => {
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            if (!property.title.toLowerCase().includes(query) &&
                !property.description.toLowerCase().includes(query)) {
                return false;
            }
        }

        // Type filter
        if (filters.type !== 'all' && property.property_type !== filters.type) {
            return false;
        }

        // Price filters
        if (filters.minPrice && property.price < Number(filters.minPrice)) {
            return false;
        }
        if (filters.maxPrice && property.price > Number(filters.maxPrice)) {
            return false;
        }

        // Bedroom filter
        if (filters.bedrooms && property.bedrooms < Number(filters.bedrooms)) {
            return false;
        }

        // Bathroom filter
        if (filters.bathrooms && property.bathrooms < Number(filters.bathrooms)) {
            return false;
        }

        // Area filters
        if (filters.minArea && property.area < Number(filters.minArea)) {
            return false;
        }
        if (filters.maxArea && property.area > Number(filters.maxArea)) {
            return false;
        }

        return true;
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page when filters change
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
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page when searching
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
                    <div className="loading-spinner h-12 w-12"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
                    <div className="text-red-500">{error}</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="mt-6">
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
                    </form>
                </div>
            </div>

            {/* Filters Panel */}
            <div className={`bg-white border-t border-gray-200 transition-all duration-300 ${showFilters ? 'py-8' : 'h-0 overflow-hidden'}`}>
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

                    <div className="mt-6 flex justify-end">
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
            <div className="py-6">
                <PropertyGrid
                    properties={filteredProperties}
                    loading={isLoading}
                />

                {/* Pagination */}
                {lastPage > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-secondary px-3 py-2 disabled:opacity-50"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            {[...Array(lastPage)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'} px-4 py-2`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === lastPage}
                                className="btn btn-secondary px-3 py-2 disabled:opacity-50"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && filteredProperties.length === 0 && !error && (
                    <div className="text-center p-8">
                        <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                        <p className="mt-1 text-gray-500">Try adjusting your filters or search criteria</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 btn btn-primary"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
} 