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

export default function Home() {
    const { t } = useLanguage();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const propertiesResponse = await api.get('/properties/featured');
                setFeaturedProperties(propertiesResponse.data);

                const statsResponse = await api.get('/stats');
                setStats(statsResponse.data);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Une erreur est survenue lors du chargement des données');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const filteredProperties = featuredProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = propertyType === 'all' || property.type === propertyType;
        return matchesSearch && matchesType;
    });

    if (loading) {
        return <LoadingScreen />;
    }

    // if (error) {
    //     return (
    //         <motion.div
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             className="flex items-center justify-center min-h-screen bg-gray-50"
    //         >
    //             <div className="text-center">
    //                 <h2 className="mb-4 text-2xl font-semibold text-gray-900">
    //                     {t('common.error')}
    //                 </h2>
    //                 <p className="mb-4 text-gray-600">{error}</p>
    //                 <motion.button
    //                     whileHover={{ scale: 1.05 }}
    //                     whileTap={{ scale: 0.95 }}
    //                     onClick={() => window.location.reload()}
    //                     className="px-4 py-2 text-white transition-colors rounded-md bg-primary-600 hover:bg-primary-700"
    //                 >
    //                     {t('common.retry')}
    //                 </motion.button>
    //             </div>
    //         </motion.div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900"
                style={{ minHeight: '80vh' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            className="object-cover w-full h-full"
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                            alt="Real Estate"
                        />
                    </motion.div>

                    {/* Improved Gradient Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-primary-900/95"
                    />

                    {/* Enhanced Background Shapes */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="relative px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {/* Title with Enhanced Gradient */}
                        <motion.h1
                            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white">
                                {t('home.hero.title')}
                            </span>
                        </motion.h1>

                        {/* Subtitle with Enhanced Style */}
                        <motion.p
                            className="max-w-2xl mx-auto mt-6 text-xl text-gray-300/90 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            {t('home.hero.subtitle')}
                        </motion.p>

                        {/* Improved Search Section */}
                        <motion.div
                            className="max-w-2xl mx-auto mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                        >
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                    <div className="sm:col-span-5">
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 transition-colors group-hover:text-primary-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                                                placeholder={t('home.hero.search.locationPlaceholder')}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <div className="relative">
                                            <select
                                                value={propertyType}
                                                onChange={(e) => setPropertyType(e.target.value)}
                                                className="w-full px-4 py-3 text-white appearance-none bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                            >
                                                <option value="all" className="text-gray-900">{t('common.select')}</option>
                                                <option value="apartment" className="text-gray-900">{t('propertyTypes.apartment')}</option>
                                                <option value="bungalow" className="text-gray-900">{t('propertyTypes.bungalow')}</option>
                                            </select>
                                            <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="h-full"
                                        >
                                            <Link
                                                to="/properties"
                                                className="flex items-center justify-center w-full h-full px-6 py-3 text-white font-medium transition-all duration-300 bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25"
                                            >
                                                {t('home.hero.search.search')}
                                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Improved Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <motion.button
                        onClick={scrollToContent}
                        className="p-3 text-white transition-all duration-300 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:shadow-lg group"
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ChevronDownIcon className="w-6 h-6 transition-transform group-hover:transform group-hover:translate-y-1" />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                className="py-20 bg-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { icon: BuildingOfficeIcon, value: stats.properties, label: t('home.stats.properties') },
                            { icon: UserGroupIcon, value: stats.clients, label: t('home.stats.clients') },
                            { icon: MapPinIcon, value: stats.cities, label: t('home.stats.cities') },
                            { icon: UserCircleIcon, value: stats.agents, label: t('home.stats.agents') }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="p-6 transition-all duration-300 card group hover:shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-full bg-primary-100 group-hover:bg-primary-200">
                                    <stat.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Featured Properties */}
            <motion.div
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            {t('home.featured.title')}
                        </h2>
                        <p className="mt-3 text-xl text-gray-500">
                            {t('home.featured.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </div>

                    {filteredProperties.length === 0 && (
                        <motion.div
                            className="py-12 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <BuildingOfficeIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search criteria
                            </p>
                        </motion.div>
                    )}

                    {filteredProperties.length > 0 && (
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/properties"
                                    className="inline-flex items-center btn btn-primary"
                                >
                                    View All Properties
                                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                className="py-20 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            {t('home.features.title')}
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            {t('home.features.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: MagnifyingGlassIcon,
                                title: t('home.features.items.search'),
                                description: t('home.features.items.searchDescription')
                            },
                            {
                                icon: PhoneIcon,
                                title: t('home.features.items.support'),
                                description: t('home.features.items.supportDescription')
                            },
                            {
                                icon: ShieldCheckIcon,
                                title: t('home.features.items.security'),
                                description: t('home.features.items.securityDescription')
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="p-6 transition-all duration-300 card group hover:shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-md bg-primary-100 group-hover:bg-primary-200">
                                    <feature.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="bg-primary-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            <span className="block">{t('home.cta.title')}</span>
                            <span className="block text-primary-200">{t('home.cta.subtitle')}</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        className="flex mt-8 lg:mt-0 lg:flex-shrink-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="inline-flex rounded-md shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/properties"
                                className="bg-white btn hover:bg-gray-50 text-primary-600"
                            >
                                {t('home.cta.form.send')}
                            </Link>
                        </motion.div>
                        <motion.div
                            className="inline-flex ml-3 rounded-md shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/contact"
                                className="btn btn-secondary"
                            >
                                {t('home.cta.form.send')}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
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