import React from 'react'
import { Container } from 'react-bootstrap'
import AuthProvider from '../contexts/authContext'
import LogInForm from '../components/login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Signup from "../components/signup"
import ForgetPassword from "../components/forgetPassword"

export default function logInPage() {
    return (

        <AuthProvider>

        <Container className = "d-flex align-items-center justify-content-center" 
        style={ {minHeight: "100vh"}}
        >
            <div className = "w-100" style ={{maxWidth:"400px"}}>
            <Router>
          
                <Switch>
                        <Route path="/login" component={LogInForm} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/forgetPassword" component={ForgetPassword} />
                </Switch>
          
                </Router>
            </div>
        </Container>
        </AuthProvider>
    )
} 