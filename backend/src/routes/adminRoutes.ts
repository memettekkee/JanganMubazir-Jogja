import express from 'express'
const router = express.Router();
import upload from '../middleware/upload';
import { adminDeletePostCtrl, adminDeleteUserCtrl, adminUpdatePostCtrl } from '../controller/adminController';

router.put('/post/:post_id', upload.none(), adminUpdatePostCtrl)
router.delete('/post/:post_id', adminDeletePostCtrl)
router.delete('/user/:user_id', adminDeleteUserCtrl)

export default router;