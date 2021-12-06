import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
    conversationID: {
        type: String
    },
    senderID: {
        type: String
    },
    content: {
        type: String
    }
}, { timestamps: true })
export default mongoose.model('Message', messageSchema)