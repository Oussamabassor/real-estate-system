import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { propertyApi, reservationApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({
        startDate: '',
        endDate: '',
        paymentMethod: 'cash'
    });
    const [reservationError, setReservationError] = useState(null);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            setLoading(true);
            const { data } = await propertyApi.getById(id);
            setProperty(data);
            setError(null);
        } catch (err) {
            setError('Failed to load property details');
        } finally {
            setLoading(false);
        }
    };

    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservation(prev => ({ ...prev, [name]: value }));
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setReservationError(null);
            const { data } = await reservationApi.create({
                propertyId: id,
                ...reservation
            });
            setReservationSuccess(true);
            navigate('/reservations');
        } catch (err) {
            setReservationError('Failed to create reservation');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="text-center text-red-500">
                {error || 'Property not found'}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Property Images */}
                <div className="space-y-4">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-2">
                        {property.images.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${property.title} ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>

                {/* Property Details */}
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                        {property.title}
                    </h1>
                    <p className="text-2xl font-semibold text-primary-600 mb-4">
                        ${property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-6">
                        {property.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Location</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {property.location}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Bedrooms</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {property.bedrooms}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Bathrooms</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {property.bathrooms}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Area</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {property.area} m²
                            </p>
                        </div>
                        {property.type === 'apartment' && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Floor</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                    {property.floor} of {property.totalFloors}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Reservation Form */}
                    {property.available && (
                        <form onSubmit={handleReservationSubmit} className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Make a Reservation</h3>
                            {reservationError && (
                                <div className="text-red-500">{reservationError}</div>
                            )}
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={reservation.startDate}
                                    onChange={handleReservationChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={reservation.endDate}
                                    onChange={handleReservationChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                                    Payment Method
                                </label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={reservation.paymentMethod}
                                    onChange={handleReservationChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full btn btn-primary"
                            >
                                Reserve Now
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

PropertyDetails.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['apartment', 'bungalow']).isRequired,
        location: PropTypes.string.isRequired,
        bedrooms: PropTypes.number.isRequired,
        bathrooms: PropTypes.number.isRequired,
        area: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
        available: PropTypes.bool.isRequired,
        floor: PropTypes.number,
        totalFloors: PropTypes.number,
    }),
}; 