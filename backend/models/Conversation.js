import mongoose from 'mongoose'
const conversationSchema = mongoose.Schema({
    members: {
        type: Array,
        default: []
    }
}, { timestamps: true })
export default mongoose.model('Conversation', conversationSchema)