import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext, ChatContext } from '../context/AuthContext'


function AddMessage({ getConv, socket }) {

    const { user } = useContext(AuthContext)
    const { currentChat } = useContext(ChatContext)
    const messageRef = useRef()
    const [message, setMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    console.log(arrivalMessage)

    useEffect(() => {

        socket?.on('getMsg', (data) => {
            console.log(data.senderID)
            console.log(data.Msg)
            setArrivalMessage({
                senderID: data.senderID,
                content: data.Msg,
                createdAt: Date.now()
            })
        })

    }, [socket])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.senderID) &&
            getConv()
    }, [arrivalMessage, currentChat]);



    const AddMsg = async (e) => {
        e.preventDefault()
        let newMsg = {
            conversationID: currentChat._id,
            senderID: user._id,
            content: messageRef.current.value
        }

        let receiverID = currentChat.members.find(userID => userID !== user._id)
        socket?.emit('sendMsg', {
            senderID: user._id,
            receiverID,
            Msg: messageRef.current.value,

        })
        try {
            await axiosInstance.post('/message/', newMsg);
            getConv()
            setMessage('')
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <Container>
            <MessageContainer>
                <Message>
                    <MessageInput ref={messageRef} value={message} name="message" onChange={(e) => setMessage(e.target.value)} placeholder="add new message ..." />
                    <SendMsgBtn onClick={AddMsg}>
                        SEND
                    </SendMsgBtn>
                </Message>


            </MessageContainer>

        </Container>
    )
}

export default AddMessage
const Container = styled.div`
margin-top:30px;
padding:10px 10px;
`
const MessageContainer = styled.div`
display:flex;
//max-width:50%;

`
const Message = styled.div`
flex-grow:1;
margin-right:-140px;
display:flex;

`
const MessageInput = styled.input`
width:60%;
max-height:50px;
min-height:50px;
//flex-grow:1;
:focus{
    outline:none;
}

`
const FileUploadsIc = styled.div``
const SendMsgBtn = styled.div`

margin-right:50px;
height:55px;
width:10%;
z-index:1;
background-color:#e60073;
color:white;
font-weight:500;
display:flex;
justify-content:center;
align-items:center;
//border-radius:5px;
cursor:pointer;
:hover{
    background-color: #ff1a8c;
}
`
