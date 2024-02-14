import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
    const value = localStorage.getItem('token');

    if (!value) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>{children}</div>
    )
}

export const PublicRoutes = ({ children }) => {
    const value = localStorage.getItem('token');

    if (value) {
        return <Navigate to={"/"} />
    }


    return (
        <div>{children}</div>
    )
}
