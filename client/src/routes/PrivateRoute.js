import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContexts';

const PrivateRoute = ({ children }) => {
    let { user, loading } = useContext(AuthContext);
    let location = useLocation();
    if (loading) {
        return 'Loading........'
    }
    if (!user?.uid) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
};

export default PrivateRoute;