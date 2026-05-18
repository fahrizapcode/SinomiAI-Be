import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db.js';

const JWT_SECRET = 'sinomiai_super_secret_key_2026';

export const register = async (req, res) => {
    try {
        const { name, email, password, whatsapp_number, location } = req.body;
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ error: 'Email sudah terdaftar' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password_hash, whatsapp_number, location) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, whatsapp_number, location]
        );

        const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: result.insertId, name, email, whatsapp_number, location } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'Email atau password salah' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(400).json({ error: 'Email atau password salah' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, whatsapp_number: user.whatsapp_number, location: user.location } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const authMe = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, name, email, whatsapp_number, location FROM users WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ user: users[0] });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};