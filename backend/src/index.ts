import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import adminRoutes from './routes/adminRoutes'

// Load environment variables (jika pakai dotenv)
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true }));

app.use('/', userRoutes)
app.use('/post', postRoutes)
app.use('/admin', adminRoutes)

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
