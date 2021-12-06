import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from users router !!!')
})

//register

router.post('/register', async (req, res) => {
    let salt = await bcrypt.genSalt(10);
    let hash_password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash_password,
        password_confirm: req.body.password_confirm,
        fullName: req.body.firstName + ' ' + req.body.lastName
    }

    let email = await User.findOne({ email: req.body.email });

    if (newUser.password.length < 8) {
        res.status(400).send('password must have at least 8 caracters !!!')
    }
    else if (req.body.password !== req.body.password_confirm) {
        res.status(400).send('password didn\'t match !!!')
    }
    else if (email) {
        res.status(400).send('you already have an account with this email !!!')
    }
    try {
        await User.create(newUser)
        res.status(200).send('Account created successfully !!!')
    } catch (err) {
        res.status(500).send(err)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const password = user.password
            const valid_password = await bcrypt.compare(req.body.password, password)
            !valid_password ? res.status(404).send('password is wrong !!!') : res.status(200).send(user)
        } else {
            res.status(404).send('user not found !!!')
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

export default router