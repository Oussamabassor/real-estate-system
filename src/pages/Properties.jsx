import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    CurrencyDollarIcon,
    HomeModernIcon,
    BeakerIcon,
    Square2StackIcon,
    MapPinIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useProperties } from '../hooks/useProperties';

export default function Properties() {
    const navigate = useNavigate();
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
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { data, isLoading, error, refetch } = useProperties(currentPage, 12);
    const properties = data?.properties || [];
    const totalProperties = data?.total || 0;
    const lastPage = data?.lastPage || 1;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

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

    const handleContactClick = (propertyId) => {
        navigate('/contact', { state: { propertyId } });
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

    const filterOptions = [
        {
            icon: BuildingOfficeIcon,
            label: 'Property Type',
            name: 'type',
            type: 'select',
            options: [
                { value: 'all', label: 'All Types' },
                { value: 'apartment', label: 'Apartments' },
                { value: 'bungalow', label: 'Bungalows' }
            ]
        },
        {
            icon: HomeModernIcon,
            label: 'Bedrooms',
            name: 'bedrooms',
            type: 'select',
            options: [
                { value: '', label: 'Any' },
                { value: '1', label: '1+' },
                { value: '2', label: '2+' },
                { value: '3', label: '3+' },
                { value: '4', label: '4+' },
                { value: '5', label: '5+' }
            ]
        },
        {
            icon: BeakerIcon,
            label: 'Bathrooms',
            name: 'bathrooms',
            type: 'select',
            options: [
                { value: '', label: 'Any' },
                { value: '1', label: '1+' },
                { value: '2', label: '2+' },
                { value: '3', label: '3+' },
                { value: '4', label: '4+' }
            ]
        }
    ];

    return (
        <Layout>
            {/* Hero Section with Enhanced Background */}
            <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
                {/* Background Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
                    }}
                />

                {/* Overlay Layers */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/50 to-blue-950/80"></div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                            Discover Your Dream Property
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                            {totalProperties} exclusive listings waiting for you to explore
                        </p>
                    </motion.div>

                    {/* Enhanced Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-12 max-w-3xl mx-auto w-full"
                    >
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="relative">
                                <MagnifyingGlassIcon
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-colors duration-200 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                                        }`}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className="w-full pl-14 pr-12 py-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-lg group-hover:shadow-xl"
                                    placeholder="Search by location, property type, or features..."
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                    <MapPinIcon className="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-gray-50 min-h-screen">
                {/* Filters Card */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        {/* Filter Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={`flex items-center px-5 py-3 rounded-xl transition-all duration-200 ${showFilters
                                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <FunnelIcon className="h-5 w-5 mr-2" />
                                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                                    </motion.button>

                                    <div className="flex items-center space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleRefresh}
                                            className={`p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 ${isRefreshing ? 'animate-spin' : ''
                                                }`}
                                        >
                                            <ArrowPathIcon className="h-5 w-5" />
                                        </motion.button>

                                        <div className="relative">
                                            <select
                                                value={filters.sortBy}
                                                onChange={handleFilterChange}
                                                name="sortBy"
                                                className="appearance-none pl-5 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer hover:border-blue-500"
                                            >
                                                <option value="price_asc">Price: Low to High</option>
                                                <option value="price_desc">Price: High to Low</option>
                                                <option value="bedrooms_desc">Most Bedrooms</option>
                                                <option value="area_desc">Largest Area</option>
                                            </select>
                                            <ArrowsUpDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {Object.values(filters).some(value => value !== '' && value !== 'all') && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={resetFilters}
                                        className="flex items-center px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                                    >
                                        <XMarkIcon className="h-5 w-5 mr-2" />
                                        Clear All
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden bg-gray-50/50"
                                >
                                    <div className="p-6 space-y-6">
                                        {/* Price Range */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                        >
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
                                                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
                                                Price Range
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                    <input
                                                        type="number"
                                                        name="minPrice"
                                                        value={filters.minPrice}
                                                        onChange={handleFilterChange}
                                                        placeholder="Min Price"
                                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-blue-500"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                                    <input
                                                        type="number"
                                                        name="maxPrice"
                                                        value={filters.maxPrice}
                                                        onChange={handleFilterChange}
                                                        placeholder="Max Price"
                                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Property Features */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {filterOptions.map((filter, index) => (
                                                <motion.div
                                                    key={filter.name}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                                                >
                                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
                                                        <filter.icon className="h-5 w-5 mr-2 text-blue-500" />
                                                        {filter.label}
                                                    </label>
                                                    <select
                                                        name={filter.name}
                                                        value={filters[filter.name]}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 cursor-pointer hover:border-blue-500 appearance-none bg-white"
                                                    >
                                                        {filter.options.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Active Filters */}
                                        {Object.entries(filters).some(([key, value]) => value !== '' && value !== 'all') && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-wrap gap-2 pt-4"
                                            >
                                                {Object.entries(filters).map(([key, value]) => {
                                                    if (value === '' || value === 'all') return null;
                                                    const filterOption = filterOptions.find(f => f.name === key);
                                                    const label = filterOption
                                                        ? `${filterOption.label}: ${filterOption.options.find(o => o.value === value)?.label || value}`
                                                        : `${key}: ${value}`;
                                                    return (
                                                        <motion.span
                                                            key={key}
                                                            initial={{ scale: 0.8 }}
                                                            animate={{ scale: 1 }}
                                                            className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm"
                                                        >
                                                            {label}
                                                            <button
                                                                onClick={() => handleFilterChange({ target: { name: key, value: key === 'type' ? 'all' : '' } })}
                                                                className="ml-2 hover:text-blue-900"
                                                            >
                                                                <XMarkIcon className="h-4 w-4" />
                                                            </button>
                                                        </motion.span>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Properties Grid Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="loading-spinner h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center min-h-[400px]"
                        >
                            <div className="text-red-500 text-center">
                                <XMarkIcon className="h-12 w-12 mx-auto mb-4" />
                                <p className="text-lg font-medium">{error}</p>
                                <button
                                    onClick={handleRefresh}
                                    className="mt-4 px-6 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <PropertyGrid
                                properties={filteredProperties}
                                loading={isLoading}
                                onContactClick={handleContactClick}
                            />

                            {/* Enhanced Pagination */}
                            {lastPage > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-12 flex justify-center"
                                >
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="flex items-center px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                                        >
                                            <ChevronLeftIcon className="h-5 w-5" />
                                        </button>
                                        {[...Array(lastPage)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`px-5 py-2 rounded-xl transition-all duration-200 ${currentPage === i + 1
                                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === lastPage}
                                            className="flex items-center px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow"
                                        >
                                            <ChevronRightIcon className="h-5 w-5" />
                                        </button>
                                    </nav>
                                </motion.div>
                            )}

                            {/* Enhanced Empty State */}
                            {!isLoading && filteredProperties.length === 0 && !error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-16"
                                >
                                    <BuildingOfficeIcon className="mx-auto h-16 w-16 text-gray-400" />
                                    <h3 className="mt-6 text-xl font-semibold text-gray-900">No properties found</h3>
                                    <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                                        We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
                                    </p>
                                    <button
                                        onClick={resetFilters}
                                        className="mt-6 px-8 py-4 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-xl"
                                    >
                                        Reset All Filters
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
} 