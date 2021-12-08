import React from 'react'
import SignUpForm from '../components/signup'
import { Container } from 'react-bootstrap'
import AuthProvider from '../contexts/authContext'


export default function signUpPage() {
    return (
        <AuthProvider>
        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <SignUpForm/>
            </div>
        </Container>
        </AuthProvider>
    )
} 