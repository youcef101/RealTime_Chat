import React, { useContext } from 'react'
import styled from 'styled-components'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { AuthContext } from '../context/AuthContext';


function Header() {
    const { user } = useContext(AuthContext)

    const SignOut = () => {
        localStorage.removeItem('user_login');

    }
    return (
        <Container>

            <Logo>
                <img src="/images/messenger-logo.jpg" alt="" />
            </Logo>
            <Messages>
                <NewMessage>
                    <Badge badgeContent={4} color="secondary">
                        <ChatBubbleOutlineIcon />
                    </Badge>
                </NewMessage>
            </Messages>
            <span>{user.fullName}</span>
            <MenuContainer>

                <UserImg>
                    <img src="/images/my-image.jpg" alt="" />
                </UserImg>

                <Logout onClick={SignOut}>
                    <span>Logout</span>
                </Logout>

            </MenuContainer>

        </Container>
    )
}

export default Header
const Container = styled.div`
display:flex;
height:50px;
width:100%;
background-color:white;
display:flex;
align-items:center;
`
const Logo = styled.div`
cursor:pointer;
flex:1;
img{
    width:100px;
    height:50px;
}
`
const MenuContainer = styled.div`
display:flex;
align-items:center;
margin-right:35px;

`
const UserImg = styled.div`
cursor:pointer;
margin-left:5px;
img{
    border-radius:50%;
    width:35px;
    height:35px;
    border:1px solid  #a6a6a6;
    display:flex;
    align-items:center;
}
`
const Logout = styled.div`
margin-left:15px;
cursor:pointer;
`
const NewMessage = styled(IconButton)`
display:flex;
align-items:center;
`
const Messages = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-right:30px;
`
