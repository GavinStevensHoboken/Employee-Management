import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { fetchProfiles } from '../../redux/visaOptHrSlice';

import { getJwtToken } from '../../utils/jwtTokenUtils';

import {
    Box, Drawer, CssBaseline, Toolbar, List, ListItem, ListItemButton, ListItemText,
    } from '@mui/material';
import Opt from './Opt';
import All from './All';
const nextStepMap = {0:'Done',1:'opt receipt', 2: 'EAD card', 3: 'i983', 4:'i20', 5: 'Waiting for approval'};
const drawerWidth = 240;

const VisaStatusManagement = () => {
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchProfiles(getJwtToken()));
    }, [dispatch]);

    const handleClick = (id) => {
        setProgress(id);
    }
    
    return (
        <>
        <Box sx={{ display: 'flex', zIndex:1 }}>
        <CssBaseline />
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="top"
      >
         <Toolbar />
        
        <List>
          {['In progress', 'All'].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton id={index} onClick={() => handleClick(index)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {progress ? <All /> : <Opt />} 
      </Box>
    </Box>
           
        </>
    );
};

export default VisaStatusManagement;