//Hr第四部分和员工第六部分没用到这个文件
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProfiles } from '../redux/visaOptHrSlice';

import { getJwtToken } from '../utils/jwtTokenUtils';

import { Container, Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box} from '@mui/material';

const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};

const VisaStatusManagement = () => {
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pdfFile, setPdfFile] = useState('');
    const [feedback, setFeedback] = useState('');
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

    const fetchDocument = async (employee) => {
        
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleApprove = async (employeeId, documentId) => {
        // Call API to approve document
    };

    const handleReject = (employee) => {
        // Open dialog to get feedback and then call API to reject document
        setSelectedEmployee(employee);
        setDialogOpen(true);
    };

    const handleRejectSubmit = async () => {
        // Call API to reject document with feedback
        setDialogOpen(false);
    };

    const handleSendNotification = async (employeeId) => {
        // Call API to send notification
    };

    const handleClickOpen = (employee) => {
        setSelectedEmployee(employee);
        if(employee?.document?.receipt?.link[0]?.data
            ){
                setPdfFile(employee.document.receipt.link[0].data);
            }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }



    return (
        <Container>
            <TextField label="Search Employees" fullWidth variant="outlined" margin="normal" value={searchTerm} onChange={handleSearchChange} />
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
                        <Button onClick={() => handleApprove(employee._id, documentId)}>Approve</Button>
                        <Button onClick={() => handleReject(employee)}>Reject</Button>
                        <Button onClick={() => handleSendNotification(employee._id)}>Send Notification</Button>
                    </ListItem>
                ))}
            </List>}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
                <DialogTitle id="employee-details-title">Documents</DialogTitle>
                <DialogContent>
                {selectedEmployee && (
                    <div>
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

export default VisaStatusManagement;