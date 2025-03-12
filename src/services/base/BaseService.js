import api from '../config/api.config';

/**
 * Base service class with common CRUD operations
 */
export default class BaseService {
    /**
     * @param {string} resourcePath - API resource path
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
            throw this._handleError(error);
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
            throw this._handleError(error);
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
            throw this._handleError(error);
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
            throw this._handleError(error);
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
            throw this._handleError(error);
        }
    }

    /**
     * Handle API errors
     * @private
     * @param {Error} error - Error object
     * @returns {Error}
     */
    _handleError(error) {
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