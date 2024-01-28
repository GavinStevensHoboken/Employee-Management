import React, { useEffect, useState } from 'react';
import {Container, Paper, Typography, Box, Button, TextField, CircularProgress} from '@mui/material';
import { getJwtToken } from '../utils/jwtTokenUtils';
import { useNavigate } from 'react-router-dom';

const StatusCard = () => {
    const [status, setStatus] = useState('no');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
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
        async function fetchUserStatus() {
            const token = getJwtToken();
            try {
                const response = await fetch('http://localhost:3001/api/users/getStatusAndFeedback', {
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
                setStatus(data.applyStatus);
                setFeedback(data.feedback);
                setLoading(false);
                if(data.applyStatus === "Approve"){
                    navigate('/home');
                }

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
        (async () => {
                const id = await fetchUserId();
                setUserId(id);
                await fetchUserStatus();

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
    const handleCreateApplication = () => {
        navigate('/application');
    };
    const handleViewApplicationClick = () => {
        navigate('/summary');
    };

    const handleEditApplicationClick = () => {
        navigate(`/application?id=${userId}`);
    };
    return (
        <Container maxWidth="sm" style={{ marginTop: '64px' }}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                {status === 'Pending' ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Status
                        </Typography>

                        <Box border={1} borderColor="primary.main" borderRadius={2} padding={2} marginBottom={2}>
                            <Typography color="#ff9800" variant="subtitle1">
                                    Pending
                            </Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Message
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                            value="Please wait for HR to review your application."
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginBottom: '20px' }}
                        />

                        <Button variant="contained" color="primary" fullWidth onClick={handleViewApplicationClick}>
                            View application
                        </Button>
                    </>
                ) : status === 'Rejected' ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Status
                        </Typography>

                        <Box border={1} borderColor="error.main" borderRadius={2} padding={2} marginBottom={2}>
                            <Typography color="error" variant="subtitle1">
                                Rejected
                            </Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom>
                            Message
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                            value="Your application has been rejected. Please contact HR for more details."
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginBottom: '20px' }}
                        />

                        <Button variant="contained" color="secondary" fullWidth onClick={handleEditApplicationClick}>
                            Edit application
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" component="h2" align="center" style={{ marginBottom: '20px' }}>
                            Start Your First Application
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '20px', width: '100%' }}> {}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateApplication}
                                    fullWidth
                                >
                                    Create application
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default StatusCard;
