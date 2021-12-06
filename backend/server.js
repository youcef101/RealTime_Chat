import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routers/auth.js'
import conversationRouter from './routers/conversation.js'
import messageRouter from './routers/message.js'
import userRouter from './routers/user.js'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config()
//app config
const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())


//db config

const connection_url = process.env.DB_CONNECTION_URL;
mongoose.connect(connection_url, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true,
});
mongoose.connection.once('open', () => {
    console.log('DB Connected !!!')
})

//api endpoints
app.get('/', (req, res) => {
    res.status(200).send('hello from backend !!!')
})

//router

app.use('/api/auth/', authRouter)
app.use('/api/conversation/', conversationRouter)
app.use('/api/message/', messageRouter)
app.use('/api/user/', userRouter)

//listen
app.listen(port, () => {
    console.log(`listen on localhost:${port}`)
})