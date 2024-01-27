import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, Container } from '@mui/material';

const GridList = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = (item) => {
        setSelectedItem(item);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleGenerateToken = async (email, name) => {
        const response = await fetch('http://localhost:3001/api/generate-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        setOpenDialog(false);
    };

    return (
        <Container>
            <List>
                {data.map((item, index) => (
                    <ListItem key={index} divider button onClick={() => handleOpenDialog(item)}>
                        <ListItemText primary={item.name} secondary={`${item.email} - ${item.status}`} />
                    </ListItem>
                ))}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Details</DialogTitle>
                    <DialogContent>
                        {selectedItem && (
                            <div>
                                <p>Email: {selectedItem.email}</p>
                                <p>Status: {selectedItem.status}</p>
                                <p>Token: {selectedItem.token}</p>
                                <p>Create Date: {new Date(selectedItem.createDate).toLocaleString()}</p>
                                <p>Token Expires: {new Date(selectedItem.tokenExpires).toLocaleString()}</p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {selectedItem?.token ? 
                            ('') : 
                            (<Button onClick={() => handleGenerateToken(selectedItem.email, selectedItem.name)}>Generate token and send email</Button>)}
                        <Button onClick={handleCloseDialog}>Close</Button>  
                    </DialogActions>
                </Dialog>
            </List>
        </Container>
    );
};

const Registrations = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/registration', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    },[data])
        
   
    return (
        <div>
            <GridList data={data} />
        </div>
    );
    
};

export default Registrations;