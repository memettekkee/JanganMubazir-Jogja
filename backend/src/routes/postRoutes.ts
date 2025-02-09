import express from 'express'
const router = express.Router();
import upload from '../middleware/upload';
import { createPostCtrl, getAllPostCtrl, getPostByIdCtrl, updatePostCtrl } from '../controller/postController';
import { bucketUpload } from '../utils/bucketUpload';

router.post('/', upload.single('image'), bucketUpload.uploadToBucket ,createPostCtrl)
router.put('/:post_id', upload.single('image'), bucketUpload.uploadToBucket ,updatePostCtrl)
router.put('/:post_id')
router.get('/', getAllPostCtrl)
router.get('/:post_id', getPostByIdCtrl)


export default router;