import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({ children }) {

    const location = useLocation()

    if (location.state === null) {
        
        return <Navigate to="/" />;

    } else {

        return children;
    }
}

export default PrivateRoute