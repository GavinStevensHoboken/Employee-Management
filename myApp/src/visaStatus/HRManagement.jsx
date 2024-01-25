import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText, TextField } from '@mui/material';
import Sidebar from './SideBarStatus'; 

const ApplicationSummary = () => {
    const [filter, setFilter] = useState('');
    const [personalList, setPersonalList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/api/applications?filter=${filter}`)
            .then(response => response.json())
            .then(data => setPersonalList(data))
            .catch(error => console.error('Error fetching personal info:', error));
    }, [filter]);

    const filteredEmployees = personalList.filter(employee => {
        const firstName = employee.firstName;
        const lastName = employee.lastName;
        const keyword = searchTerm.toLowerCase();
        return firstName.toLowerCase().includes(keyword) ||
                lastName.toLowerCase().includes(keyword) //||
                //  (preferredName && preferredName.toLowerCase().includes(keyword));
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleNameClick = (userId) => {
        navigate(`/management/${userId}`);
    };

    const handleFilterSelect = (newFilter) => {
        setFilter(newFilter);
    };

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
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Sidebar onFilterSelect={handleFilterSelect} />
                </Grid>
                <Grid item xs={9}>
                    <h4>Applications</h4>
                    <List>
                        {filteredEmployees.map(person => (
                            <ListItem 
                                button
                                divider
                                key={person._id} 
                                onClick={() => handleNameClick(person.userId)}
                            >
                                <ListItemText primary={`${person.firstName} ${person.lastName}`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ApplicationSummary;