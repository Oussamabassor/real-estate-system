import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { propertyApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
    Calendar,
    MapPin,
    Home,
    DollarSign,
    Users,
    Bath,
    SquareStack,
    Building2,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight,
    X,
    Check,
    Mail,
    Phone,
} from 'lucide-react';

export default function PropertyDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        message: '',
    });

    useEffect(() => {
        fetchPropertyDetails();
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            setLoading(true);
            const response = await propertyApi.getById(id);
            setProperty(response.data?.data || null);
            setError(null);
            // Check if property is in user's favorites
            if (user) {
                const isFav = user.favorites?.includes(id);
                setIsFavorite(isFav);
            }
        } catch (err) {
            setError('Failed to load property details');
            setProperty(null);
        } finally {
            setLoading(false);
        }
    };

    const handleImageNavigation = (direction) => {
        if (!property?.images?.length) return;

        if (direction === 'next') {
            setCurrentImageIndex((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1
            );
        } else {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1
            );
        }
    };

    const toggleFavorite = async () => {
        if (!user) {
            // Redirect to login or show login modal
            return;
        }
        try {
            await propertyApi.toggleFavorite(id);
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error('Failed to toggle favorite');
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await propertyApi.contactOwner({
                propertyId: id,
                ownerId: property.owner.id,
                ...contactForm
            });
            setShowContactForm(false);
            // Show success message using a toast or alert
            alert('Message sent successfully!');
        } catch (err) {
            // Show error message using a toast or alert
            alert('Failed to send message. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading-spinner h-12 w-12"></div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <X className="mx-auto h-12 w-12 text-red-500" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Property Not Found</h3>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                    <Link to="/properties" className="mt-6 btn btn-primary">
                        Back to Properties
                    </Link>
                </div>
            </div>
        );
    }

    // Ensure we have images array
    const images = property.images || [];
    const currentImage = images[currentImageIndex] || '';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Image Gallery */}
            <div className="relative h-[60vh] bg-gray-900">
                {currentImage ? (
                    <img
                        src={currentImage}
                        alt={property.title}
                        className="w-full h-full object-cover cursor-pointer transition-opacity"
                        onClick={() => setShowImageModal(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                        No image available
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-2">{property.title}</h1>
                        <div className="flex items-center text-white space-x-4">
                            <MapPin className="h-5 w-5" />
                            <span>{property.address}, {property.city}, {property.state} {property.zip_code}</span>
                        </div>
                    </div>
                </div>
                {/* Image Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => handleImageNavigation('prev')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => handleImageNavigation('next')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Quick Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center space-x-3">
                                    <DollarSign className="h-6 w-6 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-semibold">${property.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Users className="h-6 w-6 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                        <p className="font-semibold">{property.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Bath className="h-6 w-6 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                        <p className="font-semibold">{property.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <SquareStack className="h-6 w-6 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Area</p>
                                        <p className="font-semibold">{property.area} sq ft</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Description</h2>
                            <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Features</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Check className="h-5 w-5 text-primary-600" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-semibold mb-4">Location</h2>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                {/* Add your map component here */}
                                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                    Map placeholder
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Action Buttons */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={toggleFavorite}
                                    className={`flex-1 btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    <Heart
                                        className="h-5 w-5 mr-2"
                                        fill={isFavorite ? "currentColor" : "none"}
                                    />
                                    {isFavorite ? 'Saved' : 'Save'}
                                </button>
                                <button className="flex-1 btn btn-secondary">
                                    <Share2 className="h-5 w-5 mr-2" />
                                    Share
                                </button>
                            </div>
                            <button
                                onClick={() => setShowContactForm(true)}
                                className="w-full btn btn-primary"
                            >
                                Contact Agent
                            </button>
                        </div>

                        {/* Agent/Owner Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    {property.owner?.name?.charAt(0) || '?'}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{property.owner?.name || 'Owner'}</h3>
                                    <p className="text-sm text-gray-500">Property Owner</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {property.owner?.phone && (
                                    <p className="flex items-center space-x-2 text-sm">
                                        <Phone className="h-5 w-5 text-primary-600" />
                                        <span>{property.owner.phone}</span>
                                    </p>
                                )}
                                {property.owner?.email && (
                                    <p className="flex items-center space-x-2 text-sm">
                                        <Mail className="h-5 w-5 text-primary-600" />
                                        <span>{property.owner.email}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <button
                        onClick={() => setShowImageModal(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                    >
                        <X className="h-8 w-8" />
                    </button>
                    <img
                        src={currentImage}
                        alt={property.title}
                        className="max-w-full max-h-[90vh] object-contain"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                </div>
            )}

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Contact Agent</h3>
                            <button
                                onClick={() => setShowContactForm(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }))}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                    className="input-field"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={contactForm.phone}
                                    onChange={(e) => setContactForm(prev => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm(prev => ({
                                        ...prev,
                                        message: e.target.value
                                    }))}
                                    className="input-field"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full btn btn-primary">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

PropertyDetails.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        property_type: PropTypes.string.isRequired,
        bedrooms: PropTypes.number.isRequired,
        bathrooms: PropTypes.number.isRequired,
        area: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string),
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip_code: PropTypes.string.isRequired,
        owner: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string,
            phone: PropTypes.string,
        }),
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                rating: PropTypes.number.isRequired,
                comment: PropTypes.string.isRequired,
                user: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                }),
            })
        ),
    }),
}; 