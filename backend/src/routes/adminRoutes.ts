import express from 'express'
const router = express.Router();
import upload from '../middleware/upload';
import { adminDeletePostCtrl, adminDeleteUserCtrl, adminUpdatePostCtrl } from '../controller/adminController';
import { bucketUpload } from '../utils/bucketUpload';

router.put('/post/:post_id', upload.single('post_img'), bucketUpload.uploadToBucket ,adminUpdatePostCtrl)
router.delete('/post/:post_id', adminDeletePostCtrl)
router.delete('/user/:user_id', adminDeleteUserCtrl)

export default router;