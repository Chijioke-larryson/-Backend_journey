import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from "../prismaClient.js";


const router = express.Router()



router.post('/register' ,  async (req, res) => {
    const {username, password} = req.body


    const hashedPassword =  bcrypt.hashSync(password, 8)

    try {
        const user = await prisma.user.create({
            date: {
                username,
                password: hashedPassword
            }
        })



        const defaultTodo = 'Hello :) Add your First Todo!'
        await prisma.todo.create({
            date: {
                task: defaultTodo,
                userId: user.id
            }
        })



        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token})


    }catch (err) {
        console.error('Register error:', err.message)
        if (err.message.includes('UNIQUE constraint failed: users.username')) {
            return res.status(400).json({ error: 'Username already exists. Please choose another one.' });
        }

        res.status(500).json({ error: 'Server error', details: err.message })
    }



})



router.post('/login',  async (req, res) => {
    const {username, password} = req.body

    try{

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })


        if (!user) {return res.status(404).send({message: 'user not found'})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)


        if (!passwordIsValid) {return res.status(401).send ({message: 'Invalid password'})}
        console.log(user)



        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token })





    }catch (err) {
        console.error('Login error:', err.message)
        res.status(500).json({ error: 'Server error', details: err.message })
    }



})


export default  router;