// SummaryComponent.jsx
import React from 'react';
import {Typography, Grid, Paper} from '@mui/material';
import {logIn} from "../redux/authActions.js";

const SummaryComponent = ({formData, workData, reference, emergencyContacts}) => {
    console.log('emergencyContacts:', emergencyContacts, typeof emergencyContacts);
    const formatFieldName = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div>
            <Typography variant="h5" component="h3" style={{marginBottom: '20px'}}>Summary</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography>Personal Details:</Typography>
                    {Object.entries(formData).map(([fieldName, value]) => {
                        if (fieldName === 'avatar' && value) {
                            return (
                                <div key={fieldName}>
                                    <Typography component="div">{formatFieldName(fieldName)}:</Typography>
                                    <img src={value} alt="Avatar" style={{maxWidth: '100px', maxHeight: '100px'}}/>
                                </div>
                            );
                        } else {
                            return (
                                <Typography component="div" key={fieldName}>
                                    {formatFieldName(fieldName)}: {value || ''}
                                </Typography>
                            );
                        }
                    })}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>Work Details:</Typography>
                    {Object.entries(workData).map(([fieldName, value]) => {
                        if (fieldName === 'optReceipt' && value) {
                            return (
                                <Typography component="div" key={fieldName}>
                                    {formatFieldName(fieldName)}: <a href={value} download>Download OPT Receipt</a>
                                </Typography>
                            );
                        } else {
                            return (
                                <Typography component="div" key={fieldName}>
                                    {formatFieldName(fieldName)}: {value || ''}
                                </Typography>
                            );
                        }
                    })}
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography>References and Emergency Contacts:</Typography>
                    <Typography>References:</Typography>
                    <Typography>{reference.firstName} {reference.middleName} {reference.lastName}</Typography>
                    <Typography>Phone: {reference.phone}</Typography>
                    <Typography>Email: {reference.email}</Typography>
                    <Typography>Relationship: {reference.relationship}</Typography>
                    <Typography>Emergency Contacts:</Typography>
                    {Object.entries(emergencyContacts).map(([key, contact], index) => (
                        <div container spacing={2} key={key} style={{ marginBottom: '10px' }}>
                            {/* Emergency Contact Fields */}
                            {Object.keys(contact).map((contactKey) => (
                                <div key={index}>
                                    <Typography>{contact.firstName} {contact.middleName} {contact.lastName}</Typography>
                                    <Typography>Phone: {contact.phone}</Typography>
                                    <Typography>Email: {contact.email}</Typography>
                                    <Typography>Relationship: {contact.relationship}</Typography>
                                </div>
                            ))}
                        </div>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default SummaryComponent;
