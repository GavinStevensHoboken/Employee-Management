import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getJwtToken } from "./jwtTokenUtils.js";
import {CircularProgress, Container} from "@mui/material";

const ProtectedRouteForAll = () => {
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state to prevent immediate redirection

    useEffect(() => {
        const fetchUserId = async () => {
            const token = getJwtToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/users/getId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    setIsLoading(false);
                    return;
                }

                const data = await response.json();
                setUserId(data.userId);
            } catch (error) {
                console.error('Failed to fetch user ID:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserId();
    }, []);

    if (isLoading) {
        return (
            <Container maxWidth="sm"
                       style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRouteForAll;
