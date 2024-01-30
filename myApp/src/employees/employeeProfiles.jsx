import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import EmployeeList from './employeeList';

const EmployeeProfiles = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        fetch('http://localhost:3001/api/applications')
        .then(response => response.json())
        .then(data => setEmployees(data))
        .catch(error => console.error('Error fetching personal info:', error));
        //setEmployees(employeesList);
    }, []);
    
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    
    // Can search by first, last, prefered name on every key press
    if (! employees){
            return null;
    }

    const filteredEmployees = employees.filter(employee => {
        const firstName = employee.firstName;
        const lastName = employee.lastName;
        const preferName = employee.preferName
        const keyword = searchTerm.toLowerCase();
        return firstName.toLowerCase().includes(keyword) ||
                lastName.toLowerCase().includes(keyword) ||
                (preferName && preferName.toLowerCase().includes(keyword));
        }).sort((a, b) => {
            // Sort by lastName
            if (a.lastName < b.lastName) {
                return -1; // a infront of b
            }
            if (a.lastName > b.lastName) {
                return 1; // b infront of a
            }
            return 0; // a and b position does not change
        });
    
  
  return (
    <Container style={{ marginTop: '64px' }}>
      <TextField
        label="Search Employees"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <EmployeeList employees={filteredEmployees} />
    </Container>
  );
};

export default EmployeeProfiles;