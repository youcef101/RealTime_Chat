import express from 'express'
import Conversation from '../models/Conversation.js'
const router = express.Router()
router.get('/', (req, res) => {
    res.status(200).send('hello from conversation router !!!')
})
//new conversation
router.post('/', async (req, res) => {
    let conversation = {
        members: [req.body.senderID, req.body.receiverID]
    }
    try {
        await Conversation.create(conversation)
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).send(err)
    }
})

//get user conversation
router.get('/:userID', async (req, res) => {
    try {
        const user_conversations = await Conversation.find({ members: { $in: [req.params.userID] } })
        res.status(200).send(user_conversations)
    } catch (err) {
        res.status(500).send(err)
    }

})

//get conversation contains two userId
router.get('/:firstUserId/:seconUserId', async (req, res) => {
    try {
        const conv = await Conversation.findOne({ members: { $all: [req.params.firstUserId, req.params.seconUserId] } })
        res.status(200).send(conv)
    } catch (err) {
        res.status(500).send(err)
    }
})

export default router