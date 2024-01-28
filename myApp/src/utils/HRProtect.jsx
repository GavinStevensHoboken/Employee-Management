import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUserRole } from './userIdUtils';

const ProtectedRoute = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const getUserRole = async () => {
            const role = await fetchUserRole();
            setUserRole(role);
        };
        
        getUserRole();
    }, []);
    
    if (userRole === null) {
        return null; 
    }

    if (userRole !== 'hr') {
        return <Navigate to="/404" />;
    }
    
    return children;
    
};

export default ProtectedRoute;