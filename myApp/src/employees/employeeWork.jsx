import React, {useState} from 'react';
import {
    Typography, Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button, Grid, Box
} from '@mui/material';
import MaskedInput from "react-text-mask";

const WorkForm = () => {
    const [residencyStatus, setResidencyStatus] = useState('');
    const [workAuthorization, setWorkAuthorization] = useState('');
    const [visaTitle, setVisaTitle] = useState('');
    const [optReceipt, setOptReceipt] = useState(null);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const handleResidencyStatusChange = (event) => {
        const value = event.target.value;
        setResidencyStatus(value);
        setShowAdditionalFields(value === 'no');
    };

    const handleWorkAuthorizationChange = (event) => {
        setWorkAuthorization(event.target.value);
    };

    const handleVisaTitleChange = (event) => {
        setVisaTitle(event.target.value);
    };

    const handleFileChange = (event) => {
        setOptReceipt(event.target.files[0]);
    };
    const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <div ref={ref}>
                <MaskedInput
                    {...other}
                    mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    placeholderChar={'\u2000'}
                    showMask
                    onChange={onChange}
                />
            </div>
        );
    });

    return (
        <Paper style={{padding: '20px', margin: '20px auto', width: '800px', height: '500px', overflow: 'auto'}}>
            <Typography variant="h5">Work Authorization Form</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl component="fieldset" style={{ margin: '20px 0' }}>
                        <FormLabel component="legend">SSN</FormLabel>
                        <TextField
                            fullWidth
                            type="text"
                            InputProps={{
                                inputComponent: TextMaskCustom,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" style={{margin: '5px 0'}}>
                        <FormLabel component="legend">Permanent resident or citizen of the U.S.?</FormLabel>
                        <RadioGroup row name="residencyStatus" value={residencyStatus}
                                    onChange={handleResidencyStatusChange}>
                            <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                            <FormControlLabel value="no" control={<Radio/>} label="No"/>
                        </RadioGroup>
                        {showAdditionalFields && residencyStatus === 'yes' && (
                            <RadioGroup row name="residencyType" onChange={handleWorkAuthorizationChange}>
                                <FormControlLabel value="Green Card" control={<Radio/>} label="Green Card"/>
                                <FormControlLabel value="Citizen" control={<Radio/>} label="Citizen"/>
                            </RadioGroup>
                        )}
                        <Box style={{display: showAdditionalFields && residencyStatus === 'no' ? 'block' : 'none'}}>
                            <Typography>What is your work authorization?</Typography>
                            <RadioGroup row name="workAuthorization" value={workAuthorization}
                                        onChange={handleWorkAuthorizationChange}>
                                <FormControlLabel value="H1-B" control={<Radio/>} label="H1-B"/>
                                <FormControlLabel value="L2" control={<Radio/>} label="L2"/>
                                <FormControlLabel value="F1(CPT/OPT)" control={<Radio/>} label="F1(CPT/OPT)"/>
                                <FormControlLabel value="H4" control={<Radio/>} label="H4"/>
                                <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                            </RadioGroup>
                            {workAuthorization === 'F1(CPT/OPT)' && (
                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <Button variant="contained" component="label">
                                        Upload OPT Receipt
                                        <input type="file" hidden onChange={handleFileChange}/>
                                    </Button>
                                </div>
                            )}
                            {workAuthorization === 'other' && (
                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <TextField fullWidth label="Specify Visa Title" value={visaTitle}
                                               onChange={handleVisaTitleChange}/>
                                </div>
                            )}
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField type="date" label="Start Date" fullWidth
                                               InputLabelProps={{shrink: true}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField type="date" label="End Date" fullWidth
                                               InputLabelProps={{shrink: true}}/>
                                </Grid>
                            </Grid>
                        </Box>

                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default WorkForm;
