import React, {useState} from 'react';
import {
    TextField, Paper, Button, Radio, RadioGroup, FormControlLabel, FormControl,
    FormLabel, Grid, Select, MenuItem, Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../redux/personalInformationSlice.js';

const UserForm = ({ updateFormData }) => {
    const [userDetails, setUserDetails] = useState({});
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.personalInformation);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ field: name, value: value }));
    };

    return (
        <Paper style={{ margin: '15px', padding: '15px' }}>
            <Typography variant="h5" component="h3" style={{ marginBottom: '20px' }}>
                Personal Information Form
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Select fullWidth variant="outlined" defaultValue="" name="title" value={formData.title} onChange={handleChange}>
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth variant="outlined" label="First Name" name="firstName"
                               value={formData.firstName} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField fullWidth variant="outlined" label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField fullWidth variant="outlined" label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} InputLabelProps={{ shrink: true }} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Street Address" name="streetAddress" value={formData.streetAddress} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Street Address Line 2" name="streetAddress2" value={formData.streetAddress2} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth variant="outlined" label="City" name="city" value={formData.city} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth variant="outlined" label="State" name="state" value={formData.state} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth variant="outlined" label="Postal / Zip Code" name="postalCode" value={formData.postalCode} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select fullWidth variant="outlined" defaultValue="" name="country" value={formData.country} onChange={handleChange}>
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="CAN">Canada</MenuItem>
                        <MenuItem value="MEX">Mexico</MenuItem>
                        <MenuItem value="UK">United Kingdom</MenuItem>
                        <MenuItem value="GER">Germany</MenuItem>
                        <MenuItem value="FRA">France</MenuItem>
                        <MenuItem value="IND">India</MenuItem>
                        <MenuItem value="CHN">China</MenuItem>
                        <MenuItem value="JPN">Japan</MenuItem>
                        <MenuItem value="BRA">Brazil</MenuItem>
                        <MenuItem value="AUS">Australia</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="noAnswer" control={<Radio />} label="I do not wish to answer" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Email" name="email" value={formData.email} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth variant="outlined" label="Home Telephone Number" name="homePhone" value={formData.homePhone} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth variant="outlined" label="Cell Phone Number" name="cellPhone" value={formData.cellPhone} onChange={handleChange}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserForm;