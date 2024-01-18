import React from 'react';
import { Container, Paper, Typography, Box, Button, TextField } from '@mui/material';

const StatusCard = () => {
    return (
        <Container maxWidth="sm"> {/* This will set the max width of the container to 'sm' which is 600px */}
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
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
                    value="Please wait for HR to review your application." // 实际的文本内容在这里设置
                    InputProps={{
                        readOnly: true, // 这会使文本字段只读
                    }}
                    style={{ marginBottom: '20px' }}
                />

                <Button variant="contained" color="primary" fullWidth>
                    Edit application
                </Button>
            </Paper>
        </Container>
    );
};

export default StatusCard;
