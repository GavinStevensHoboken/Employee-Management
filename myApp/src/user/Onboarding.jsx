import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { getJwtToken } from '../utils/jwtTokenUtils';
import { useNavigate } from 'react-router-dom';

const StatusCard = () => {
    const [status, setStatus] = useState('no');
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchUserStatus() {
            const token = getJwtToken();
            try {
                const response = await fetch('http://localhost:3001/api/users/getStatus', {
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

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }

        fetchUserStatus();
    }, []);

    const handleCreateApplication = () => {
        navigate('/application');
    };

    return (
        <Container maxWidth="sm">
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

                        <Button variant="contained" color="primary" fullWidth>
                            Edit application
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" component="h2" align="center" style={{ marginBottom: '20px' }}>
                            Start Your First Application
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '20px', width: '100%' }}> {/* 控制按钮宽度 */}
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
