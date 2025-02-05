import express from 'express'

const registerCtrl = async (
    req : express.Request,
    res : express.Response
) => {
    const { name, email, password } = req.body
    
}

export default { registerCtrl }