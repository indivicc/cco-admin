// utils/db.js
import { createClient } from '@vercel/postgres';

export async function getVerifications() {
  const client = createClient();
  await client.connect();
  
  try {
    const { rows } = await client.query(
      'SELECT * FROM verifications ORDER BY unit_number DESC'
    );
    return rows;
  } finally {
    await client.end();
  }
}

export async function getProducts() {
  const client = createClient();
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT p.*, v.salt, v.unit_number 
      FROM products p
      LEFT JOIN verifications v ON p.verification_code = v.code
      ORDER BY p.sold_at DESC
    `);
    return rows;
  } finally {
    await client.end();
  }
}

export async function getCustomers() {
  const client = createClient();
  await client.connect();
  
  try {
    const { rows } = await client.query(`
      SELECT DISTINCT customer_id, 
             COUNT(*) as total_purchases,
             MAX(sold_at) as last_purchase
      FROM products 
      WHERE customer_id IS NOT NULL
      GROUP BY customer_id
      ORDER BY last_purchase DESC
    `);
    return rows;
  } finally {
    await client.end();
  }
}

export async function searchVerifications(query) {
  const client = createClient();
  await client.connect();
  
  try {
    const { rows } = await client.query(
      'SELECT * FROM verifications WHERE code ILIKE $1',
      [`%${query}%`]
    );
    return rows;
  } finally {
    await client.end();
  }
}