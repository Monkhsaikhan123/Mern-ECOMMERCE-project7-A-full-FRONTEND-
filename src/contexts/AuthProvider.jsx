import React ,{createContext, useState, useEffect}from 'react'
import axios from 'axios'
import { GoogleAuthProvider, createUserWithEmailAndPassword, 
        getAuth, 
        onAuthStateChanged, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut, 
        updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config'

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create an account

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password, name)
    }

    // signup with gmail account
    const signUpWithGmail = ()=>{
       return  signInWithPopup(auth, googleProvider)
    }

    //login using email password
    const login = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    //log out

    const logOut = () => {
        signOut(auth)
        window.location.reload(false);
    }

    //update profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    //sign-in user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              if(currentUser){
                  const userInfo = {email: currentUser.email}
                  console.log(userInfo)
                  axios.post('http://localhost:4000/jwt', userInfo)
                  .then((response)=>{
                      /* console.log(response.data.token) */
                      if(response.data.token){
                        localStorage.setItem('access-token', response.data.token)
                      }
                  })
              }else{
                
              }
              
              setLoading(false)
            } else {
                setLoading(false)
                localStorage.removeItem('access-token')
                
              // User is signed out
              // ...
            }
          })

          return () => {
            return unsubscribe();
          }
    },[])
    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateUserProfile,
        loading
    }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider