import React, {useState} from 'react';
import {TextField, Button, Stepper, Step, StepLabel, Typography, Paper, Grid} from '@mui/material';

const steps = ['Personal Details', 'Legal and Work Information', 'References and Emergency Contacts'];
import UserForm from "./employeeDetail.jsx";
import WorkForm from './employeeWork.jsx';
import ReferenceAndEmergencyContactsForm from './employeeOther.jsx'
import { useSelector} from 'react-redux';

const EmployeeForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const formData = useSelector((state) => state.personalInformation);
    const workData = useSelector((state) => state.workInformation);
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const formatFieldName = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };
    const renderSummary = () => {
        return (
            <div>
                <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>Summary</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography>Personal Details:</Typography>
                        {Object.entries(formData).map(([fieldName, value]) => (
                            <Typography key={fieldName}>
                                {formatFieldName(fieldName)}: {value || 'Not provided'}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography>Work Details:</Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography>References and Emergency Contacts:</Typography>
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
                        <Button onClick={handleBack}>Back</Button>
                    </div>
                ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
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
