import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosInstance from '../axios'
import { AuthContext, ChatContext } from '../context/AuthContext'
import Chat from './Chat'
import ChatRoom from './ChatRoom'
import Header from './Header'
import Online from './Online'
function Home() {
    const { currentChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    //const { onlineUsers } = useContext(ChatContext)
    const [userFreinds, setUserFreinds] = useState(null)
    //console.log(onlineUsers)
    //console.log(userFreinds)
    useEffect(() => {
        const getUserFreinds = async () => {
            try {
                let res = await axiosInstance.get(`/user/freinds/${user._id}/all`)
                let freinds = await res.data
                setUserFreinds(freinds)

            } catch (err) {
                console.log(err)
            }
        }
        getUserFreinds()
    }, [user._id])
    return (
        <Container>

            <Header />
            <HomeContainer>
                <Chat />
                {currentChat ?
                    <ChatRoom />
                    : <div>Enter a conversation to see messages !!!!</div>}

                <Online userFreinds={userFreinds} />

            </HomeContainer>
        </Container>
    )
}

export default Home
const Container = styled.div`
height:100%;
width:100%;
`
const HomeContainer = styled.div`
margin-top:20px;
display:flex;
align-items:flex-start;
justify-content:space-evenly;
`
