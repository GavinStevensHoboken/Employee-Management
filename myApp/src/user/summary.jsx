import React, {useEffect, useState} from "react";
import {getJwtToken} from "../utils/jwtTokenUtils.js";
import {Button, CircularProgress, Container, Paper} from "@mui/material";
import SummaryComponent from "./summaryComponent.jsx";
import { useNavigate } from 'react-router-dom';
const SummaryPage = () => {
    const [userData, setUserData] = useState({
        personal: null,
        work: null,
        reference: null,
        emergencyContact: null,
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleBackClick = () => {
        navigate('/status');
    };
    useEffect(() => {
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

        async function fetchUserData(userId) {
            try {
                const response = await fetch(`http://localhost:3001/api/applications/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const { _id: personalId, userId: personalUserId, createdAt: personalCreatedAt, updatedAt: personalUpdatedAt, __v : p__v, ...personalRest } = data.personal || {};
                const { _id: workId, userId: workUserId, createdAt: workCreatedAt, updatedAt: workUpdatedAt,__v : w__v, ...workRest } = data.work || {};
                const { _id: referenceId, userId: referenceUserId, createdAt: referenceCreatedAt, updatedAt: referenceUpdatedAt, __v : r__v, ...referenceRest } = data.reference || {};
                const { _id: emergencyContactId, userId: emergencyContactUserId, createdAt: emergencyContactCreatedAt, updatedAt: emergencyContactUpdatedAt, __v : e__v, ...emergencyContactRest } = data.emergencyContact || {};

                setUserData({
                    personal: personalRest,
                    work: workRest,
                    reference: referenceRest,
                    emergencyContact: emergencyContactRest,
                });
            } catch (error) {
                console.error('Failed to fetch application data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }



        (async () => {
            try {
                const userId = await fetchUserId();
                await fetchUserData(userId);
            } catch (error) {
                setLoading(false);
                setError('Failed to fetch data');
            }
        })();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="sm"
                       style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{margin: '20px', marginTop: '70px'}}>
            <Paper style={{
                padding: '20px',
                margin: '20px auto',
                width: '800px',
                height: '500px',
                overflow: 'auto'
            }}>
                <SummaryComponent
                    formData={userData.personal}
                    workData={userData.work}
                    reference={userData.reference}
                    emergencyContacts={userData.emergencyContact}
                />
            </Paper>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Button
                    onClick={handleBackClick}
                    style={{
                        padding: '20px',
                        width: '800px',
                    }}
                >
                    Back to Status
                </Button>
            </div>
        </div>

    );
}

export default SummaryPage;