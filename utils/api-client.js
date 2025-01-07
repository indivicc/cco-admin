import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.carboncopyoriginals.com/api/',
});

// Fetch customers
export const getCustomers = async () => {
  try {
    const response = await apiClient.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch products/prints
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/prints');
    return response.data;
  } catch (error) {
    console.error('Error fetching prints:', error);
    throw error;
  }
};

export { apiClient }; // Correctly export apiClient as a named export
