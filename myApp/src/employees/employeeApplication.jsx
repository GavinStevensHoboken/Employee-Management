import React, {useEffect, useState} from 'react';
import {Button, Stepper, Step, StepLabel, Typography, Paper, Grid} from '@mui/material';

const steps = ['Personal Details', 'Legal and Work Information', 'References and Emergency Contacts'];
import UserForm from "./employeeDetail.jsx";
import WorkForm from './employeeWork.jsx';
import ReferenceAndEmergencyContactsForm from './employeeOther.jsx'
import { useSelector} from 'react-redux';
import { getJwtToken } from '../utils/jwtTokenUtils';
const EmployeeForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const formData = useSelector((state) => state.personalInformation);
    const workData = useSelector((state) => state.workInformation);
    const reference = useSelector(state => state.referenceAndEmergencyContacts.reference);
    const emergencyContacts = useSelector(state => state.referenceAndEmergencyContacts.emergencyContacts);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        async function fetchUserId() {
            const token = getJwtToken();
            try {
                const response = await fetch('http://localhost:3001/api/users/getId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUserId(data.userId);

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }

        fetchUserId();
    }, []);

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <UserForm />;
            case 1:
                return <WorkForm />;
            case 2:
                return <ReferenceAndEmergencyContactsForm />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleSubmit = async () => {
        const formDataWithUserId = { ...formData, userId };
        const workDataWithUserId = { ...workData,  userId };
        const referenceWithUserId = { ...reference,  userId };
        const emergencyContactsWithUserId = emergencyContacts.map(contact => ({ ...contact, userId: userId }));
        try {
            const response = await fetch('http://localhost:3001/api/users/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalInformation: formDataWithUserId,
                    workInformation: workDataWithUserId,
                    references: {
                        referenceWithUserId,
                        emergencyContactsWithUserId
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json()
            if (result.message === 'Data saved successfully') {
                await updateApplyStatus('Pending');
            }
            console.log(result.message);
        } catch (error) {
            console.error('There was an error saving the data', error);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const formatFieldName = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };
    const updateApplyStatus = async (newApplyStatus) => {
        const token = getJwtToken();
        try {
            const response = await fetch('http://localhost:3001/api/users/updateStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ applyStatus: newApplyStatus })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('There was an error updating the apply status', error);
        }
    };

    const renderSummary = () => {
        return (
            <div>
                <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>Summary</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography>Personal Details:</Typography>
                        {Object.entries(formData).map(([fieldName, value]) => {
                            if (fieldName === 'avatar' && value) {
                                return (
                                    <div key={fieldName}>
                                        <Typography  component="div">{formatFieldName(fieldName)}:</Typography>
                                        <img src={value} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </div>
                                );
                            } else {
                                return (
                                    <Typography  component="div" key={fieldName}>
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
                                    <Typography  component="div" key={fieldName}>
                                        {formatFieldName(fieldName)}: <a href={value} download>Download OPT Receipt</a>
                                    </Typography>
                                );
                            } else {
                                return (
                                    <Typography  component="div" key={fieldName}>
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
                        {emergencyContacts.map((contact, index) => (
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


    return (
        <div style={{maxWidth: '60%', margin: '30px auto'}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between'}}>
                {activeStep === steps.length ? (
                    <div style={{margin: '20px'}}>
                        <Paper style={{
                        padding: '20px',
                        margin: '20px auto',
                        width: '800px',
                        height: '500px',
                        overflow: 'auto'
                    }}>
                        {renderSummary()}
                    </Paper>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <Button onClick={handleBack}>Back</Button>
                            <Button  variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Typography  component="div">{getStepContent(activeStep)}</Typography>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeForm;
