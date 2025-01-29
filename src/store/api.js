import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://backend-fz9h.onrender.com';

// Get all data
export const getAllData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/personal-info`);
    return response.data.response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Delete item by ID
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/personal-info/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// API to fetch data by ID
export const getDataById = (id) => {
  return axios.get(`${BASE_URL}/personal-info/${id}`);
};

// API to add new data
export const addData = (formData) => {
  return axios.post(`${BASE_URL}/personal-info`, formData);
};

// API to update existing data
export const updateData = (id, formData) => {
  return axios.put(`${BASE_URL}/personal-info/${id}`, formData);
};
