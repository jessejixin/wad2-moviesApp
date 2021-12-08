import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/authContext'
import {Link, useHistory} from "react-router-dom";


export default function LogInForm() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const {logIn} = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault() //stop refresh

        try{
            setError("")
            setLoading(true)
         await logIn(emailRef.current.value,passwordRef.current.value)
        } catch{
            setError('Sign in Failed')

        }
        setLoading(false)
    }


    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>

                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type ="email" ref= {emailRef} required/>
                    </Form.Group>
                    <Form.Group id ="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type ="password" ref= {passwordRef} required/>
                    </Form.Group>

                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">LogIn</Button>
                </Form>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Do not have an account? <Link to="/signUp">Sign Up</Link>
        </div>

        </>
    )
} 