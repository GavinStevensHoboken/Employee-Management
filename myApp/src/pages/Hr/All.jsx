import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProfiles } from '../../redux/visaOptHrSlice';
import { getJwtToken } from '../../utils/jwtTokenUtils';
import { Container, Button, TextField, List, ListItem, ListItemText, Dialog, Typography, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box} from '@mui/material';

// const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};

const All = () => {
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [pdfFile, setPdfFile] = useState('');
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
            return (firstName.toLowerCase().includes(keyword) ||
                   lastName.toLowerCase().includes(keyword) ||
                   (preferredName && preferredName.toLowerCase().includes(keyword))) && employee.nextStep === 1;
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
                        />
                    </ListItem>
                ))}
            </List>}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
                <DialogTitle id="employee-details-title">Documents</DialogTitle>
                <DialogContent>
                {selectedEmployee &&(
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

        </Container>
    );
};

export default All;