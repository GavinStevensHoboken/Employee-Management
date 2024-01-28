import React, {useEffect, useState} from 'react';
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

const EmergencyContactSection = ({data}) => {
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [isEditing, setIsEditing] = useState([]);
    useEffect(() => {
        const updatedEmergencyContacts = data.map((data) => ({
            _id: data?._id || '',
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',
            middleName: data?.middleName || '',
            phone: data?.phone || '',
            email: data?.email || '',
            relationship: data?.relationship || ''
        }));

        setEmergencyContacts(updatedEmergencyContacts);
        setIsEditing(emergencyContacts.map(() => false));
    }, []);
    const handleEditClick = (index) => {
        const updatedIsEditing = [...isEditing];
        updatedIsEditing[index] = true;
        setIsEditing(updatedIsEditing);
    };

    const handleCancelClick = (index) => {
        const confirmDiscard = window.confirm("Do you want to discard all of your changes?");
        if (confirmDiscard) {
            const updatedIsEditing = [...isEditing];
            updatedIsEditing[index] = false;
            setIsEditing(updatedIsEditing);
        }

    };

    const handleSaveClick = async (index) => {
        const updatedIsEditing = [...isEditing];
        updatedIsEditing[index] = false;
        setIsEditing(updatedIsEditing);
        try {
            const response = await fetch(`http://localhost:3001/api/users/updateEmergencyContacts/${emergencyContacts[index]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emergencyContacts[index]),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Failed to update contact:', error);
        }
    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const updatedContacts = [...emergencyContacts];
        const updatedContact = {...updatedContacts[index], [name]: value};
        updatedContacts[index] = updatedContact;
        setEmergencyContacts(updatedContacts);
    };


    const renderField = (key, value, index) => {
        if (key === '_id')
            return null;
        return isEditing[index] ? (
            <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                value={value}
                name={key}
                onChange={(e) => handleChange(e, index)}
                margin="normal"
                fullWidth
            />
        ) : (
            <ListItem key={key} style={{padding: '4px 0'}}>
                <ListItemText
                    primary={`${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`}
                />
            </ListItem>
        );
    };

    return (
        <Container maxWidth="sm">
            {emergencyContacts && emergencyContacts.length > 0 ? (
                emergencyContacts.map((emergencyContact, index) => (

                    <Paper elevation={3} style={{padding: '20px', marginTop: '20px', maxWidth: '300px'}} key={index}>
                        <Typography variant="h6" gutterBottom>
                            Emergency Contact {index + 1}
                        </Typography>

                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            {Object.entries(emergencyContact).map(([key, value]) => renderField(key, value, index))}
                        </Box>

                        <Box mt={2} display="flex" justifyContent="flex-end">
                            {!isEditing[index] ? (
                                <Button variant="contained" color="primary" onClick={() => handleEditClick(index)}>
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outlined" color="secondary" onClick={() => handleCancelClick(index)}
                                            style={{marginRight: '8px'}}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleSaveClick(index)}>
                                        Save
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Paper>
                ))
            ) : (
                <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                    No emergency contacts available.
                </Typography>
            )}
        </Container>
    );
};

export default EmergencyContactSection;
