import React ,{useRef ,useState}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth"
import { auth } from "../../firebase"

export default function LogInForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault() //stop refresh

        try{
            setError("")
            setLoading(true)
            signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
            history.push("/")
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
        <div className="w-100 text-center mt-3">
          <Link to="/ForgetPassword">Forget Password?</Link>
        </div>

        </>
    )
} 