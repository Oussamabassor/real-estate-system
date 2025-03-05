import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reservationApi, propertyApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import {
    CalendarDaysIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    BuildingOfficeIcon,
    CurrencyDollarIcon,
    FunnelIcon,
    ArrowPathIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
};

const STATUS_ICONS = {
    pending: ClockIcon,
    confirmed: CheckCircleIcon,
    cancelled: XCircleIcon,
    completed: CheckCircleIcon
};

export default function Reservations() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('date_desc');

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

    const filteredReservations = reservations
        .filter(reservation => {
            if (activeFilter === 'all') return true;
            return reservation.status === activeFilter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date_asc':
                    return new Date(a.startDate) - new Date(b.startDate);
                case 'date_desc':
                    return new Date(b.startDate) - new Date(a.startDate);
                case 'price_asc':
                    return a.totalPrice - b.totalPrice;
                case 'price_desc':
                    return b.totalPrice - a.totalPrice;
                default:
                    return 0;
            }
        });

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
                <div className="loading-spinner h-12 w-12"></div>
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                My Reservations
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                {filteredReservations.length} reservations found
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="btn btn-secondary inline-flex items-center"
                            >
                                <FunnelIcon className="h-5 w-5 mr-2" />
                                Filters
                            </button>
                            <button
                                onClick={fetchReservations}
                                className="btn btn-secondary inline-flex items-center"
                            >
                                <ArrowPathIcon className="h-5 w-5 mr-2" />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className={`mt-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setActiveFilter('confirmed')}
                                    className={`btn ${activeFilter === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    Confirmed
                                </button>
                                <button
                                    onClick={() => setActiveFilter('pending')}
                                    className={`btn ${activeFilter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => setActiveFilter('cancelled')}
                                    className={`btn ${activeFilter === 'cancelled' ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    Cancelled
                                </button>
                                <button
                                    onClick={() => setActiveFilter('completed')}
                                    className={`btn ${activeFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    Completed
                                </button>
                            </div>
                            <div className="mt-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="date_desc">Date: Newest First</option>
                                    <option value="date_asc">Date: Oldest First</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="price_asc">Price: Low to High</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error ? (
                    <div className="text-center text-red-500">
                        <XCircleIcon className="mx-auto h-12 w-12" />
                        <h3 className="mt-2 text-sm font-medium">{error}</h3>
                    </div>
                ) : filteredReservations.length === 0 ? (
                    <div className="text-center">
                        <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {activeFilter === 'all'
                                ? "You haven't made any reservations yet."
                                : "No reservations match the selected filter."}
                        </p>
                        <div className="mt-6">
                            <Link to="/properties" className="btn btn-primary">
                                Browse Properties
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredReservations.map((reservation, index) => {
                            const property = properties[reservation.propertyId];
                            if (!property) return null;

                            const StatusIcon = STATUS_ICONS[reservation.status];
                            return (
                                <div
                                    key={reservation.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={property.images[0]}
                                                        alt={property.title}
                                                        className="h-16 w-16 rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {property.title}
                                                    </h3>
                                                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                                        <CalendarDaysIcon className="h-5 w-5" />
                                                        <span>
                                                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right">
                                                    <div className="flex items-center space-x-2">
                                                        <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            ${reservation.totalPrice.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[reservation.status]}`}>
                                                        <StatusIcon className="h-4 w-4 mr-1" />
                                                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/properties/${property.id}`}
                                                    className="btn btn-secondary"
                                                >
                                                    View Property
                                                    <ChevronRightIcon className="h-5 w-5 ml-2" />
                                                </Link>
                                                {reservation.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleCancelReservation(reservation.id)}
                                                        className="btn btn-danger"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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