import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Avatar,
    ListItem,
    ListItemText,
    List
} from '@mui/material';
import {getJwtToken} from "../utils/jwtTokenUtils.js";

const NameSection = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [nameInfo, setNameInfo] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        preferName: data.preferName,
        email: data.email,
        ssn: data.work.ssn,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        avatar: data.avatar
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
                body: JSON.stringify(nameInfo)
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
        let formattedValue = value;
        if (name === 'Birthday') {
            const date = new Date(value);
            formattedValue = date.toISOString().split('T')[0];
        }
        setNameInfo({ ...nameInfo, [name]: formattedValue });
    };
    const formatDateForInput = (isoDateString) => {
        return isoDateString.split('T')[0];
    };
    const renderField = (key, value) => {
        if (key === 'avatar') return null;

        let displayValue = value === undefined ? '' : value;
        if (key === 'dateOfBirth') {
            const date = new Date(value);
            displayValue = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        }

        return isEditing ? (
            <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={key === 'dateOfBirth' ?formatDateForInput(value):value }
                name={key}
                onChange={handleChange}
                margin="normal"
                fullWidth
                type={key === 'dateOfBirth' ? 'date' : 'text'}
            />
        ) : (
            <ListItem key={key} style={{ padding: '4px 0' }}>
                <ListItemText
                    primary={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`}
                />
            </ListItem>
        );
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' ,maxWidth: '300px'}}>
                <Typography variant="h6" gutterBottom>
                    Identity Information
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={2} >
                    <Avatar alt="Profile Picture" src={data.avatar} sx={{ width: 56, height: 56 }} />
                    {Object.entries(nameInfo).map(([key, value]) => renderField(key, value))}
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

export default NameSection;
