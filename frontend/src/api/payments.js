import api from './config';

export const paymentsAPI = {
  // Create payment order
  createOrder: async (paymentData) => {
    try {
      const response = await api.post('/payments/create-order', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create payment order' };
    }
  },

  // Verify payment
  verifyPayment: async (paymentVerificationData) => {
    try {
      const response = await api.post('/payments/verify-payment', paymentVerificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Payment verification failed' };
    }
  },

  // Get payment status
  getPaymentStatus: async (orderId) => {
    try {
      const response = await api.get(`/payments/status/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payment status' };
    }
  },

  // Get user's payment history
  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch payment history' };
    }
  }
};