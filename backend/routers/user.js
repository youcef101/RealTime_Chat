import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from user router !!!')
})

//edit user
router.put('/:userID/edit', async (req, res) => {

    if (req.body.userID === req.params.userID) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                res.status(500).send(err)
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.userID, { $set: req.body })
            res.status(200).send('your account updated successfully !!!')
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(404).send('you can edit only your account !!!')
    }

})

//delete user

router.delete('/:userID/delete', async (req, res) => {
    try {
        if (req.body.userID === req.params.userID) {
            await User.findByIdAndDelete(req.params.userID)
            res.status(200).send('user deleted successfully !!!')
        } else {
            res.status(403).send('you can delete only your account !!!')
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

//get user by id

router.get('/:userID', async (req, res) => {
    try {
        const user = await User.findById(req.params.userID)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//get all users

router.get('/all/d', async (req, res) => {
    try {
        let all_users = await User.find();
        res.status(200).send(all_users)

    } catch (err) {
        res.status(500).send(err)
    }
})

//follow user

router.put('/follows/:userID', async (req, res) => {
    if (req.body.userID !== req.params.userID) {
        try {
            const user = await User.findById(req.params.userID)
            const current_user = await User.findById(req.body.userID)
            if (!user.followers.includes(req.body.userID)) {
                await current_user.updateOne({ $push: { followings: req.params.userID } })
                await user.updateOne({ $push: { followers: req.body.userID } })
                res.status(200).send(`user has been followed !!!`)
            } else {
                res.status(403).send('you already follows this user !!!')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(403).send('you can\'t follow yourself !!! ')
    }

})

//unfollow user

router.put('/unfollows/:userID', async (req, res) => {
    if (req.body.userID !== req.params.userID) {
        try {
            const user = await User.findById(req.params.userID)
            const current_user = await User.findById(req.body.userID)
            if (user.followers.includes(req.body.userID)) {
                await current_user.updateOne({ $pull: { followings: req.params.userID } })
                await user.updateOne({ $pull: { followers: req.body.userID } })
                res.status(200).send(`user has been unfollowed !!!`)
            } else {
                res.status(403).send('you already unfollows this user !!!')
            }
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.status(403).send('you can\'t unfollow yourself !!! ')
    }

})

//get user followings(freinds)
router.get('/freinds/:userID/all', async (req, res) => {
    try {
        const current_user = await User.findById(req.params.userID)
        const freindList = []

        const freinds = await Promise.all(
            current_user.followings.map(freindId => {
                return User.findById(freindId)
            }));
        freinds.map(freind => {
            const { _id, fullName } = freind;
            freindList.push({ _id, fullName })
        });

        res.status(200).send(freindList)
    } catch (err) {
        res.status(500).send(err)
    }

})

//get user followers

export default router