import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext, ChatContext } from '../context/AuthContext'
import ConversationItem from './ConversationItem'

function Chat() {

  const { user } = useContext(AuthContext)
  const { setCurrentChat } = useContext(ChatContext)
  const [convs, setConvs] = useState('')

  useEffect(() => {
    const getUserConversations = async () => {
      let res = await axiosInstance.get(`/conversation/${user._id}`)
      let data = await res.data

      setConvs(data)
    }
    getUserConversations()
  }, [user._id])
  return (
    <Container>
      <ChatContainer>
        {convs &&
          convs.map((conv, index) =>
            <div key={Math.random()} onClick={() => setCurrentChat(conv)}>
              <ConversationItem convs={conv} />
            </div>
          )}
      </ChatContainer>

    </Container>
  )
}

export default Chat
const Container = styled.div`
width:20%;
background-color:white

`


const ChatContainer = styled.div`
display:flex;
flex-direction:column;
height:200px;
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
