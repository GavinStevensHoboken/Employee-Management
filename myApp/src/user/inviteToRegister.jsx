import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import {logIn} from "../redux/authActions.js";

const InviteUser = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');

    const handleInvite = async () => {
        const userData = {
            email,
            name: userName
        };
        try {
            const response = await fetch('http://localhost:3001/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const responseBody = await response.json();
                console.log(responseBody);
            }
        } catch (error) {
            console.error('Server error', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant="h6" align="center">
                    Invite User to Register
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInvite}
                    fullWidth
                >
                    Generate token and send email
                </Button>
            </Paper>
        </Container>
    );
};

export default InviteUser;
