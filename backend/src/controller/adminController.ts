import express from 'express'
import { adminDeletePost, adminUpdatePost } from '../model/postModel'
import { adminDeleteUser } from '../model/userModel'

export const adminUpdatePostCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { post_id } = req.params
    const { status, post_note, post_stat } = req.body

    if (!post_note && !post_stat) {
        res.status(400).json({
            error: true,
            message: "Keterangannya harap diisi !"
        })
        return
    }

    try {
        const updatedData = await adminUpdatePost(post_id, status, post_note, post_stat)

        res.status(200).json({
            error: false,
            message: "Keterangan postingan ditambahkan !",
            admin: updatedData
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

export const adminDeletePostCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { post_id } = req.params

    try {
        await adminDeletePost(post_id)

        res.status(200).json({
            error: false,
            message: "Postingan berhasil dihapus !",
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

export const adminDeleteUserCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { user_id } = req.params

    try {
        await adminDeleteUser(user_id)

        res.status(200).json({
            error: false,
            message: "User berhasil dihapus !",
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