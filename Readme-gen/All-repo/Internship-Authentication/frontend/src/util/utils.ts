// utils/axiosUtil.ts
import axios from 'axios';

// Set up a default axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function to send requests with different methods
export const sendRequest = async (method: 'get' | 'post' | 'put' | 'patch', url: string, data: object = {}) => {
  try {
    const response = await api({
      method,  
      url,     
      data,  
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error(error);
    }
  }
};
