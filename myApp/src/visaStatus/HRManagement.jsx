import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { getJwtToken } from '../utils/jwtTokenUtils';



const ApplicationSummary = () => {
    const [applicationData, setApplicationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getJwtToken();
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user.id;
                console.log(decodedToken)
                const response = await fetch(`http://localhost:3001/api/applications/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setApplicationData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    const formatFieldName = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    
    const filterData = (dataObject) => {
        const excludeFields = ['_id', 'userId', '__v'];
        return Object.entries(dataObject)
            .filter(([key]) => !excludeFields.includes(key))
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    };


    if (applicationData){
        var { personal, work, reference, emergencyContact } = applicationData;
    }

    if (!applicationData) {
        return <Typography>Loading...</Typography>;
    }

    

    return (
        
        <div>
            <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>Summary</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Typography>Personal Details:</Typography>
                    {Object.entries(filterData(personal)).map(([fieldName, value]) => {
                        if (fieldName === 'avatar' && value) {
                            return (
                                <div key={fieldName}>
                                    <Typography>{formatFieldName(fieldName)}:</Typography>
                                    <img src={value} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                </div>
                            );
                        } else {
                            return (
                                <Typography key={fieldName}>
                                    {formatFieldName(fieldName)}: {value || ''}
                                </Typography>
                            );
                        }
                    })}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography>Work Details:</Typography>
                    {Object.entries(filterData(work)).map(([fieldName, value]) => {
                        if (fieldName === 'optReceipt' && value) {
                            return (
                                <Typography key={fieldName}>
                                    {formatFieldName(fieldName)}: <a href={value} download>Download OPT Receipt</a>
                                </Typography>
                            );
                        } else {
                            return (
                                <Typography key={fieldName}>
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
                    {emergencyContact && emergencyContact.map((contact, index) => (
                        <div key={index}>
                            <Typography>{contact.firstName} {contact.middleName} {contact.lastName}</Typography>
                            <Typography>Phone: {contact.phone}</Typography>
                            <Typography>Email: {contact.email}</Typography>
                            <Typography>Relationship: {contact.relationship}</Typography>
                        </div>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default ApplicationSummary;