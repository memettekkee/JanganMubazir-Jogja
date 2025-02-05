import express, { Router } from 'express'
const router = express.Router();
import upload from '../middleware/upload';

router.post('/register', upload.none(), )

export default router;