var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
// Load environment variables (jika pakai dotenv)
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
// Simple route
app.get('/', (req, res) => {
    res.send('Hello from TypeScript + Express + Prisma!');
});
// Contoh route: GET semua user
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
// Contoh route: POST buat user baru
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: { email, name },
        });
        res.json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating user.' });
    }
}));
// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
