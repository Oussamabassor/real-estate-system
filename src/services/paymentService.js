import api from './config';

/**
 * @typedef {import('../types/api').PaymentReceipt} PaymentReceipt
 * @typedef {import('../types/api').PaymentCreateInput} PaymentCreateInput
 * @typedef {import('../types/api').ApiResponse} ApiResponse
 */

class PaymentService {
    /**
     * Create a payment receipt
     * @param {PaymentCreateInput} data - Payment data
     * @returns {Promise<ApiResponse<PaymentReceipt>>}
     */
    async createReceipt(data) {
        try {
            const response = await api.post('/payments/receipts', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get a payment receipt by ID
     * @param {number} id - Receipt ID
     * @returns {Promise<ApiResponse<PaymentReceipt>>}
     */
    async getReceipt(id) {
        try {
            const response = await api.get(`/payments/receipts/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update payment status
     * @param {number} id - Receipt ID
     * @param {'pending'|'completed'|'failed'} status - New status
     * @returns {Promise<ApiResponse<PaymentReceipt>>}
     */
    async updateStatus(id, status) {
        try {
            const response = await api.put(`/payments/receipts/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get user's payment history
     * @param {number} userId - User ID
     * @returns {Promise<ApiResponse<PaymentReceipt[]>>}
     */
    async getUserPayments(userId) {
        try {
            const response = await api.get(`/users/${userId}/payments`);
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

export const paymentService = new PaymentService(); 