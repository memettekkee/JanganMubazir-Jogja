import express from 'express'
const router = express.Router();
import upload from '../middleware/upload';
import { getAllUserCtrl, getUserByIdCtrl, loginCtrl, registerCtrl } from '../controller/userController';

router.post('/register', upload.none(), registerCtrl)
router.post('/login', upload.none(), loginCtrl)
router.get('/profile/:user_id', getUserByIdCtrl)
router.get('/user', getAllUserCtrl)

export default router;