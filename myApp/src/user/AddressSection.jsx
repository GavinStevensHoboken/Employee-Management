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
import {getJwtToken} from "../utils/jwtTokenUtils.js";

const AddressSection = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [addressInfo, setAddressInfo] = useState({
        streetAddress: data.streetAddress || '',
        streetAddress2: data.streetAddress2 || '',
        city: data.city || '',
        state: data.state || '',
        postalCode: data.postalCode || ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        const confirmDiscard = window.confirm("Do you want to discard all of your changes?");
        if (confirmDiscard) {
            setIsEditing(false);
        }
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        const token = getJwtToken();
        try {
            const response = await fetch('http://localhost:3001/api/users/updatePersonalInformation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(addressInfo)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
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
                    Address Information
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    {Object.entries(addressInfo).map(([key, value]) => renderField(key, value))}
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

export default AddressSection;
