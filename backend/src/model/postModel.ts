import { PostStatus } from "@prisma/client";
import prisma from "../database/prisma";

export const createPost = async (postData: any) => {
    const post = await prisma.post.create({
        data: postData
    })
    return post
}

export const allPost = async () => {
    const post = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    user_id: true,
                    name: true,      
                    email: true
                }
            }
        }
    })
    return post
}

export const postId = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {post_id: postId}
    })
    return post
}

export const postById = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {post_id: postId},
        include: {
            author: {
                select: {
                    user_id: true,
                    name: true,
                    image: true,        
                    email: true
                }
            }
        }
    })
    return post
}

export const updatePost = async (postId: string, title: string, content: string, exp_after: string, exp_real: string, image: any) => {
    const post = await prisma.post.update({
        where: {post_id: postId},
        data: {
            title: title,
            content: content,
            exp_after: exp_after,
            exp_real: exp_real,
            image: image
        }
    })
    return post
}

export const adminUpdatePost = async (postId: string, status: PostStatus, postNote: string, postStat: string, postImg: any) => {
    const post = await prisma.post.update({
        where: {post_id: postId},
        data: {
            status: status,
            post_note: postNote,
            post_stat: postStat,
            post_img: postImg
        }
    })
    return post
}

export const adminDeletePost = async (postId: string) => {
    const post = await prisma.post.delete({
        where: {post_id: postId}
    })
    return post
}