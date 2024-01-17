import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import EmployeeList from './employeeList'; // Import the EmployeeList component

const EmployeeProfiles = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      // Fetch employees data from your backend and set it to state
      // setEmployees(fetchedEmployees);
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <Container>
      <TextField
        label="Search Employees"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* <EmployeeList employees={filteredEmployees} /> */}
      <div>Test</div>
    </Container>
  );
};

export default EmployeeProfiles;