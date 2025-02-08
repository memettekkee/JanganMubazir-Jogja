import prisma from "../database/prisma";

export const registerUser = async (userData: any) => {
    const user = await prisma.user.create({ 
        data: userData 
    })

    return user
}

export const existingUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    return user
}

export const userById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {user_id: userId}
    })
    return user
}

export const allUser = async () => {
    const user = await prisma.user.findMany()
    return user
}

export const adminDeleteUser = async (userId: string) => {
    const user = await prisma.user.delete({
        where: {user_id: userId}
    })
    return user
}