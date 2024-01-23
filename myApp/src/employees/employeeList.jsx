import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Link as MuiLink } from '@mui/material';
import './employeeList.css';

const EmployeeList = ({ employees }) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetail = (userId) => {
    navigate(`/management/${userId}`);
  };

  return (
    <>
      <List>
        {employees.map(employee => (
          <ListItem key={employee._id} divider onClick={() => handleClickOpen(employee)} className='listItem'>
            <ListItemText 
              primary={<MuiLink component="button" variant="body2" >
                {employee.firstName}&nbsp;
                {employee.lastName}&nbsp;&nbsp;&nbsp;
                {/* ({employee.name.preferredName ?  (employee.name.preferredName) : ''}) */}
                </MuiLink>}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} aria-labelledby="employee-details-title">
        <DialogTitle id="employee-details-title">Summries</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <div>
              <p>Name: {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
              {/* <p>Work Authorization Title: {selectedEmployee.employment.visaTitle}</p> */}
              {/* <p>SSN: {selectedEmployee.ssn}</p> */}
              <p>Cell Phone: {selectedEmployee.cellPhone}</p>
              <p>Email: {selectedEmployee.email}</p>
            </div>
          )}
        </DialogContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
          <DialogActions>
            <Button onClick={() => handleDetail(selectedEmployee.userId)} color="primary">
              Detail
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default EmployeeList;