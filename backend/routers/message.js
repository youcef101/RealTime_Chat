import express from 'express'
import Message from '../models/Message.js'
import Conversation from '../models/Conversation.js'
const router = express.Router()
router.get('/', (req, res) => {
    res.status(200).send('hello from message router !!!')
})
// add msg
router.post('/', async (req, res) => {
    let newMsg = {
        conversationID: req.body.conversationID,
        senderID: req.body.senderID,
        content: req.body.content
    }
    try {
        await Message.create(newMsg)
        res.status(200).send('message created successfully !!!')
    } catch (err) {
        res.status(500).send(err)
    }
})

//get conv msg
router.get('/:convID/conversation', async (req, res) => {
    try {
        let conv_msg = await Message.find({ conversationID: req.params.convID })
        res.status(200).send(conv_msg)
    } catch (err) {
        res.status(500).send(err)
    }

})
export default router