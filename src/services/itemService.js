import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const itemService = {
  // Create item
  createItem: async (itemData) => {
    try {
      const response = await axios.post(API_URL, itemData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Get all items
  getItems: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Get single item
  getItem: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update item
  updateItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};