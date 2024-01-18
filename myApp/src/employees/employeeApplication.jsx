import React, { useState } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';

const steps = ['Personal Details', 'Legal and Work Information', 'References and Emergency Contacts'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Personal details form fields...';
        case 1:
            return 'Legal and work information form fields...';
        case 2:
            return 'References and emergency contacts form fields...';
        default:
            throw new Error('Unknown step');
    }
}

const EmployeeForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div style={{ maxWidth: '60%', margin: '30px auto' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>All steps completed</Typography>
                        <Button onClick={handleBack}>Back</Button>
                    </div>
                ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <div>
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
