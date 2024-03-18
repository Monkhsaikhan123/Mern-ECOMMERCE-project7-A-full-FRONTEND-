import React, {useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../components/Loading'


const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }

  return (
    <Navigate to='/' state={{from: location}} replace></Navigate>
  )
}

export default PrivateRouter