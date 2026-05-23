import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { name, email, password, whatsapp_number, location } = req.body;
        const existing = await User.findByEmail(email);
        if (existing.length > 0) return res.status(400).json({ error: 'Email sudah terdaftar' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            whatsapp_number,
            location
        });

        const token = jwt.sign({ id: newUser.id, email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: newUser.id, name, email, whatsapp_number, location } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await User.findByEmail(email);
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
        const users = await User.findById(req.user.id, 'id, name, email, whatsapp_number, location');
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ user: users[0] });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};