import React from 'react';
import {
    TextField, Button, Grid, Typography, Paper
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useSelector, useDispatch} from 'react-redux';
import { updateReference, updateEmergencyContact, addEmergencyContact } from '../redux/referenceAndEmergencyContactsSlice.js';
const ReferenceAndEmergencyContactsForm = () => {

    const dispatch = useDispatch();
    const referenceData = useSelector((state) => state.referenceAndEmergencyContacts.reference);
    const emergencyContactsData = useSelector((state) => state.referenceAndEmergencyContacts.emergencyContacts);

    const handleReferenceChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateReference({ [name]: value }));
    };

    const handleEmergencyContactChange = (index, e) => {
        const { name, value } = e.target;
        dispatch(updateEmergencyContact({ index, contact: { [name]: value } }));
    };

    const handleAddEmergencyContact = () => {
        dispatch(addEmergencyContact());
    };

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6">Reference Information</Typography>
            <Grid container spacing={2}>
                {/* Reference Fields */}
                {Object.keys(referenceData).map((key) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            name={key}
                            value={referenceData[key]}
                            onChange={handleReferenceChange}
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" style={{ marginTop: '20px' }}>Emergency Contacts</Typography>
            {emergencyContactsData.map((contact, index) => (
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

            <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddEmergencyContact}>
                Add Emergency Contact
            </Button>
        </Paper>
    );
};

export default ReferenceAndEmergencyContactsForm;
