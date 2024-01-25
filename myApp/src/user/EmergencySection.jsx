import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    ListItem,
    ListItemText,
    List
} from '@mui/material';

const EmergencyContactSection = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState({
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        middleName: data?.middleName || '',
        phone: data?.phone || '',
        email: data?.email || '',
        relationship: data?.relationship || ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Handle save logic here, like sending data to the server
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmergencyContact({ ...emergencyContact, [name]: value });
    };

    const renderField = (key, value) => {
        return isEditing ? (
            <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                value={value}
                name={key}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
        ) : (
            <ListItem key={key} style={{ padding: '4px 0' }}>
                <ListItemText
                    primary={`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`}
                />
            </ListItem>
        );
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', maxWidth: '300px' }}>
                <Typography variant="h6" gutterBottom>
                    Emergency Contact
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    {Object.entries(emergencyContact).map(([key, value]) => renderField(key, value))}
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end">
                    {!isEditing ? (
                        <Button variant="contained" color="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                    ) : (
                        <>
                            <Button variant="outlined" color="secondary" onClick={handleCancelClick} style={{ marginRight: '8px' }}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                Save
                            </Button>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default EmergencyContactSection;
