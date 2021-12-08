import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { signOut  } from "@firebase/auth"
import { auth } from "../../firebase"
import { red } from "@material-ui/core/colors"

export default function LogOut() {
  const [error, setError] = useState("")
  const history = useHistory()
  var currentUser = auth.currentUser

  async function handleLogout() {
    setError("")

    try {
      signOut()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email} 
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button  onClick={handleLogout} style={{backgroundColor:"#FF0000" , border:"#FF0000"}}>
          Log Out
        </Button>
      </div>
    </>
  )
}