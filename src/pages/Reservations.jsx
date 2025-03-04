import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reservationApi, propertyApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Reservations() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchReservations();
        }
    }, [user]);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const { data } = await reservationApi.getAll();
            setReservations(data);

            // Fetch property details for each reservation
            const propertyDetails = {};
            await Promise.all(
                data.map(async (reservation) => {
                    const { data: property } = await propertyApi.getById(reservation.propertyId);
                    propertyDetails[reservation.propertyId] = property;
                })
            );
            setProperties(propertyDetails);
            setError(null);
        } catch (err) {
            setError('Failed to load reservations');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            await reservationApi.cancel(reservationId);
            // Update the reservation status in the local state
            setReservations(prev =>
                prev.map(res =>
                    res.id === reservationId
                        ? { ...res, status: 'cancelled' }
                        : res
                )
            );
        } catch (err) {
            setError('Failed to cancel reservation');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Please log in to view your reservations.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        No Reservations Found
                    </h2>
                    <p className="text-gray-500 mb-6">
                        You haven't made any reservations yet.
                    </p>
                    <Link
                        to="/properties"
                        className="btn btn-primary"
                    >
                        Explore Properties
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                Your Reservations
            </h1>

            <div className="space-y-6">
                {reservations.map((reservation) => {
                    const property = properties[reservation.propertyId];
                    if (!property) return null;

                    return (
                        <div
                            key={reservation.id}
                            className="bg-white shadow rounded-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        <Link
                                            to={`/properties/${property.id}`}
                                            className="hover:text-primary-600"
                                        >
                                            {property.title}
                                        </Link>
                                    </h2>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                            reservation.status
                                        )}`}
                                    >
                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Check-in</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(reservation.startDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Check-out</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(reservation.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            ${reservation.totalPrice.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {reservation.paymentMethod.replace('_', ' ').charAt(0).toUpperCase() +
                                                reservation.paymentMethod.slice(1)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="text-sm text-gray-500">
                                        Reservation ID: {reservation.id}
                                    </div>
                                    <div className="space-x-4">
                                        <Link
                                            to={`/properties/${property.id}`}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            View Property
                                        </Link>
                                        {reservation.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancelReservation(reservation.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Cancel Reservation
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Reservations.propTypes = {
    reservations: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        propertyId: PropTypes.number.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        status: PropTypes.oneOf(['pending', 'confirmed', 'cancelled']).isRequired,
        paymentMethod: PropTypes.oneOf(['cash', 'cheque', 'bank_transfer']).isRequired,
        paymentStatus: PropTypes.oneOf(['pending', 'completed', 'failed']).isRequired,
    })),
    properties: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['apartment', 'bungalow']).isRequired,
    })),
}; 