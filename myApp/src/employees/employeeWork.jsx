import React, {useEffect, useState} from 'react';
import {
    Typography, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button, Grid, Box
} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {updateField} from '../redux/workInformationSlice.js';
import {useNavigate} from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop.jsx";

const WorkForm = () => {
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.workInformation);
    const navigate = useNavigate();
    useEffect(()=>{
        if(formData.residencyStatus === 'no'){
            setShowAdditionalFields(true);
        }
    }, [])
    ScrollToTop();
    const handleResidencyStatusChange = (event) => {
        const {name, value} = event.target;
        setShowAdditionalFields(value === 'no');
        dispatch(updateField({field: name, value: value}));
    };
    const handleWorkAuthorizationChange = (event) => {
        const {name, value} = event.target;
        dispatch(updateField({field: name, value: value}));
    };

    const handleFileChange = async (event) => {
        const {name} = event.target;
        const file = event.target.files[0];
        if (file) {
            const fileUrl = await handleFileUpload(file);
            if (fileUrl) {
                dispatch(updateField({ field: name, value: fileUrl }));
                dispatch(updateField({ field: 'fileName', value: file.name }));
                console.log(file.name);
            }
        }
    };
    const handleChange = (event) => {
        const {name, value} = event.target;
        dispatch(updateField({field: name, value: value}));
    };
    const handleFileUpload = async (file) => {
        try {
            const uploadedFileUrl = await uploadFileToServer(file);
            return uploadedFileUrl;
        } catch (error) {
            dispatch(updateField({ field: 'fileName', value: "upload file error." }));
        }
    };

    async function uploadFileToServer(file) {
        const fileData = new FormData();
        fileData.append('file', file);
        try {
            const response = await fetch('http://localhost:3001/api/users/upload', {
                method: 'POST',
                body: fileData,
            });
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.json();
            return result.file.path;
        } catch (error) {
            console.error('Error during file upload:', error);
            throw error;
        }
    }
    const formatDateForInput = (isoDateString) => {
        return isoDateString.split('T')[0];
    };

    const handleNavigate = () => {
        navigate('/visafiles'); // Use the navigate function to change the route
    };
    return (
        <div>
            <Paper style={{padding: '20px', margin: '20px auto', width: '800px', height: '500px', overflow: 'auto'}}>
                <Typography variant="h5">Work Authorization Form</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" style={{margin: '20px 0'}}>
                            <FormLabel component="legend">SSN</FormLabel>
                            <TextField
                                fullWidth
                                type="text"
                                name="ssn"
                                value={formData.ssn}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" style={{margin: '5px 0'}}>
                            <FormLabel component="legend">Permanent resident or citizen of the U.S.?</FormLabel>
                            <RadioGroup row name="residencyStatus" value={formData.residencyStatus}
                                        onChange={handleResidencyStatusChange}>
                                <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                            {showAdditionalFields && formData.residencyStatus === 'yes' && (
                                <RadioGroup row name="residencyType" onChange={handleWorkAuthorizationChange}>
                                    <FormControlLabel value="Green Card" control={<Radio/>} label="Green Card"/>
                                    <FormControlLabel value="Citizen" control={<Radio/>} label="Citizen"/>
                                </RadioGroup>
                            )}
                            <Box
                                style={{display: showAdditionalFields && formData.residencyStatus === 'no' ? 'block' : 'none'}}>
                                <Typography>What is your work authorization?</Typography>
                                <RadioGroup row name="workAuthorization" value={formData.workAuthorization}
                                            onChange={handleWorkAuthorizationChange}>
                                    <FormControlLabel value="H1-B" control={<Radio/>} label="H1-B"/>
                                    <FormControlLabel value="L2" control={<Radio/>} label="L2"/>
                                    <FormControlLabel value="F1(CPT/OPT)" control={<Radio/>} label="F1(CPT/OPT)"/>
                                    <FormControlLabel value="H4" control={<Radio/>} label="H4"/>
                                    <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                </RadioGroup>
                                {formData.workAuthorization === 'F1(CPT/OPT)' && (
                                    <div style={{marginTop: '10px', marginBottom: '20px'}}>
                                        {/*<Button variant="contained" component="label">*/}
                                        {/*    Upload OPT Receipt*/}
                                        {/*    <input type="file" hidden onChange={handleFileChange} name="optReceipt"/>*/}
                                        {/*</Button>*/}
                                        <Button variant="contained" component="label" onClick={handleNavigate}>
                                            Upload OPT Receipt
                                        </Button>
                                        {formData.fileName && <span style={{marginLeft: '10px'}}>{formData.fileName}</span>}
                                    </div>
                                )}
                                {formData.workAuthorization === 'other' && (
                                    <div style={{marginTop: '10px', marginBottom: '20px'}}>
                                        <TextField fullWidth label="Specify Visa Title" value={formData.visaTitle} name="visaTitle"
                                                   onChange={handleChange}/>
                                    </div>
                                )}
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField type="date" label="Start Date" fullWidth name="startDate" value={formatDateForInput(formData.startDate)} onChange={handleChange}
                                                   InputLabelProps={{shrink: true}}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField type="date" label="End Date" fullWidth name="endDate" value={formatDateForInput(formData.endDate)} onChange={handleChange}
                                                   InputLabelProps={{shrink: true}}/>
                                    </Grid>
                                </Grid>
                            </Box>

                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default WorkForm;
