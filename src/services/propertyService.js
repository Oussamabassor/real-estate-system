import api from './config';

/**
 * @typedef {import('../types/api').Property} Property
 * @typedef {import('../types/api').PropertyCreateInput} PropertyCreateInput
 * @typedef {import('../types/api').ApiResponse} ApiResponse
 * @typedef {import('../types/api').PaginatedResponse} PaginatedResponse
 */

class PropertyService {
    /**
     * Get all properties with pagination
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise<PaginatedResponse<Property>>}
     */
    async getAll(page = 1, perPage = 10) {
        try {
            const response = await api.get('/properties', {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get a property by ID
     * @param {number} id - Property ID
     * @returns {Promise<ApiResponse<Property>>}
     */
    async getById(id) {
        try {
            const response = await api.get(`/properties/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Create a new property
     * @param {PropertyCreateInput} data - Property data
     * @returns {Promise<ApiResponse<Property>>}
     */
    async create(data) {
        try {
            const response = await api.post('/properties', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update a property
     * @param {number} id - Property ID
     * @param {Partial<PropertyCreateInput>} data - Updated property data
     * @returns {Promise<ApiResponse<Property>>}
     */
    async update(id, data) {
        try {
            const response = await api.put(`/properties/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a property
     * @param {number} id - Property ID
     * @returns {Promise<ApiResponse<void>>}
     */
    async delete(id) {
        try {
            const response = await api.delete(`/properties/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Search properties with filters
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<PaginatedResponse<Property>>}
     */
    async search(query, filters = {}) {
        try {
            const response = await api.get('/properties/search', {
                params: { q: query, ...filters }
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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return new Error(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            // The request was made but no response was received
            return new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            return new Error('Error setting up the request');
        }
    }
}

export const propertyService = new PropertyService(); 