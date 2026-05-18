import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import classifyRoutes from './routes/classifyRoutes.js';
import generateRoutes from './routes/generateRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/classify', classifyRoutes);
app.use('/api/generate', generateRoutes);

app.listen(port, () => {
  console.log(`SinomiAI Backend running on port ${port}`);
});

