import db from '../db.js';

export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, u.name as seller_name 
      FROM products p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, u.name as seller_name
      FROM products p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.id = ?
    `, [req.params.id]);

    if (products.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(products[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, location, whatsapp_number, status } = req.body;

    let image_url = null;
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      image_url = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    const [result] = await db.query(
      'INSERT INTO products (user_id, name, description, category, price, image_url, location, whatsapp_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, description, category, price, image_url, location, whatsapp_number, status || 'tersedia']
    );

    res.json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};