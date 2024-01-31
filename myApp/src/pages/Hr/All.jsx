import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Container, TextField, List, Typography} from '@mui/material';
import AllItem from './AllItem';
// const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};

const All = () => {
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const{
        data: employeeProfiles
    } = useSelector((state) => state.employeeProfiles);


    useEffect(() => {
        const result = employeeProfiles.filter(employee => {
            const { firstName, lastName, preferName } = employee.name;
            const keyword = searchTerm.toLowerCase();
            return (firstName.toLowerCase().includes(keyword) ||
                   lastName.toLowerCase().includes(keyword) ||
                   (preferName && preferName.toLowerCase().includes(keyword)));
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

    return (
      <Container>
        <TextField
          label="Search Employees"
          fullWidth
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Typography paragraph>All opt in progress</Typography>
        {filteredEmployees && (
          <List>
            {filteredEmployees.map((employee, index) => (
              <AllItem key={index} employee={employee} />
            ))}
          </List>
        )}
      </Container>
    );
};

export default All;