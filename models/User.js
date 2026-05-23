import db from '../config/db.js';

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    whatsapp_number VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

const createUpdateTriggerFunction = `
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql
`;

const createUsersTrigger = `
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'set_users_updated_at'
    ) THEN
      CREATE TRIGGER set_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
  END;
  $$
`;

export async function initUserModel() {
  try {
    await db.query(createUpdateTriggerFunction);
    await db.query(createUsersTable);
    await db.query(createUsersTrigger);
    console.log('Users table initialized');
  } catch (error) {
    console.error('Failed to initialize Users table:', error.message);
  }
}

export default {
  async findByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows;
  },

  async findById(id, columns = '*') {
    const { rows } = await db.query(
      `SELECT ${columns} FROM users WHERE id = $1`,
      [id]
    );
    return rows;
  },

  async create({ name, email, password_hash, whatsapp_number, location }) {
    const { rows } = await db.query(
      `INSERT INTO users (name, email, password_hash, whatsapp_number, location)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, password_hash, whatsapp_number, location]
    );
    return rows[0];
  }
};
