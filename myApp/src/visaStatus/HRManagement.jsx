import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@mui/material';
import Sidebar from './SideBarStatus'; 

const ApplicationSummary = () => {
    const [filter, setFilter] = useState('');
    const [personalList, setPersonalList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/api/applications?filter=${filter}`)
            .then(response => response.json())
            .then(data => setPersonalList(data))
            .catch(error => console.error('Error fetching personal info:', error));
    }, [filter]);
    const handleNameClick = (userId) => {
        navigate(`/management/${userId}`);
    };

    const handleFilterSelect = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Sidebar onFilterSelect={handleFilterSelect} />
                </Grid>
                <Grid item xs={9}>
                    <h4>Applications</h4>
                    <List>
                        {personalList.map(person => (
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