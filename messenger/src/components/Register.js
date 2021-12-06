import React, { useRef } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import RegisterValidation from '../AuthFormValidation/RegisterValidation';
import axiosInstance from '../axios';



function Register() {



    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password_confirmRef = useRef();

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const SignUp = async (e) => {
        setErrors(RegisterValidation(input));

        let newUser = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirm: password_confirmRef.current.value
        }

        if (input.firstName !== '' && input.lastName !== '' && input.email !== '' && input.password !== '' && input.password_confirm !== '') {
            await axiosInstance.post('/auth/register', newUser)
                .then(res => {
                    console.log(res.data)
                    //dispatch(setSignUp(newUser));
                    setInput(
                        {
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            password_confirm: ''
                        }
                    )
                })

        }
    }
    return (
        <Container>
            <RegisterContainer>
                <RegisterHeader><span>Sign up</span></RegisterHeader>
                <RegisterBody>
                    <InputContainer>
                        <FirstNameInput ref={firstNameRef} name="firstName" value={input.firstName} onChange={handleChange} placeholder="Enter your firstName ..." type="text" />
                        {errors.firstName && <ErrorsContainer><span>{errors.firstName}</span></ErrorsContainer>}
                    </InputContainer>
                    <InputContainer>
                        <LastNameInput ref={lastNameRef} name="lastName" value={input.lastName} onChange={handleChange} placeholder="Enter your lastName ..." type="text" />
                        {errors.lastName && <ErrorsContainer><span>{errors.lastName}</span></ErrorsContainer>}
                    </InputContainer>
                    <InputContainer>
                        <EmailInput ref={emailRef} name="email" value={input.email} onChange={handleChange} placeholder="Enter your Email ..." type="email" />
                        {errors.email && <ErrorsContainer><span>{errors.email}</span></ErrorsContainer>}
                    </InputContainer>
                    <InputContainer>
                        <PasswordInput ref={passwordRef} name="password" value={input.password} onChange={handleChange} placeholder="Enter your Password ..." type="password" />
                        {errors.password && <ErrorsContainer><span>{errors.password}</span></ErrorsContainer>}
                    </InputContainer>
                    <InputContainer>
                        <PasswordConfirmInput ref={password_confirmRef} name="password_confirm" value={input.password_confirm} onChange={handleChange} placeholder="Enter your Password ..." type="password" />
                        {errors.password_confirm && <ErrorsContainer><span>{errors.password_confirm}</span></ErrorsContainer>}
                    </InputContainer>
                    <RegisterBtn onClick={SignUp}><span>SIGN UP</span></RegisterBtn>
                </RegisterBody>
                <RegisterFooter>
                    <span>You already have an account ?<Link to="/login">Sign in</Link></span>
                </RegisterFooter>

            </RegisterContainer>

        </Container>
    )
}

export default Register
const Container = styled.div`
margin-top:70px;
display:flex;
align-items:center;
justify-content:center;
`
const RegisterContainer = styled.div`
width:30%;
background-color:white;
height:700px;
border:1px solid #999999;
border-radius:4px;

`
const RegisterHeader = styled.div`
margin-bottom:40px;
display:flex;
justify-content:center;
span{
    font-weight:500;
    font-size:26px;
    color:#4d4d4d;
}
`
const RegisterBody = styled.div`
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
const FirstNameInput = styled(EmailInput)``
const LastNameInput = styled(FirstNameInput)``
const PasswordInput = styled(EmailInput)``
const PasswordConfirmInput = styled(EmailInput)``
const RegisterBtn = styled.div`
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
const RegisterFooter = styled.div`
margin-top:10px;
padding:5px 20px;
span{
    a{
        text-decoration:none;
        cursor:pointer;
    }
}
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
const InputContainer = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:3px;
`
