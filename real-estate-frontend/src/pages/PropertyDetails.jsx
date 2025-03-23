import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPinIcon,
    HomeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HeartIcon,
    ShareIcon,
    ArrowLeftIcon,
    CalendarIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faRuler, faParking, faWifi, faTv, faSwimmingPool, faFan } from "@fortawesome/free-solid-svg-icons";

const amenities = [
    { icon: faWifi, label: 'Free WiFi' },
    { icon: faParking, label: 'Parking' },
    { icon: faTv, label: 'Smart TV' },
    { icon: faSwimmingPool, label: 'Pool' },
    { icon: faFan, label: 'Air Conditioning' }
];

const FeatureItem = ({ icon, value, label }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 bg-white p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300"
    >
        <div className="p-3 bg-purple-50 rounded-lg">
            <FontAwesomeIcon icon={icon} className="w-5 h-5 text-purple-500" />
        </div>
        <div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    </motion.div>
);

const AmenityItem = ({ icon, label }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all duration-300"
    >
        <FontAwesomeIcon icon={icon} className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </motion.div>
);

const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
    >
        {children}
    </motion.div>
);

const LoadingAnimation = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-gray-50 py-12"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button Skeleton */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "10rem" }}
                className="w-40 h-6 bg-purple-100 rounded-lg mb-8 animate-pulse"
            />

            {/* Image Gallery Skeleton with Animation */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 600 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative rounded-3xl overflow-hidden mb-8 bg-purple-100"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute inset-0"
                >
                    {/* Status Badge Skeleton */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute top-4 left-4"
                    >
                        <div className="w-24 h-8 bg-white/20 rounded-lg" />
                    </motion.div>

                    {/* Action Buttons Skeleton */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute top-4 right-4 flex items-center space-x-2"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-full" />
                        <div className="w-12 h-12 bg-white/20 rounded-full" />
                    </motion.div>

                    {/* Image Counter Skeleton */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-4 right-4"
                    >
                        <div className="w-20 h-8 bg-white/20 rounded-full" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Content Grid Skeleton with Staggered Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Main Content Skeleton */}
                <motion.div
                    className="lg:col-span-2 space-y-8"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {/* Header Skeleton */}
                    <motion.div className="space-y-4">
                        <motion.div className="h-10 bg-purple-100 rounded-lg w-3/4 animate-pulse" />
                        <motion.div className="h-6 bg-purple-100 rounded-lg w-1/2 animate-pulse" />
                        <motion.div className="h-8 bg-purple-100 rounded-lg w-1/3 animate-pulse" />
                    </motion.div>

                    {/* Features Grid Skeleton */}
                    <motion.div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-purple-100 animate-pulse"
                            >
                                <motion.div className="w-12 h-12 bg-purple-100 rounded-lg" />
                                <motion.div className="flex-1 space-y-2">
                                    <motion.div className="h-6 bg-purple-100 rounded w-1/2" />
                                    <motion.div className="h-4 bg-purple-100 rounded w-1/3" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Description Skeleton */}
                    <motion.div className="bg-white rounded-xl p-6 border border-purple-100">
                        <motion.div className="h-7 bg-purple-100 rounded w-1/4 mb-4 animate-pulse" />
                        <motion.div className="space-y-2 animate-pulse">
                            <motion.div className="h-4 bg-purple-100 rounded w-full" />
                            <motion.div className="h-4 bg-purple-100 rounded w-full" />
                            <motion.div className="h-4 bg-purple-100 rounded w-3/4" />
                        </motion.div>
                    </motion.div>

                    {/* Amenities Skeleton */}
                    <motion.div>
                        <motion.div className="h-7 bg-purple-100 rounded w-1/4 mb-4 animate-pulse" />
                        <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100"
                                >
                                    <motion.div className="w-4 h-4 bg-purple-100 rounded animate-pulse" />
                                    <motion.div className="h-4 bg-purple-100 rounded w-20 animate-pulse" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Sidebar Skeleton with Animation */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {/* Contact Form Skeleton */}
                    <motion.div className="bg-white rounded-xl p-6 border border-purple-100">
                        <motion.div className="h-7 bg-purple-100 rounded w-2/3 mb-6 animate-pulse" />
                        <motion.div className="space-y-4">
                            {/* Form Fields */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div key={i} className="space-y-1">
                                    <motion.div className="h-4 bg-purple-100 rounded w-1/4 animate-pulse" />
                                    <motion.div className="h-10 bg-purple-100 rounded-lg w-full animate-pulse" />
                                </motion.div>
                            ))}
                            {/* Button */}
                            <motion.div className="h-12 bg-purple-100 rounded-xl w-full animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* Additional Info Skeleton */}
                    <motion.div className="bg-white rounded-xl p-6 border border-purple-100">
                        <motion.div className="h-7 bg-purple-100 rounded w-2/3 mb-4 animate-pulse" />
                        <motion.div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <motion.div key={i} className="flex items-center justify-between">
                                    <motion.div className="flex items-center gap-2">
                                        <motion.div className="w-5 h-5 bg-purple-100 rounded animate-pulse" />
                                        <motion.div className="h-4 bg-purple-100 rounded w-20 animate-pulse" />
                                    </motion.div>
                                    <motion.div className="h-4 bg-purple-100 rounded w-16 animate-pulse" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    </motion.div>
);

export default function PropertyDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Reset loading state on route change
        setLoading(true);

        // Simulated API call
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProperty({
                    id: 1,
                    title: "Modern Luxury Apartment with Ocean View",
                    description: "Experience luxury living in this stunning apartment featuring breathtaking ocean views, modern amenities, and premium finishes throughout. This exceptional property offers the perfect blend of comfort and sophistication.",
                    price: 850000,
                    type: "apartment",
                    bedrooms: 3,
                    bathrooms: 2,
                    area: 180,
                    floor: 15,
                    location: "123 Ocean Drive, Miami Beach, FL",
                    status: "For Sale",
                    images: [
                        "https://picsum.photos/1200/800",
                        "https://picsum.photos/1201/800",
                        "https://picsum.photos/1202/800",
                        "https://picsum.photos/1203/800"
                    ],
                    yearBuilt: 2020,
                    parking: 2
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, location.key]); // Add location.key to re-run effect on navigation

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === property.images.length - 1 ? 0 : prev + 1
        );
    };

    if (loading) {
        return (
            <AnimatePresence mode="wait">
                <LoadingAnimation key="loading" />
            </AnimatePresence>
        );
    }

    if (!property) {
        return (
            <AnimatePresence mode="wait">
                <PageTransition key="not-found">
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <HomeIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
                            <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
                            <Link
                                to="/properties"
                                className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-purple-200 hover:shadow-xl"
                            >
                                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                                Back to Properties
                            </Link>
                        </div>
                    </div>
                </PageTransition>
            </AnimatePresence>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={`property-${id}`}>
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Back Button */}
                        <Link
                            to="/properties"
                            className="inline-flex items-center text-purple-500 hover:text-purple-600 font-medium mb-8 group"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
                            Back to Properties
                        </Link>

                        {/* Image Gallery */}
                        <div className="relative h-[600px] rounded-3xl overflow-hidden mb-8 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={property.images[currentImageIndex]}
                                    alt={`Property image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>

                            {/* Image Navigation */}
                            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handlePrevImage}
                                    className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
                                >
                                    <ChevronLeftIcon className="w-6 h-6" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleNextImage}
                                    className="p-2 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
                                >
                                    <ChevronRightIcon className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm">
                                {currentImageIndex + 1} / {property.images.length}
                            </div>

                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex items-center space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${isLiked
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-purple-500'
                                        }`}
                                >
                                    <HeartIcon className="w-6 h-6" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-purple-500 transition-all duration-300"
                                >
                                    <ShareIcon className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-500/90 backdrop-blur-sm rounded-lg shadow-lg"
                                >
                                    {property.status}
                                </motion.span>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Header */}
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                                    <div className="flex items-center text-purple-500 mb-4">
                                        <MapPinIcon className="w-5 h-5 mr-2" />
                                        <span className="text-lg">{property.location}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-purple-500">
                                        {formatPrice(property.price)}
                                    </div>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FeatureItem icon={faBed} value={property.bedrooms} label="Bedrooms" />
                                    <FeatureItem icon={faBath} value={property.bathrooms} label="Bathrooms" />
                                    <FeatureItem icon={faRuler} value={`${property.area} m²`} label="Living Area" />
                                    <FeatureItem icon={faParking} value={property.parking} label="Parking Spots" />
                                </div>

                                {/* Description */}
                                <div className="bg-white rounded-xl p-6 border border-purple-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                                </div>

                                {/* Amenities */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {amenities.map((amenity, index) => (
                                            <AmenityItem key={index} icon={amenity.icon} label={amenity.label} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Contact Form */}
                                <div className="bg-white rounded-xl p-6 border border-purple-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule a Tour</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                                placeholder="Your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                                placeholder="Your phone"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                            <textarea
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                                rows="4"
                                                placeholder="I'm interested in this property..."
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-purple-200 hover:shadow-xl"
                                        >
                                            Schedule Tour
                                        </motion.button>
                                    </form>
                                </div>

                                {/* Additional Info */}
                                <div className="bg-white rounded-xl p-6 border border-purple-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-600">
                                                <CalendarIcon className="w-5 h-5 mr-2 text-purple-500" />
                                                Year Built
                                            </div>
                                            <span className="font-medium text-gray-900">{property.yearBuilt}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-600">
                                                <HomeIcon className="w-5 h-5 mr-2 text-purple-500" />
                                                Property Type
                                            </div>
                                            <span className="font-medium text-gray-900 capitalize">{property.type}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-600">
                                                <DocumentTextIcon className="w-5 h-5 mr-2 text-purple-500" />
                                                Status
                                            </div>
                                            <span className="font-medium text-gray-900">{property.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </AnimatePresence>
    );
} 