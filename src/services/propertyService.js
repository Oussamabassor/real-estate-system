import BaseService from './base/BaseService';

/**
 * @typedef {import('../types/api').Property} Property
 * @typedef {import('../types/api').PropertyCreateInput} PropertyCreateInput
 * @typedef {import('../types/api').ApiResponse} ApiResponse
 * @typedef {import('../types/api').PaginatedResponse} PaginatedResponse
 */

/**
 * Service for managing properties
 * @extends BaseService
 */
class PropertyService extends BaseService {
    constructor() {
        super('/properties');
    }

    /**
     * Get all properties with pagination
     * @param {number} page - Page number
     * @param {number} perPage - Items per page
     * @returns {Promise<PaginatedResponse<Property>>}
     */
    async getAll(page = 1, perPage = 10) {
        try {
            const response = await this.api.get('/properties', {
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
            const response = await this.api.get(`${this.resourcePath}/${id}`);
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
            const response = await this.api.post('/properties', data);
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
            const response = await this.api.put(`${this.resourcePath}/${id}`, data);
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
            const response = await this.api.delete(`${this.resourcePath}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Search properties with filters
     * @param {Object} params - Search parameters
     * @param {string} [params.query] - Search query
     * @param {string} [params.type] - Property type
     * @param {number} [params.min_price] - Minimum price
     * @param {number} [params.max_price] - Maximum price
     * @param {number} [params.min_bedrooms] - Minimum number of bedrooms
     * @param {number} [params.min_bathrooms] - Minimum number of bathrooms
     * @param {number} [params.min_area] - Minimum area
     * @param {number} [params.max_area] - Maximum area
     * @param {string} [params.status] - Property status
     * @param {number} [params.page=1] - Page number
     * @param {number} [params.per_page=10] - Items per page
     * @returns {Promise<import('./types').PaginatedResponse>}
     */
    async search(params = {}) {
        try {
            const response = await this.api.get(`${this.resourcePath}/search`, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get featured properties
     * @param {number} [limit=6] - Number of properties to return
     * @returns {Promise<import('./types').ApiResponse>}
     */
    async getFeatured(limit = 6) {
        try {
            const response = await this.api.get(`${this.resourcePath}/featured`, {
                params: { limit }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get similar properties
     * @param {number} propertyId - Property ID
     * @param {number} [limit=3] - Number of properties to return
     * @returns {Promise<import('./types').ApiResponse>}
     */
    async getSimilar(propertyId, limit = 3) {
        try {
            const response = await this.api.get(`${this.resourcePath}/${propertyId}/similar`, {
                params: { limit }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Upload property images
     * @param {number} propertyId - Property ID
     * @param {FormData} formData - Form data containing images
     * @returns {Promise<import('./types').ApiResponse>}
     */
    async uploadImages(propertyId, formData) {
        try {
            const response = await this.api.post(
                `${this.resourcePath}/${propertyId}/images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a property image
     * @param {number} propertyId - Property ID
     * @param {string} imageId - Image ID
     * @returns {Promise<import('./types').ApiResponse>}
     */
    async deleteImage(propertyId, imageId) {
        try {
            const response = await this.api.delete(
                `${this.resourcePath}/${propertyId}/images/${imageId}`
            );
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

// Create a singleton instance
export const propertyService = new PropertyService(); 