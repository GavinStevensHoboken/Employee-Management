import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box} from '@mui/material';

const employeesList = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
            middleName: 'A',
            preferredName: 'JD'
        },
        profilePicture: '',
        email: 'johndoe@example.com',
        ssn: '123-45-6789',
        dateOfBirth: new Date('1985-07-12'),
        gender: 'Male',
        address: {
            building: '100',
            street: 'Main St',
            city: 'Springfield',
            state: 'MA',
            zip: '01103'
        },
        contactInfo: {
            cellPhone: '555-1234',
            workPhone: '555-5678'
        },
        employment: {
            visaTitle: 'H1B',
            startDate: new Date('2020-01-15'),
            endDate: new Date('2023-01-14')
        },
        visaStatus: {
            nextStep: 'Upload doc'
        },
        document: ''
    },
    {
        name: {
            firstName: 'Emily',
            lastName: 'Johnson',
            middleName: 'B',
            preferredName: 'Em'
        },
        profilePicture: '',
        email: 'emilyj@example.com',
        ssn: '987-65-4321',
        dateOfBirth: new Date('1990-05-22'),
        gender: 'Female',
        address: {
            building: '200',
            street: 'Oak St',
            city: 'Centerville',
            state: 'CA',
            zip: '90210'
        },
        contactInfo: {
            cellPhone: '555-9876',
            workPhone: '555-6543'
        },
        employment: {
            visaTitle: 'L1',
            startDate: new Date('2021-06-01'),
            endDate: new Date('2024-05-31')
        },
        visaStatus: {
            nextStep: 'Upload doc'
        },
        document: ''
    },
    {
        name: {
            firstName: 'Michael',
            lastName: 'Amith',
            middleName: 'C',
            preferredName: 'Mike'
        },
        email: 'michaels@example.com',
        ssn: '555-00-1234',
        dateOfBirth: new Date('1982-11-30'),
        gender: 'Male',
        address: {
            building: '300',
            street: 'Elm St',
            city: 'Lakeview',
            state: 'NY',
            zip: '10001'
        },
        contactInfo: {
            cellPhone: '555-1111',
            workPhone: '555-2222'
        },
        employment: {
            visaTitle: 'B1',
            startDate: new Date('2019-09-01'),
            endDate: new Date('2022-08-31')
        },
        visaStatus: {
            nextStep: 'Waiting for approval'
        },
        document: 'this is a document'
    }
  ];

const VisaStatusManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        // try {
        //     const response = await fetch('/api/employees/visa-status/in-progress');
        //     const data = await response.json();
        //     setEmployees(data);
        // } catch (error) {
        //     console.error('Error fetching employees:', error);
        // }
    };

    const fetchDocument = async () => {

    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employeesList.filter(employee => {
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }



    return (
        <Container>
            <TextField label="Search Employees" fullWidth variant="outlined" margin="normal" value={searchTerm} onChange={handleSearchChange} />
            <List>
                {filteredEmployees.map((employee, index) => (
                    <ListItem key={employee.ssn} divider>
                        <ListItemText
                            primary={<MuiLink 
                                    component="button" 
                                    variant="body2" 
                                    onClick={() => handleClickOpen(employee)}
                                    >{employee.name.firstName}&nbsp;{employee.name.lastName}
                                </MuiLink>}
                            secondary={`Next Step: ${employee.visaStatus.nextStep}`}
                        />
                        <Button onClick={() => handleApprove(employee._id, documentId)}>Approve</Button>
                        <Button onClick={() => handleReject(employee)}>Reject</Button>
                        <Button onClick={() => handleSendNotification(employee._id)}>Send Notification</Button>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleClose} aria-labelledby="employee-details-title">
                <DialogTitle id="employee-details-title">Documents</DialogTitle>
                <DialogContent>
                {selectedEmployee && (
                    <div>
                        {selectedEmployee.document ? (<p>{selectedEmployee.document}</p>) : (<p>No Documents</p>)}
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