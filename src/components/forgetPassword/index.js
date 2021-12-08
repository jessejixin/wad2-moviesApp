import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { getAuth , sendPasswordResetEmail } from "@firebase/auth"
import { useHistory } from "react-router-dom"

export default function ForgetPassword() {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const auth = getAuth();
  const history = useHistory()


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      sendPasswordResetEmail( auth ,emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  async function cancel(e) {
    e.preventDefault()

    try{
        history.push("/")
    } catch {
        setError("Failed to cancel")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-50" type="submit">
              Reset Password
            </Button>
            <Button  className="w-50" type="cancel" onClick={cancel}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
} 