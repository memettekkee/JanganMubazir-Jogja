import express from 'express'
import { allPost, createPost, postById, postId, updatePost } from '../model/postModel'
import { MulterGoogleCloudFile } from '../utils/bucketUpload'

export const createPostCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { title, content, exp_after, exp_real ,authorId } = req.body
    const file = req.file as MulterGoogleCloudFile
    const image = file?.cloudStoragePublicUrl;

    if (!title && !content && !authorId && !exp_after && !exp_real) {
        res.status(400).json({
            error: true,
            message: "Harap diisi !"
        })
        return
    }

    const postData = {
        title: title,
        content: content,
        exp_after: exp_after,
        exp_real: exp_real,
        image: image,
        authorId: authorId
    }

    try {
        await createPost(postData)

        res.status(200).json({
            error: false,
            message: "postingan berhasil dibuat",
            post: postData
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}

export const getAllPostCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const post = await allPost()

        if (!post) {
            res.status(400).json({
                error: true,
                message: "User tidak ada !"
            })
            return;
        }

        res.status(200).json({
            error: false,
            message: "Post ada !",
            allposts: post
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}

export const getPostByIdCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { post_id } = req.params

    try {
        const checkPost = await postById(post_id)

        if (!checkPost) {
            res.status(400).json({
                error: true,
                message: "Post tidak ada !"
            })
            return;
        }

        res.status(200).json({
            error: false,
            message: "Post ada !",
            post_detail: checkPost
        })
        return

    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}

export const updatePostCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { post_id } = req.params
    const { title, content, exp_after, exp_real ,authorId } = req.body
    const file = req.file as MulterGoogleCloudFile
    const image = file?.cloudStoragePublicUrl;

    const checkUser = await postId(post_id)

    if (authorId != checkUser?.authorId) {
        res.status(400).json({
            error: true,
            message: "Tidak bisa diubah, bukan post anda !"
        })
        return;
    }

    try {
        const UpdatedData = await updatePost(post_id, title, content, exp_after, exp_real, image)

        res.status(200).json({
            error: false,
            message: "Postingan diperbarui !",
            updated_post: UpdatedData
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}