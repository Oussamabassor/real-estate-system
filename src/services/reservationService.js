import api from './config';

/**
 * @typedef {import('../types/api').Reservation} Reservation
 * @typedef {import('../types/api').ReservationCreateInput} ReservationCreateInput
 * @typedef {import('../types/api').ApiResponse} ApiResponse
 * @typedef {import('../types/api').PaginatedResponse} PaginatedResponse
 */

class ReservationService {
    /**
     * Get all reservations with pagination
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise<PaginatedResponse<Reservation>>}
     */
    async getAll(page = 1, perPage = 10) {
        try {
            const response = await api.get('/reservations', {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get a reservation by ID
     * @param {number} id - Reservation ID
     * @returns {Promise<ApiResponse<Reservation>>}
     */
    async getById(id) {
        try {
            const response = await api.get(`/reservations/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Create a new reservation
     * @param {ReservationCreateInput} data - Reservation data
     * @returns {Promise<ApiResponse<Reservation>>}
     */
    async create(data) {
        try {
            const response = await api.post('/reservations', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update a reservation
     * @param {number} id - Reservation ID
     * @param {Partial<ReservationCreateInput>} data - Updated reservation data
     * @returns {Promise<ApiResponse<Reservation>>}
     */
    async update(id, data) {
        try {
            const response = await api.put(`/reservations/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Cancel a reservation
     * @param {number} id - Reservation ID
     * @returns {Promise<ApiResponse<Reservation>>}
     */
    async cancel(id) {
        try {
            const response = await api.post(`/reservations/${id}/cancel`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get user's reservations
     * @param {number} userId - User ID
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise<PaginatedResponse<Reservation>>}
     */
    async getUserReservations(userId, page = 1, perPage = 10) {
        try {
            const response = await api.get(`/users/${userId}/reservations`, {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Handle API errors
     * @private
     * @param {Error} error - Error object
     * @returns {Error}
     */
    handleError(error) {
        if (error.response) {
            return new Error(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            return new Error('No response received from server');
        } else {
            return new Error('Error setting up the request');
        }
    }
}

export const reservationService = new ReservationService(); 