import React, { useState } from 'react';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Link as MuiLink } from '@material-ui/core';

const EmployeeList = ({ employees }) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClickOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetail = () => {

  };

  return (
    <>
      <List>
        {employees.map(employee => (
          <ListItem key={employee.ssn} divider button onClick={() => handleClickOpen(employee)}>
            <ListItemText
              primary={<MuiLink component="button" variant="body2">
                {employee.name.firstName}&nbsp;
                {employee.name.lastName}&nbsp;&nbsp;&nbsp;
                ({employee.name.preferredName})</MuiLink>}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} aria-labelledby="employee-details-title">
        <DialogTitle id="employee-details-title">Summries</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <div>
              <p>Name: {selectedEmployee.name.firstName} {selectedEmployee.name.lastName}</p>
              <p>Email: {selectedEmployee.email}</p>
              <p>SSN: {selectedEmployee.ssn}</p>
              <p>Work Authorization Title: {selectedEmployee.employment.visaTitle}</p>
            </div>
          )}
        </DialogContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
          <DialogActions>
            <Button onClick={handleDetail} color="primary">
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