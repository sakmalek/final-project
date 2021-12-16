import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, redirectTo }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext)
    if (isLoading) return (<p>Is Loading ...</p>);
    return isLoggedIn ? children : <Navigate to={redirectTo} />
}