import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext, ChatContext } from '../context/AuthContext'
import AddMessage from './AddMessage'
import Message from './Message'
import { io } from 'socket.io-client'


function ChatRoom() {
  const [convMsg, setConvMsg] = useState([])
  const { user } = useContext(AuthContext)
  const { currentChat } = useContext(ChatContext)
  const { setOnlineUsers } = useContext(ChatContext)
  const socket = useRef()
  const scrollRef = useRef()

  //*************socket implimentation***********

  useEffect(() => {
    socket.current = io('ws://localhost:8080')

  }, [])

  useEffect(() => {
    socket.current?.emit('addUser', user._id);
    socket.current.on('getUsers', users => {
      const res = user.followings.filter(userId => users.some(use => use.userID === userId))
      console.log(res)
      setOnlineUsers(res)
    })
  }, [user])



  /**************************************** */


  const getConvMsg = async () => {
    try {
      let res = await axiosInstance.get(`/message/${currentChat._id}/conversation`)
      let data = await res.data
      setConvMsg(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getConvMsg()
  }, [currentChat._id])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [convMsg])






  return (
    <Container>
      <MessageContainer >
        {convMsg &&
          convMsg.map((msg, index) =>
            <div key={Math.random()} ref={scrollRef}>
              <Message id='msg' msg={msg} />
            </div>
          )}

        <AddMessage getConv={getConvMsg} socket={socket.current} setConvMsg={setConvMsg} />

      </MessageContainer>
    </Container>
  )
}

export default ChatRoom
const Container = styled.div`
width:55%;
background-color:white;
height:100%;


`
const MessageContainer = styled.div`
width:100%;
height:500px;
overflow:scroll;
overflow-x: hidden;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: #b3b3b3;
  border-radius: 10px;
  
}

`
