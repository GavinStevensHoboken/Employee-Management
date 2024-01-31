import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Link as MuiLink } from '@mui/material';
import './employeeList.css';

const EmployeeList = ({ employees }) => {
  const [open, setOpen] = useState(false);
  const [workformdata, setWorkformdata] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [approvedEmployees, setApprovedEmployees] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    async function getApprovedEmployees(employees) {
      const statusChecks = employees.map(async (employee) => {
        const res = await fetch(`http://localhost:3001/api/users/status/${employee.userId}`);
        const status = await res.json();
        return { ...employee, status };
      });
    
      const employeesWithStatus = await Promise.all(statusChecks);
      const approvedEmployees = employeesWithStatus.filter((employee) => employee.status === 'Approve');
    
      return approvedEmployees;
    }
    
    getApprovedEmployees(employees).then((approvedEmployees) => {
      setApprovedEmployees(approvedEmployees);
    });
  },[employees])
  
  

  const handleClickOpen = async (employee) => {
    setSelectedEmployee(employee);
    try{
      const response = await fetch(`http://localhost:3001/api/workdata/${employee.userId}`);
      if (response.ok){
        const workdata = await response.json();
        setWorkformdata(workdata);
        setOpen(true);
      }
      
    }catch(err){
      console.error(err.message)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetail = (userId) => {
    navigate(`/employees/${userId}`);
  };
  
  return (
    <>
      <List>
        {approvedEmployees && approvedEmployees.map(employee => (
          <ListItem key={employee._id} divider onClick={() => handleClickOpen(employee)} className='listItem'>
            <ListItemText 
              primary={<MuiLink component="button" variant="body2" sx={{textDecoration: 'none'}}>
                {employee.firstName}&nbsp;
                {employee.lastName}&nbsp;&nbsp;&nbsp;
                ({employee.preferName ?  (employee.preferName) : ''})
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
              <p>Work Authorization Title: {workformdata.workAuthorization}</p>
              <p>SSN: {workformdata.ssn}</p>
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