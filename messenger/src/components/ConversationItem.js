import styled from 'styled-components'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../axios'



function ConversationItem({ convs }) {
    const { user } = useContext(AuthContext)
    const [userConvInfo, setUserInfo] = useState([])

    useEffect(() => {
        let freindID = convs.members.find(userID => userID !== user._id)
        const getUserConvInfo = async () => {
            let res = await axiosInstance.get(`/user/${freindID}`)
            let data = res.data
            setUserInfo(data)
        }
        getUserConvInfo()
    }, [user._id, convs.members])

    return (
        <Container>

            <UserContainer >
                <UserImg>
                    <img src="/images/my-image.jpg" alt="" />
                </UserImg>
                <UserFullName>
                    <span>{userConvInfo.fullName}</span>
                </UserFullName>
            </UserContainer>

        </Container>
    )
}

export default ConversationItem
const Container = styled.div``

const UserContainer = styled.div`
display:flex;
align-items:center;
padding:5px 10px;
cursor:pointer;
margin-bottom:20px;
:hover{
    background-color:#e6e6e6;
}

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
const UserFullName = styled.div`
margin-left:5px;
span{
    font-size:17px;
}
`