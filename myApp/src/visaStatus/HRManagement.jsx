import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container  } from '@mui/material';

const PersonalInfoList = ({onNameClick}) => {
    const [personalList, setPersonalList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/applications')
            .then(response => response.json())
            .then(data => setPersonalList(data))
            .catch(error => console.error('Error fetching personal info:', error));
    }, []);

    return (
        <Container>
            <h4>Applications</h4>
            <List>
                {personalList.map(person => (
                    <ListItem 
                        button
                        divider
                        key={person._id} 
                        onClick={() => onNameClick(person.userId)}
                    >
                        <ListItemText primary={`${person.firstName} ${person.lastName}`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

const ApplicationSummary = () => {
    const navigate = useNavigate();

    const handleNameClick = (userId) => {
        console.log(userId)
        navigate(`/management/${userId}`);
    };

    return (
        <div>
            <PersonalInfoList onNameClick={handleNameClick} />
        </div>
    );
};

export default ApplicationSummary;