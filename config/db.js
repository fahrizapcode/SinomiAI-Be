import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()')
  .then(() => console.log('Connected to Supabase PostgreSQL'))
  .catch((err) => console.error('Database connection failed:', err.message));

export default pool;
