import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProfiles } from '../../redux/visaOptHrSlice';
import axios from 'axios';

import { getJwtToken } from '../../utils/jwtTokenUtils';

import { Container, Button, TextField, List, ListItem, ListItemText, Dialog, Typography, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box} from '@mui/material';

const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};

const Opt = () => {
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pdfFile, setPdfFile] = useState('');
    const [feedback, setFeedback] = useState('');
    const [curDocType, setCurDocType] = useState(undefined);
    const [enableNotification, setEnableNotification] = useState(true);
    const [enableAction, setEnableAction] = useState(undefined);
    const{
        data: employeeProfiles
    } = useSelector((state) => state.employeeProfiles);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfiles(getJwtToken()));
    }, [dispatch]);

    useEffect(() => {
        const result = employeeProfiles.filter(employee => {
            const { firstName, lastName, preferredName } = employee.name;
            const keyword = searchTerm.toLowerCase();
            return firstName.toLowerCase().includes(keyword) ||
                   lastName.toLowerCase().includes(keyword) ||
                   (preferredName && preferredName.toLowerCase().includes(keyword));
          }).sort((a, b) => {
            // Sort by lastName
            if (a.name.lastName < b.name.lastName) {
                return -1; // a infront of b
            }
            if (a.name.lastName > b.name.lastName) {
                return 1; // b infront of a
            }
            return 0; // a and b position does not change
          });
        setFilteredEmployees(result);
    }, [employeeProfiles, searchTerm])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleApprove = async (employee) => {
        // Call API to approve document
        let docType;
        if(employee?.document?.receipt?.status === 2){
            docType = 1;
        }else if(employee?.document?.ead?.status === 2){
            docType = 2;
        }else if(employee?.document?.i983?.status === 2){
            docType = 3;
        }else if(employee?.document?.i20?.status === 2){
            docType = 4;
        }
        try{
            const token = getJwtToken();
            const formData = new FormData();
            formData.append('employeeId', employee.usereId);
            formData.append('docType',docType);
            formData.append('status',1); // status 2 = reject for this api not dadabase
            formData.append('feedback', '');
            axios.put("http://localhost:3001/api/updateFile", formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
        }catch(error){
            alert('Action fails');
        }
    };

    const handleReject = (employee) => {
        // Open dialog to get feedback and then call API to reject document
        
            setSelectedEmployee(employee);
            setDialogOpen(true);
        
        
    };

    const handleRejectSubmit = async () => {
        // Call API to reject document with feedback
        let docType;
        if(selectedEmployee?.document?.receipt?.status === 2){
            docType = 1;
        }else if(selectedEmployee?.document?.ead?.status === 2){
            docType = 2;
        }else if(selectedEmployee?.document?.i983?.status === 2){
            docType = 3;
        }else if(selectedEmployee?.document?.i20?.status === 2){
            docType = 4;
        }
        try{
            const token = getJwtToken();
            const formData = new FormData();
            formData.append('employeeId', selectedEmployee.usereId);
            formData.append('docType',docType);
            formData.append('status',2); // status 2 = reject for this api not dadabase
            formData.append('feedback', feedback);
            await axios.put("http://localhost:3001/api/updateFile", formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
        }catch(error){
            alert('Action fails');
        }
        setDialogOpen(false);
    };

    const handleSendNotification = async (email) => {
        
        try{
            const token = getJwtToken();
            axios.post('http://localhost:3001/api/sendnotification', {email:email}, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        }catch(error){
            alert('sending email failed!');
        }
    };

    const handleClickOpen = (employee) => {
        setSelectedEmployee(employee);
        if(employee?.nextStep === 5){
            if(employee?.document?.receipt.status ===2 && employee?.document?.receipt?.link[0]?.data){
                setPdfFile(employee.document.receipt.link[0].data);
                setOpen(true);   
            }else if(employee?.document?.ead.status ===2 && employee?.document?.ead?.link[0]?.data){
                setPdfFile(employee.document.ead.link[0].data);
                setOpen(true);
            }else if(employee?.document?.i983.status ===2 && employee?.document?.i983?.link[0]?.data){
                setPdfFile(employee.document.i983.link[0].data);
                setOpen(true);
            }else if(employee?.document?.i20.status ===2 && employee?.document?.i20?.link[0]?.data){
                setPdfFile(employee.document.i20.link[0].data);
                setOpen(true);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    }



    return (
        <Container>
            <TextField label="Search Employees" fullWidth variant="outlined" margin="normal" value={searchTerm} onChange={handleSearchChange} />
            <Typography paragraph>
          All opt in progress
        </Typography>
            {filteredEmployees && <List>
                {filteredEmployees.map((employee, index) => (
                    <ListItem key={employee.ssn} divider>
                        <ListItemText
                            primary={<MuiLink 
                                    component="button" 
                                    variant="body2" 
                                    onClick={() => handleClickOpen(employee)}
                                    >{employee.name.firstName}&nbsp;{employee.name.lastName}
                                </MuiLink>}
                            secondary={`Next Step: ${nextStepMap[employee.nextStep]}`}
                        />
                        <Button onClick={() => handleApprove(employee)}>Approve</Button>
                        <Button onClick={() => handleReject(employee)}>Reject</Button>
                        {enableNotification && <Button onClick={() => handleSendNotification('gavinnaknight@gmail.com')}>Send Notification</Button>}
                    </ListItem>
                ))}
            </List>}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
                <DialogTitle id="employee-details-title">Documents</DialogTitle>
                <DialogContent>
                {selectedEmployee && (
                    <div>
                        <h1>{"Name: " + `${selectedEmployee.name.firstName} ${selectedEmployee.name.lastName}` }</h1>
                        <h2>{"Start date and End date: " + `From ${selectedEmployee.employment.startDate.slice(0,10)} to ${selectedEmployee.employment.endDate.slice(0,10)}` }</h2>
                        <h2>{"Remaining days: "+ selectedEmployee?.employment?.remainingdays + "days"}</h2>
                        {pdfFile ? (<iframe title="PDF Viewer" width="1200" height="600" src={`data:application/pdf;base64,${pdfFile}`} />
) : (<p>No Documents</p>)}
                    </div>
                )}
                </DialogContent>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Close
                    </Button>
                </DialogActions>
                </Box>
            </Dialog>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Reject Document</DialogTitle>
                <DialogContent>
                    <DialogContentText>Provide feedback for rejection:</DialogContentText>
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

        </Container>
    );
};

export default Opt;