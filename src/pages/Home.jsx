import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    CurrencyDollarIcon,
    UserCircleIcon,
    PhoneIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import LoadingScreen from '../components/LoadingScreen';
import Layout from '../components/Layout';
import CTASection from '../components/CTASection';
import PropertyGrid from '../components/PropertyGrid';
import { useFeaturedProperties } from '../hooks/useProperties';

export default function Home() {
    const { t } = useLanguage();
    const { data: featuredProperties, isLoading: propertiesLoading, error: propertiesError } = useFeaturedProperties(12);
    const [displayCount, setDisplayCount] = useState(4);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('all');
    const [stats, setStats] = useState({
        properties: 0,
        clients: 0,
        cities: 0,
        agents: 0
    });
    const [isScrolled, setIsScrolled] = useState(false);
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setStatsLoading(true);
                setStatsError(null);
                const statsResponse = await api.get('/stats');
                setStats(statsResponse.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
                setStatsError(err.message || 'An error occurred while loading stats');
            } finally {
                setStatsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const filteredProperties = featuredProperties?.filter(property => {
        if (!property) return false;

        // Log the property for debugging
        console.log('Validating property:', property);

        // Basic property validation with detailed error logging
        const requiredFields = {
            id: 'number',
            title: 'string',
            description: 'string',
            price: 'number'
        };

        const isValidProperty = Object.entries(requiredFields).every(([field, type]) => {
            const value = property[field];
            const hasField = field in property;

            // Try to coerce the value to the correct type
            let hasCorrectType = false;
            if (type === 'number') {
                const num = Number(value);
                hasCorrectType = !isNaN(num);
                if (hasCorrectType) {
                    property[field] = num; // Update the value to be a number
                }
            } else {
                hasCorrectType = typeof value === type;
            }

            if (!hasField || !hasCorrectType) {
                console.warn(`Property validation failed: ${field} should be ${type}, got ${typeof value}. Value:`, value);
                return false;
            }
            return true;
        });

        // Check for either type or property_type
        const propertyType = property.type || property.property_type;
        const hasValidType = propertyType && ['apartment', 'bungalow'].includes(propertyType);
        if (!hasValidType) {
            console.warn('Property validation failed: invalid or missing type/property_type. Value:', propertyType);
            return false;
        }

        if (!isValidProperty) {
            console.warn('Invalid property data:', property);
            return false;
        }

        const matchesSearch = !searchQuery ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = propertyType === 'all' || propertyType === propertyType;

        return matchesSearch && matchesType;
    }) || [];

    console.log('Featured Properties:', featuredProperties); // Debug log
    console.log('Filtered Properties:', filteredProperties); // Debug log

    const displayedProperties = filteredProperties.slice(0, 4);

    if (propertiesLoading || statsLoading) {
        return <LoadingScreen />;
    }

    if (propertiesError || statsError) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
                    <div className="text-red-500">
                        {propertiesError || statsError}
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with CTA */}
                <CTASection stats={stats} />

                {/* Featured Properties Section */}
                <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Featured Properties
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="max-w-2xl mx-auto mt-4 text-lg text-gray-600"
                        >
                            Discover our handpicked selection of premium properties
                            {featuredProperties?.length > 0 && ` (${featuredProperties.length} available)`}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        {propertiesLoading ? (
                            <div className="flex justify-center">
                                <div className="loading-spinner h-12 w-12"></div>
                            </div>
                        ) : propertiesError ? (
                            <div className="text-center text-red-500">
                                {propertiesError}
                            </div>
                        ) : (
                            <>
                                <PropertyGrid
                                    properties={displayedProperties}
                                    loading={false}
                                    error={null}
                                />

                                {/* View All Properties Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 text-center"
                                >
                                    <Link
                                        to="/properties"
                                        className="btn btn-primary inline-flex items-center group"
                                    >
                                        View All Properties
                                        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </section>
            </div>
        </Layout>
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