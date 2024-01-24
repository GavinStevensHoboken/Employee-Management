import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container  } from '@mui/material';

const UserInfoDialog = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/api/applications/${userId}`)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(error => console.error('Error fetching user info:', error));
        }
    }, [userId]);
  
    const filterData = (dataObject) => {
        const excludeFields = ['_id', 'userId', '__v', 'createdAt', 'updatedAt'];
        return Object.entries(dataObject)
            .filter(([key]) => !excludeFields.includes(key))
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    };

    if (userInfo){
        var { personal, work, reference, emergencyContact } = userInfo;
    }

    if (!userInfo) {
        return null;
    }

    const renderTextField = (label, value) => (
        <TextField
            label={label.toUpperCase()}
            value={value || ''}
            fullWidth
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
        />
    );

    return (
        <Container>
            <Paper style={{ padding: 16, marginTop: 16 }}>
                <Typography variant="h6" gutterBottom>Summary</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1" gutterBottom>Personal Details</Typography>
                        {personal && Object.entries(filterData(personal)).map(([key, value]) => (
                            <div key={key}>
                                {key === 'avatar' && value ? (
                                    <img src={value} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                ) : renderTextField(key, value)}
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" gutterBottom>Work Details</Typography>
                        {work && Object.entries(filterData(work)).map(([key, value]) => (
                            <div key={key}>
                                {key === 'optReceipt' && value ? (
                                    <a href={value} download>Download OPT Receipt</a>
                                ) : renderTextField(key, value)}
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" gutterBottom>References and Emergency Contacts</Typography>
                        {reference && (
                            <div>
                                {renderTextField("First Name", reference.firstName)}
                                {renderTextField("Middle Name", reference.middleName)}
                                {renderTextField("Last Name", reference.lastName)}
                                {renderTextField("Phone", reference.phone)}
                                {renderTextField("Email", reference.email)}
                                {renderTextField("Relationship", reference.relationship)}
                            </div>
                        )}
                        {emergencyContact && filterData(emergencyContact).map((contact, index) => (
                            <div key={index}>
                                {renderTextField("Emergency Contact First Name", contact.firstName)}
                                {renderTextField("Emergency Contact Middle Name", contact.middleName)}
                                {renderTextField("Emergency Contact Last Name", contact.lastName)}
                                {renderTextField("Emergency Contact Phone", contact.phone)}
                                {renderTextField("Emergency Contact Email", contact.email)}
                                {renderTextField("Emergency Contact Relationship", contact.relationship)}
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default UserInfoDialog