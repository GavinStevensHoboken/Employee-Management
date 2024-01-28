import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ onFilterSelect }) => {
    return (
        <div style={{ width: '200px', borderRight: '1px solid #ddd' }}>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button onClick={() => onFilterSelect('')}>
                    <ListItemText primary="All Applications" />
                </ListItem>
                <ListItem button onClick={() => onFilterSelect('Pending')}>
                    <ListItemText primary="Pending" />
                </ListItem>
                <ListItem button onClick={() => onFilterSelect('Approve')}>
                    <ListItemText primary="Approved" />
                </ListItem>
                <ListItem button onClick={() => onFilterSelect('Rejected')}>
                    <ListItemText primary="Rejected" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;