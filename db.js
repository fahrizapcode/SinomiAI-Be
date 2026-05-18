import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'BlueIce344.',
  database: 'sinomiai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'BlueIce344.'
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS sinomiai');
    await connection.end();

    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        whatsapp_number VARCHAR(50) NOT NULL,
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    const productsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        price VARCHAR(100) DEFAULT '0',
        image_url LONGTEXT,
        location VARCHAR(255),
        whatsapp_number VARCHAR(50),
        status VARCHAR(50) DEFAULT 'tersedia',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await pool.query(usersTable);
    await pool.query(productsTable);
    
    // Pastikan kolom image_url sudah LONGTEXT jika tabel sudah telanjur dibuat dengan TEXT
    try {
      await pool.query('ALTER TABLE products MODIFY COLUMN image_url LONGTEXT');
    } catch (e) {
      // Abaikan error jika alter table gagal
    }

    console.log('Database and tables initialized.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initDB();

export default pool;
