// Updated db.js to include POSTGRES_URL_NON_POOLING
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.POSTGRES_URL_NON_POOLING, // Ensure this environment variable is set
});

client.connect().catch((error) => {
  console.error('Failed to connect to the database:', error);
});

export default client;
