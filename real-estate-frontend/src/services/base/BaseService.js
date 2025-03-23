import api from '../config/api.config';

/**
 * Base service class for making API requests
 */
export default class BaseService {
    /**
     * @param {string} resourcePath - Base path for the API resource
     */
    constructor(resourcePath) {
        this.resourcePath = resourcePath;
        this.api = api;
    }

    /**
     * Get all resources with pagination
     * @param {Object} params - Query parameters
     * @returns {Promise<import('../types').PaginatedResponse>}
     */
    async getAll(params = { page: 1, per_page: 10 }) {
        try {
            const response = await this.api.get(this.resourcePath, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get a resource by ID
     * @param {number|string} id - Resource ID
     * @returns {Promise<import('../types').ApiResponse>}
     */
    async getById(id) {
        try {
            const response = await this.api.get(`${this.resourcePath}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Create a new resource
     * @param {Object} data - Resource data
     * @returns {Promise<import('../types').ApiResponse>}
     */
    async create(data) {
        try {
            const response = await this.api.post(this.resourcePath, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update a resource
     * @param {number|string} id - Resource ID
     * @param {Object} data - Updated resource data
     * @returns {Promise<import('../types').ApiResponse>}
     */
    async update(id, data) {
        try {
            const response = await this.api.put(`${this.resourcePath}/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a resource
     * @param {number|string} id - Resource ID
     * @returns {Promise<import('../types').ApiResponse>}
     */
    async delete(id) {
        try {
            const response = await this.api.delete(`${this.resourcePath}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Common error handler for API requests
     * @param {Error} error - Error object from API request
     * @returns {Error} Standardized error object
     */
    handleError(error) {
        // If it's a network error or the server is not responding
        if (!error.response) {
            return new Error('Network error - Please check your connection and try again');
        }

        // If we got a response with an error status
        const message = error.response.data?.message || 'An unexpected error occurred';
        const customError = new Error(message);
        customError.status = error.response.status;
        customError.details = error.response.data?.errors || {};
        
        return customError;
    }
}