import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, TextField, List, ListItem, DialogContentText, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container  } from '@mui/material';
import { getJwtToken } from '../utils/jwtTokenUtils';
import { useNavigate } from 'react-router-dom';

const UserInfoDialog = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3001/api/applications/${userId}`)
                .then(response => response.json())
                .then(data => setUserInfo(data))
                .catch(error => console.error('Error fetching user info:', error));

            fetch(`http://localhost:3001/api/users/${userId}`)
                .then(response => response.json())
                .then(data => setUser(data))
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

    const handleApprove = async () => {
        const token = getJwtToken();
        try {
            const response = await fetch(`http://localhost:3001/api/users/updateStatus/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ applyStatus: "Approve" })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const res = await fetch(`http://localhost:3001/api/users/updateFeedback/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ feedback: "Your application has been approved!" })
            }); 

            if (!res.ok){
                throw new Error(`HTTP error! Feedback status: ${res.status}`);
            }

            navigate('/management')
        } catch (error) {
            console.error('There was an error updating the apply status', error);
        }
    }

    const handleReject = async () => {
        setDialogOpen(true)
    }

    const handleRejectSubmit = async () => {
        const token = getJwtToken();
        try {
            const response = await fetch(`http://localhost:3001/api/users/updateStatus/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ applyStatus: "Rejected" })
            }); 

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.ok){
                const res = await fetch(`http://localhost:3001/api/users/updateFeedback/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ feedback: feedback })
                }); 
                if (!res.ok){
                    throw new Error(`HTTP error! Feedback status: ${res.status}`);
                }
            }

            navigate('/management')
        } catch (error) {
            console.error('There was an error updating the apply status', error);
        }
        setDialogOpen(false);
    }
    
    const handleFeedback = () => {
        setOpen(true);
    };

    const handleFeedbackSubmit = async () => {
        const token = getJwtToken();
        try{
            const res = await fetch(`http://localhost:3001/api/users/updateFeedback/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ feedback: feedback })
            }); 

            if (!res.ok){
                throw new Error(`HTTP error! Feedback status: ${res.status}`);
            }
            navigate('/management')
        } catch (error) {
            console.error('There was an error updating the feedbacks', error);
        }
    };

    return (
        <Container style={{ marginTop: '64px' }}>
            <Paper style={{ padding: 16, marginTop: 16 }}>
                <Typography variant="h6" gutterBottom>Summary</Typography>
                <Grid container spacing={3}>
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
                        {emergencyContact && emergencyContact.map((val) => {
                            return(
                                <div key={val._id}>
                                    {renderTextField("Emergency Contact First Name", val.firstName)}
                                    {renderTextField("Emergency Contact Middle Name", val.middleName)}
                                    {renderTextField("Emergency Contact Last Name", val.lastName)}
                                    {renderTextField("Emergency Contact Phone", val.phone)}
                                    {renderTextField("Emergency Contact Email", val.email)}
                                    {renderTextField("Emergency Contact Relationship", val.relationship)}
                                </div>
                            )
                        })}
                    </Grid>
                    {user && user.applyStatus === "Pending" ?  (<Button sx={{margin: '15px'}} onClick={() => handleFeedback()}>Give Feedback</Button>) : ('')}
                    {user && user.applyStatus === "Pending" ?  (<Button sx={{margin: '15px'}} onClick={() => handleApprove()}>Approve</Button>) : ('')}
                    {user && user.applyStatus === "Pending" ?  (<Button sx={{margin: '15px'}} onClick={() => handleReject()}>Reject</Button>) : ('')}
                    
                </Grid>
            </Paper>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Reject with Feedbacks</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please Provide Feedbacks for Rejection:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="feedback"
                        label="Feedback"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleRejectSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Feedbacks</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please Provide Feedbacks:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="feedback"
                        label="Feedback"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleFeedbackSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default UserInfoDialog