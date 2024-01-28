import React from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DocumentsSection = () => {
    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', maxWidth: '300px' }}>
                <Typography variant="h6" gutterBottom>
                    Document
                </Typography>
                <Button
                    component={Link}
                    to="/visafiles"
                    variant="contained"
                    color="primary"
                >
                    View uploaded file
                </Button>
            </Paper>
        </Container>
    );
};

export default DocumentsSection;
