import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const loginUser = token => {
        localStorage.setItem('authToken', token)

        verifyStoredToken();
    }

    const logoutUser = () => {
        localStorage.removeItem('authToken')

        setIsLoggedIn(false)
        setUser(null)
    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            axios.get('/auth/verify', {headers: {Authorization: `Bearer ${storedToken}`}})
                .then(response => {
                    const user = response.data
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyStoredToken()
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn, user, isLoading, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthProviderWrapper, AuthContext}