import express from 'express'
import bcrypt from 'bcrypt'
import { allUser, existingUser, registerUser, userById } from '../model/userModel';

export const registerCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, email, password } = req.body;
    let hashedPass = await bcrypt.hashSync(password, 10);

    const checkUser = await existingUser(email)

    if (checkUser) {
        res.status(400).json({
            error: true,
            message: "Email sudah terdaftar"
        })
        return
    }

    const userData = {
        name: name,
        email: email,
        password: hashedPass
    }

    try {
        await registerUser(userData)

        res.status(200).json({
            error: false,
            message: "Akun berhasil dibuat",
            user: userData
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e
        })
        return
    }
}

export const loginCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { email, password } = req.body

    try {
        const checkUser = await existingUser(email)

        if (!checkUser) {
            res.status(400).json({
                error: true,
                message: "Akun tidak ada !"
            })
            return;
        }

        const validPassword = await bcrypt.compare(password, checkUser?.password)
        if (!validPassword) {
            res.status(400).json({
                error: true,
                message: "email atau password salah"
            })
            return
        }

        res.status(200).json({
            error: false,
            message: "Login berhasil",
            user: checkUser
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e
        })
        return
    }
}

export const getUserByIdCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { user_id } = req.params

    try {
        const checkUser = await userById(user_id)

        if (!checkUser) {
            res.status(400).json({
                error: true,
                message: "User tidak ada !"
            })
            return;
        }

        res.status(200).json({
            error: false,
            message: "User ada !",
            user: checkUser
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

export const getAllUserCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const user = await allUser()

        if (!user) {
            res.status(400).json({
                error: true,
                message: "User tidak ada !"
            })
            return;
        }

        res.status(200).json({
            error: false,
            message: "User ada !",
            allusers: user
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
