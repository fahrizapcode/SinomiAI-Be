import db from '../config/db.js';

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price VARCHAR(100) DEFAULT '0',
    image_url TEXT,
    location VARCHAR(255),
    whatsapp_number VARCHAR(50),
    status VARCHAR(50) DEFAULT 'tersedia',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

const createProductsTrigger = `
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'set_products_updated_at'
    ) THEN
      CREATE TRIGGER set_products_updated_at
        BEFORE UPDATE ON products
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
  END;
  $$
`;

export async function initProductModel() {
  try {
    await db.query(createProductsTable);
    await db.query(createProductsTrigger);
    console.log('Products table initialized');
  } catch (error) {
    console.error('Failed to initialize Products table:', error.message);
  }
}

export default {
  async findAll() {
    const { rows } = await db.query(`
      SELECT p.*, u.name AS seller_name
      FROM products p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    return rows;
  },

  async findById(id) {
    const { rows } = await db.query(`
      SELECT p.*, u.name AS seller_name
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = $1
    `, [id]);
    return rows;
  },

  async create({ user_id, name, description, category, price, image_url, location, whatsapp_number, status }) {
    const { rows } = await db.query(
      `INSERT INTO products (user_id, name, description, category, price, image_url, location, whatsapp_number, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [user_id, name, description, category, price, image_url, location, whatsapp_number, status || 'tersedia']
    );
    return rows[0];
  }
};
