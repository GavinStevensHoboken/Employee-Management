import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const VisaStatusManagement = () => {
    const [employees, setEmployees] = useState([]);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.name.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <div>
            <TextField label="Search Employees" variant="outlined" value={searchTerm} onChange={handleSearchChange} />
            <List>
                {filteredEmployees.map((employee) => (
                    <ListItem key={employee._id} divider>
                        <ListItemText
                            primary={`${employee.name.firstName} ${employee.name.lastName}`}
                            secondary={`Next Step: ${employee.visaStatus.nextStep}`}
                        />
                        {/* Add buttons for actions based on the next step */}
                        {/* Example: */}
                        {/* <Button onClick={() => handleApprove(employee._id, documentId)}>Approve</Button> */}
                        {/* <Button onClick={() => handleReject(employee)}>Reject</Button> */}
                        {/* <Button onClick={() => handleSendNotification(employee._id)}>Send Notification</Button> */}
                    </ListItem>
                ))}
            </List>
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
        </div>
    );
};

export default VisaStatusManagement;