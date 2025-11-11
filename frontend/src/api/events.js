import api from './config';

export const eventsAPI = {
  // Get all events with filters
  getEvents: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to query params
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/events?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch events' };
    }
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch event details' };
    }
  },

  // Create new event (admin only)
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create event' };
    }
  },

  // Update event (admin only)
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update event' };
    }
  },

  // Delete event (admin only)
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete event' };
    }
  },

  // Register for event
  registerForEvent: async (eventId, registrationData) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, registrationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register for event' };
    }
  },

  // Get user's registered events
  getUserRegistrations: async () => {
    try {
      const response = await api.get('/events/registrations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch registrations' };
    }
  }
};