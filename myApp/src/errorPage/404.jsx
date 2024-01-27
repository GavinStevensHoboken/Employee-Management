import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                404
            </Typography>
            <Typography variant="subtitle1" align="center">
                Sorry, something went wrong.
            </Typography>
            <Box mt={3}>
                <Button variant="outlined" onClick={() => navigate('/login')}>
                    Back to home page
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
