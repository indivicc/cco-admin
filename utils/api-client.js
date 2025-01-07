// Updated db.js to include POSTGRES_URL_NON_POOLING
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.POSTGRES_URL_NON_POOLING, // Ensure this environment variable is set
});

client.connect().catch((error) => {
  console.error('Failed to connect to the database:', error);
});

export default client;

// Updated api-client.js to handle data fetching
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

export default apiClient;
