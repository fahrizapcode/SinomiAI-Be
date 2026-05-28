import express from 'express';
import cors from 'cors';
import { initUserModel } from './models/User.js';
import { initProductModel } from './models/Product.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import generateRoutes from './routes/generateRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/generate', generateRoutes);

async function startServer() {
  await initUserModel();
  await initProductModel();

  app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
  });
}

startServer();
