import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import EmployeeList from './employeeList';

const EmployeeProfiles = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        // Fetch employees data
        const fetchData = async () => {
                try {
                    const res = await fetch('http://localhost:3000/api/employees');
                    const fetchedEmployees = await res.json();
                    setEmployees(fetchedEmployees);
                } catch (err) {
                    console.log(err);
                }
        };
        fetchData();
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
      <div>Need Employees Data</div>
    </Container>
  );
};

export default EmployeeProfiles;