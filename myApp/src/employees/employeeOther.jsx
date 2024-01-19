import React, { useState } from 'react';
import {
    TextField, Button, Grid, Typography, Paper
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ReferenceAndEmergencyContactsForm = () => {
    const [reference, setReference] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        relationship: ''
    });

    const [emergencyContacts, setEmergencyContacts] = useState([
        {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: '',
            relationship: ''
        }
    ]);

    const handleReferenceChange = (e) => {
        const { name, value } = e.target;
        setReference({ ...reference, [name]: value });
    };

    const handleEmergencyContactChange = (index, e) => {
        const updatedContacts = [...emergencyContacts];
        updatedContacts[index] = { ...updatedContacts[index], [e.target.name]: e.target.value };
        setEmergencyContacts(updatedContacts);
    };

    const addEmergencyContact = () => {
        setEmergencyContacts([
            ...emergencyContacts,
            {
                firstName: '',
                lastName: '',
                middleName: '',
                phone: '',
                email: '',
                relationship: ''
            }
        ]);
    };

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6">Reference Information</Typography>
            <Grid container spacing={2}>
                {/* Reference Fields */}
                {Object.keys(reference).map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            name={key}
                            value={reference[key]}
                            onChange={handleReferenceChange}
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" style={{ marginTop: '20px' }}>Emergency Contacts</Typography>
            {emergencyContacts.map((contact, index) => (
                <Grid container spacing={2} key={index} style={{ marginBottom: '10px' }}>
                    {/* Emergency Contact Fields */}
                    {Object.keys(contact).map((key) => (
                        <Grid item xs={12} sm={6} md={4} key={`${index}-${key}`}>
                            <TextField
                                fullWidth
                                label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                name={key}
                                value={contact[key]}
                                onChange={(e) => handleEmergencyContactChange(index, e)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}

            <Button startIcon={<AddCircleOutlineIcon />} onClick={addEmergencyContact}>
                Add Emergency Contact
            </Button>
        </Paper>
    );
};

export default ReferenceAndEmergencyContactsForm;
