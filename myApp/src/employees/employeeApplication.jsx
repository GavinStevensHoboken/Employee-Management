import React, {useEffect, useState} from 'react';
import {Button, Stepper, Step, StepLabel, Typography, Paper, Grid} from '@mui/material';

const steps = ['Personal Details', 'Legal and Work Information', 'References and Emergency Contacts'];
import UserForm from "./employeeDetail.jsx";
import WorkForm from './employeeWork.jsx';
import ReferenceAndEmergencyContactsForm from './employeeOther.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { getJwtToken } from '../utils/jwtTokenUtils';
import {useLocation, useNavigate} from 'react-router-dom';
import SummaryComponent from '../user/summaryComponent.jsx';
import {updatePersonalInfo} from "../redux/personalInformationSlice.js";
import {updateWorkInfo} from "../redux/workInformationSlice.js";
import {updateEmergencyContacts, updateReferenceInfo} from "../redux/referenceAndEmergencyContactsSlice.js";
import {decrementStepNum, resetStepNum, setStepNum} from "../redux/actions/index.js";
const EmployeeForm = () => {
    const formData = useSelector((state) => state.personalInformation);
    const workData = useSelector((state) => state.workInformation);
    const reference = useSelector(state => state.referenceAndEmergencyContacts.reference);
    const emergencyContacts = useSelector(state => state.referenceAndEmergencyContacts.emergencyContacts);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState("");
    let query = useQuery();
    let id = query.get('id');
    const dispatch = useDispatch();
    const stepNum = useSelector(state => state.stepNum.stepNum);
    const [activeStep, setActiveStep] = useState(stepNum);

    const incrementStep = () => {
        dispatch(setStepNum(stepNum + 1));
    };
    const handleDecrement = () => {
        dispatch(decrementStepNum());
    };
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
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

    useEffect(() => {
        const fetchUserData = async (id) => {
            const token = getJwtToken();
            try {
                const response = await fetch(`http://localhost:3001/api/applications/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                dispatch(updatePersonalInfo(data.personal));
                dispatch(updateWorkInfo(data.work));
                dispatch(updateReferenceInfo(data.reference));
                dispatch(updateEmergencyContacts(data.emergencyContact));
            } catch (error) {
                console.error('Failed to fetch application data:', error);
            }
        };

        if (id) {
            fetchUserData(id);
        }
    }, [id]);

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
        const isValid = validateStep(activeStep);
        if (isValid) {
            incrementStep();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    useEffect(()=>{
        if(formErrors !== ""){
            alert(`Please fill in ${formErrors} before proceeding.`);
            setFormErrors("")
        }
    }, [formErrors])
    const validateStep = (step) => {
        switch (step) {
            case 0:
                return validateUserForm();
            case 1:
                return validateWorkForm();
            case 2:
                return validateReferenceAndEmergencyContactsForm();
            default:
                return false;
        }
    };
    const validateUserForm = () => {
        if (!formData) {
            setFormErrors('Form data');
            return false;
        }
        const requiredFields = ['firstName', 'lastName', 'cellPhone', 'state', 'streetAddress', 'city', 'country', 'dateOfBirth', 'postalCode', 'gender', 'email'];
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                setFormErrors(`${field}`);
                return false;
            }
        }
        return true;
    }

    const validateWorkForm = () => {
        if (!workData) {
            setFormErrors('Work data');
            return false;
        }
        const requiredFields = ['ssn', 'residencyStatus'];
        for (let field of requiredFields) {
            if (!workData[field] || workData[field].trim() === '') {
                setFormErrors(`${field}`);
                return false;
            }
        }
        return true;
    }
    const validateReferenceAndEmergencyContactsForm = () => {
        const requiredFields = ['firstName', 'lastName', 'relationship'];
        if(reference){
            for (let field of requiredFields) {
                if (!reference[field] || reference[field].trim() === '') {
                    setFormErrors(`${field}`);
                    return false;
                }
            }
        }
        if(emergencyContacts){
            for(let contact of emergencyContacts){
                for (let field of requiredFields) {
                    if (!contact[field] || contact[field].trim() === '') {
                        setFormErrors(`${field}`);
                        return false;
                    }
                }
            }
        }
        return true;
    }
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
                await updateApplicationStatus('submitted');
                alert('Data saved');
                navigate('/status');
            }
            console.log(result.message);
        } catch (error) {
            console.error('There was an error saving the data', error);
        }
    };
    const handleBack = () => {
        handleDecrement();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    const updateApplicationStatus = async (newApplicationStatus) => {
        const token = getJwtToken();
        try {
            const response = await fetch('http://localhost:3001/api/UpdateApplications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newApplicationStatus })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Successfully update application status.");
        } catch (error) {
            console.error('There was an error updating the apply status', error);
        }
    };

    const handleUpdate = async () => {
        const updates = [
            { type: 'personal', data: formData, endpoint: 'http://localhost:3001/api/users/updatePersonalInformation' },
            { type: 'work', data: workData, endpoint: 'http://localhost:3001/api/users/updateWorkInformation' }
        ];

        for (const update of updates) {
            try {
                const token = getJwtToken();
                const response = await fetch(update.endpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(update.data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} for ${update.type}`);
                }

                const result = await response.json();
                console.log(`${update.type} updated successfully:`, result);
            } catch (error) {
                console.error(`Failed to update ${update.type}:`, error);
            }
        }
        await updateApplyStatus('Pending');
        alert('Data updated');
        navigate('/status');
    };

    return (
        <div style={{maxWidth: '60%', margin: '80px auto'}}>
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
                            <SummaryComponent
                                formData={formData}
                                workData={workData}
                                reference={reference}
                                emergencyContacts={emergencyContacts}
                            />
                        </Paper>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <Button onClick={handleBack}>Back</Button>
                            {id ? (
                                <Button variant="contained" color="primary" onClick={handleUpdate}>
                                    Update
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
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
