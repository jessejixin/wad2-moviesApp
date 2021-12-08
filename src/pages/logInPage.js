import React from 'react'
import { Container } from 'react-bootstrap'
import AuthProvider from '../contexts/authContext'
import LogInForm from '../components/login'

export default function logInPage() {
    return (

        <AuthProvider>

        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <LogInForm/>
            </div>
        </Container>
        </AuthProvider>
    )
} 