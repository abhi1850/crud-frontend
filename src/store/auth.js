import axios from 'axios';

const BASE_URL = 'https://backend-fz9h.onrender.com';
// const BASE_URL = 'http://localhost:5000'; //Test

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data; // Assuming the API returns { message: '', success: true/false }
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const register = async (
  username,
  password,
  email,
  phoneNumber,
  isAdminUser,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
      email,
      phoneNumber,
      isAdminUser,
    });

    return response.data; // Assuming the API returns { message: '', success: true/false }
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
