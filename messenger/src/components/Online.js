import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext, ChatContext } from '../context/AuthContext'
function Online({ userFreinds }) {
    const { onlineUsers, setCurrentChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [onlineFreinds, setOnlineFreinds] = useState(null)
    const [currentFreindId, setFreindId] = useState('')
    // console.log(currentFreindId)
    // console.log(userFreinds)
    // console.log(onlineUsers)
    // console.log(onlineFreinds)
    useEffect(() => {
        const getOnlineFreinds = async () => {
            let res = userFreinds?.filter(user => onlineUsers?.includes(user._id))
            setOnlineFreinds(res)
        }
        getOnlineFreinds()
    }, [userFreinds, onlineUsers])

    const FreindConv = async (id) => {
        try {
            let res = await axiosInstance.get(`/conversation/${user._id}/${id}`)
            let data = await res.data
            setCurrentChat(data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <OnlineContainer>
                {onlineFreinds &&
                    onlineFreinds.map(freind =>
                        <UserContainer key={Math.random()} onClick={() => FreindConv(freind._id)}>
                            <UserImage>
                                <UserImg>
                                    <img src="/images/my-image.jpg" alt="" />
                                </UserImg>
                                <OnlineIc></OnlineIc>
                            </UserImage>
                            <UserFullName>
                                <span>{freind?.fullName}</span>
                            </UserFullName>
                        </UserContainer>
                    )}


            </OnlineContainer>
        </Container>
    )
}

export default Online
const Container = styled.div`
width:20%;
background-color:white;
`
const UserContainer = styled.div`
display:flex;
align-items:center;
padding:5px 10px;
cursor:pointer;
margin-bottom:20px;

`
const UserImage = styled.div`
display:flex;
`
const UserImg = styled.div`

img{
    border-radius:50%;
    border:1px solid  #a6a6a6;
    width:35px;
    height:35px;
    display:flex;
    align-items:center;
}
`
const OnlineIc = styled.div`
background-color:green;
border-radius:50%;
width:10px;
height:10px;
//margin-top:-15px;
margin-left:-7px;
`
const UserFullName = styled.div`
margin-left:5px;
span{
    font-size:17px;
}
`
const OnlineContainer = styled.div`
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