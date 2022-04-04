import { useState } from 'react';

type Token = {
    token: string
}

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token') as string
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    };

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken: Token) => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    };

    const logout = () => {
        localStorage.removeItem('token')
    }

    console.log(token)
    return { setToken: saveToken, token, logout }
}