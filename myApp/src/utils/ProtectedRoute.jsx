import { Navigate, Outlet } from 'react-router-dom';
import {useEffect, useState} from "react";
import {getJwtToken} from "./jwtTokenUtils.js";

const ProtectedRoute = () => {
    const [userId, setUserId] = useState(null);
    useEffect(async () => {
        async function fetchUserId() {
            const token = getJwtToken();
            try {
                const response = await fetch('http://localhost:3001/api/users/getId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data.userId;

            } catch (error) {
                console.error('Failed to fetch user ID:', error);
                throw error;
            }
        }

        setUserId(await fetchUserId());
    }, [])
    if (!userId) {
        // User is not authenticated, redirect them to the login page
        return <Navigate to="/login" replace />;
    }

    // User is authenticated, render the child components
    return <Outlet />;
};
