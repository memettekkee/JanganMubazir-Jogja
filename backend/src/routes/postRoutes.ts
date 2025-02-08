import express from 'express'
const router = express.Router();
import upload from '../middleware/upload';
import { createPostCtrl, getAllPostCtrl, getPostByIdCtrl, updatePostCtrl } from '../controller/postController';

router.post('/', upload.none(), createPostCtrl)
router.put('/:post_id', upload.none(), updatePostCtrl)
router.put('/:post_id')
router.get('/', getAllPostCtrl)
router.get('/:post_id', getPostByIdCtrl)


export default router;