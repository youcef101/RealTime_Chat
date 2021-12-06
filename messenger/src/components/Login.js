import React, { useContext } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { loginCall } from '../apiCalls'
import LoginValidation from '../AuthFormValidation/LoginValidation'
//import axiosInstance from '../axios'
import { AuthContext } from '../context/AuthContext'

//import { encryptData } from '../utils'
function Login() {

    const { dispatch } = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const emailRef = useRef();
    const passwordRef = useRef();

    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const handlechange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const SignIn = async (e) => {
        e.preventDefault();
        setErrors(LoginValidation(input))
        let user_login = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        loginCall(user_login, dispatch);
        //const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac120003';
        //const encryptedData = encryptData(user_login, salt);

        // await axiosInstance.post('/auth/login', user_login)
        //     .then(res => {

        //         localStorage.setItem('user_login', encryptedData);

        //         setInput({
        //             email: '',
        //             password: ''
        //         })
        //     })
    }
    return (
        <Container>
            <LoginContainer>
                <LoginHeader><span>Sign in</span></LoginHeader>
                <LoginBody>
                    <InputContainer>
                        <EmailInput ref={emailRef} value={input.email} onChange={handlechange} name="email" placeholder="Enter your Email ..." type="email" />
                        {errors.email && <ErrorsContainer><span>{errors.email}</span></ErrorsContainer>}
                    </InputContainer>
                    <InputContainer>
                        <PasswordInput ref={passwordRef} value={input.password} onChange={handlechange} name="password" placeholder="Enter your Password ..." type="password" />
                        {errors.password && <ErrorsContainer><span>{errors.password}</span></ErrorsContainer>}
                    </InputContainer>
                    <LoginBtn onClick={SignIn}><span>SIGN IN</span></LoginBtn>
                </LoginBody>
                <LoginFooter>
                    <span>Dont't have an account ?<Link to="/register">Sign up</Link></span>
                </LoginFooter>

            </LoginContainer>

        </Container>
    )
}

export default Login
const Container = styled.div`
margin-top:70px;
display:flex;
align-items:center;
justify-content:center;
`
const LoginContainer = styled.div`
width:30%;
background-color:white;
height:500px;
border:1px solid #999999;
border-radius:4px;

`
const LoginHeader = styled.div`
margin-bottom:40px;
display:flex;
justify-content:center;
span{
    font-weight:500;
    font-size:26px;
    color:#4d4d4d;
}
`
const LoginBody = styled.div`
display:flex;
flex-direction:column;
align-items:center;

`
const EmailInput = styled.input`
padding:5px 10px;
border:none;
border-radius:4px;
margin-bottom:20px;
width:90%;
height:50px;
background-color: #e6e6e6;
:focus{
    outline:none;
}
`
const PasswordInput = styled(EmailInput)``
const LoginBtn = styled.div`
padding:5px 5px;
border:1px solid #999999;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
width:50%;
border-radius:4px;
:hover{
    background-color:#f2f2f2;
}
span{
    font-weight:500;
}
`
const LoginFooter = styled.div`
margin-top:10px;
padding:5px 20px;
span{
    a{
        text-decoration:none;
        cursor:pointer;
    }
}
`
const InputContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:3px;
`
const ErrorsContainer = styled.div`
display:flex;
justify-content:flex-start;
padding:1px 20px;
width:90%;
margin-top:-17px;
span{
    color:red;
}
`
