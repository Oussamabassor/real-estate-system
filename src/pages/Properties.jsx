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
import { PageTransition, LoadingSpinner, FadeIn, SlideIn, StaggerChildren, StaggerItem } from '../components/PageAnimations';

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
            <AnimatePresence mode="wait">
                <LoadingSpinner key="loading" />
            </AnimatePresence>
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
        <AnimatePresence mode="wait">
            <PageTransition key="properties">
                <div className="min-h-screen bg-gray-50">
                    {/* Hero Section with Enhanced Background */}
                    <FadeIn>
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
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onFocus={() => setIsSearchFocused(true)}
                                                onBlur={() => setIsSearchFocused(false)}
                                                placeholder="Search by property name or description..."
                                                className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg text-white placeholder-white/60 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 pr-12"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
                                            >
                                                <MagnifyingGlassIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Filters Section */}
                        <SlideIn>
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setShowFilters(!showFilters)}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                                        >
                                            <FunnelIcon className="w-5 h-5" />
                                            Filters
                                        </button>
                                        {Object.values(filters).some(value => value !== '' && value !== 'all') && (
                                            <button
                                                onClick={resetFilters}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                                Reset
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleRefresh}
                                        className={`flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                                    >
                                        <ArrowPathIcon className="w-5 h-5" />
                                        Refresh
                                    </button>
                                </div>

                                {/* Filter Options */}
                                {showFilters && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {filterOptions.map((filter) => (
                                            <div key={filter.name} className="space-y-2">
                                                <label className="flex items-center gap-2 text-gray-700">
                                                    <filter.icon className="w-5 h-5" />
                                                    {filter.label}
                                                </label>
                                                <select
                                                    name={filter.name}
                                                    value={filters[filter.name]}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                >
                                                    {filter.options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </SlideIn>

                        {/* Properties Grid */}
                        <StaggerChildren>
                            <PropertyGrid properties={filteredProperties} loading={false} />
                        </StaggerChildren>

                        {/* Pagination */}
                        {lastPage > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </button>
                                {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === page
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === lastPage}
                                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </PageTransition>
        </AnimatePresence>
    );
} 