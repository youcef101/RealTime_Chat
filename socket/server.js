import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { addUser, users, removeUser, getUser } from './utils/users.js'

//app config
const app = express()
const port = 8080 || process.env.PORT

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
})

app.get('/', (req, res) => {
    res.status(200).send('hello from socket server !!!')
})

io.on('connection', socket => {
    //open conversation
    console.log('user connected !!!')

    //user enter conversation
    socket.on('addUser', (userID) => {
        addUser(userID, socket.id)
        io.emit('getUsers', users)
    })
    //user receiving and sending messages
    socket.on('sendMsg', ({ senderID, receiverID, Msg }) => {
        const user = getUser(receiverID)

        io.to(user.socketID).emit('getMsg', {
            senderID,
            Msg
        })

        console.log(Msg)
        console.log(senderID)
        console.log(receiverID)
        console.log(user)

    })

    //user disconnected
    socket.on('disconnect', () => {
        console.log('user disconnected !!!')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})

//listen
httpServer.listen(port, () => {
    console.log(`server listening on :${port}`)
})
