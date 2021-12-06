import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext'
import { format } from 'timeago.js'

function Message({ msg }) {
    //console.log(msg)
    const { user } = useContext(AuthContext)
    return (
        <Container>
            {user._id !== msg.senderID ?

                <MyMessage>

                    <MessageField1>
                        <MessageItem>
                            <span>{msg.content}</span>
                        </MessageItem>
                        <MessageTime>
                            <span>{format(msg.createdAt)}</span>
                        </MessageTime>
                    </MessageField1>
                    <UserImg>
                        <img src="/images/my-image.jpg" alt="" />
                    </UserImg>
                </MyMessage>
                :
                <MessageReceiver>
                    <UserImg>
                        <img src="/images/my-image.jpg" alt="" />
                    </UserImg>
                    <MessageField>
                        <MessageText>
                            <span>{msg.content}</span>
                        </MessageText>
                        <MessageTime>
                            <span>{format(msg.createdAt)}</span>
                        </MessageTime>
                    </MessageField>
                </MessageReceiver>
            }
        </Container>
    )
}

export default Message
const Container = styled.div``
const MessageReceiver = styled.div`
display:flex;
padding:5px 5px;
`
const MessageField = styled.div`
display:flex;
flex-direction:column;
`
const UserImg = styled.div`
img{
    border-radius:50%;
    width:40px;
    height:40px;
    border:1px solid  #666666;
}
`
const MessageText = styled.div`
margin-left:5px;
background-color:blue;
border-radius:13px;
max-width:300px;
display:flex;
justify-content:center;
span{
    color:white;
    padding:5px 5px;
    
}
`
const MessageTime = styled.div`
span{
    color: #404040;
    font-size:11px;
}
`
const MyMessage = styled.div`
display:flex;
justify-content:flex-end;
padding:5px 5px;
`
const MessageItem = styled.div`
margin-right:5px;
background-color:#a6a6a6;
border-radius:13px;
max-width:300px;
display:flex;
justify-content:center;
span{
    color:#000;
    padding:5px 5px;
}
`
const MessageField1 = styled.div`
display:flex;
flex-direction:column;
`