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

const ContactSection = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        homePhone: data.homePhone || '',
        cellPhone: data.cellPhone || ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Handle save logic here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
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
                    Contact Information
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    {Object.entries(contactInfo).map(([key, value]) => renderField(key, value))}
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

export default ContactSection;
