import React , {useContext,useState, useEffect}from 'react'
// import {app} from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const AuthContext = React.createContext();
const auth=getAuth()
export function useAuth(){
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(false)

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {

          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)

          });
    }

    function logIn(email,password){


        return signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
          });
    }

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

        setCurrentUser(user)
        setLoading(false)

    })

    return unsubscribe
},[])

    const value = {
        currentUser,
        signUp,
        logIn
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
} 