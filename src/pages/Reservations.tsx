import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Reservation, Property } from '../types';
import { reservationApi, propertyApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Reservations() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [properties, setProperties] = useState<Record<number, Property>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const { data } = await reservationApi.getAll();
                setReservations(data);

                // Fetch property details for each reservation
                const propertyIds = [...new Set(data.map(r => r.propertyId))];
                const propertyPromises = propertyIds.map(id => propertyApi.getById(id));
                const propertyResponses = await Promise.all(propertyPromises);

                const propertyMap: Record<number, Property> = {};
                propertyResponses.forEach(response => {
                    propertyMap[response.data.id] = response.data;
                });

                setProperties(propertyMap);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setError('Failed to load reservations');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const handleCancelReservation = async (reservationId: number) => {
        try {
            await reservationApi.cancel(reservationId);
            setReservations(reservations.map(r =>
                r.id === reservationId ? { ...r, status: 'cancelled' } : r
            ));
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            setError('Failed to cancel reservation');
        }
    };

    const getStatusColor = (status: Reservation['status']) => {
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
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Please sign in to view your reservations
                </h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    No reservations found
                </h2>
                <p className="text-gray-500 mb-6">
                    Start exploring our properties to make your first reservation
                </p>
                <Link
                    to="/properties"
                    className="btn btn-primary"
                >
                    Browse Properties
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Reservations</h1>

            <div className="grid gap-6">
                {reservations.map((reservation) => {
                    const property = properties[reservation.propertyId];
                    if (!property) return null;

                    return (
                        <div
                            key={reservation.id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                            {property.title}
                                        </h2>
                                        <p className="text-gray-500 mb-4">
                                            {new Date(reservation.startDate).toLocaleDateString()} -{' '}
                                            {new Date(reservation.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                            reservation.status
                                        )}`}
                                    >
                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div>
                                        <span className="text-sm text-gray-500">Total Price</span>
                                        <p className="text-lg font-semibold">
                                            ${reservation.totalPrice}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Payment Method</span>
                                        <p className="text-lg font-semibold capitalize">
                                            {reservation.paymentMethod.replace('_', ' ')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Payment Status</span>
                                        <p className="text-lg font-semibold capitalize">
                                            {reservation.paymentStatus.replace('_', ' ')}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Reservation ID</span>
                                        <p className="text-lg font-semibold">#{reservation.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        to={`/properties/${property.id}`}
                                        className="text-primary-600 hover:text-primary-700 font-medium"
                                    >
                                        View Property Details →
                                    </Link>
                                    {reservation.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancelReservation(reservation.id)}
                                            className="btn btn-secondary"
                                        >
                                            Cancel Reservation
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 