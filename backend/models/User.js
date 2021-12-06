import mongoose from 'mongoose'
const Userschema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true,

    },
    fullName: {
        type: String
    },

    email: {
        type: String,
        requir: true,
        unique: true
    },
    password: {
        type: String
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }

}, { timestamps: true })
export default mongoose.model('User', Userschema)