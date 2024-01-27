import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchProfiles } from '../../redux/visaOptHrSlice';

import { getJwtToken } from '../../utils/jwtTokenUtils';

import { Container, Button, TextField, List, ListItem, ListItemText, Dialog, Typography, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box} from '@mui/material';
import OptItem from './OptItem';
// const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};

const Opt = () => {
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
            return firstName.toLowerCase().includes(keyword) ||
                   lastName.toLowerCase().includes(keyword) ||
                   (preferredName && preferredName.toLowerCase().includes(keyword)) && employee.nextStep !== 1;
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
            <TextField label="Search Employees" fullWidth variant="outlined" margin="normal" value={searchTerm} onChange={handleSearchChange} />
            <Typography paragraph>
          All opt in progress
        </Typography>
            {filteredEmployees && <List>
                {filteredEmployees.map((employee, index) => (
                    <OptItem key={index} employee={employee} />
                ))}
            </List>}


        </Container>
    );
};

export default Opt;