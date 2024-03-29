import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../redux/authActions';
import { getJwtToken } from '../utils/jwtTokenUtils';
import { fetchUserRole } from '../utils/userIdUtils';
import './navBar.css'

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [role, setRole] = useState('');
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    useEffect( () => {
        const token = getJwtToken();
        if (token) {
            fetchUserRole()
                .then(role => {
                    setRole(role)
                    dispatch(logIn())});
            
        }
    },[dispatch])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSign = () => {
        if (isLoggedIn) {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
            dispatch(logOut())
            navigate('/login');
        }else{
            navigate('/login');
        }
    };
    const handleEmployee = () => {
        handleClose();
        navigate('/employees');
    };
    const handleVisa = () => {
        handleClose();
        navigate('/visa');
        
    };
    const handleHiring = () => {
        handleClose();
        navigate('/management');
        
    };

    const handleRegistration = () => {
        handleClose();
        navigate('/registrations');
    }

    const handleProfile = () => {
        handleClose();
        navigate('/profiles')
    }

    const handleVisaSelf = () => {
        handleClose();
        navigate('/visafiles')
    }

    return (
        <AppBar className="app-bar" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            color="inherit"
                        >
                            Menu
                        </Button>
                        
                        { role && role === 'hr' ? 
                            (
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    sx={{display: 'inline-flex'}}
                                >   
                                    <MenuItem onClick={handleEmployee}>Employee Profiles</MenuItem>
                                    <MenuItem onClick={handleVisa}>Visa Managment</MenuItem>
                                    <MenuItem onClick={handleHiring}>Application Managment</MenuItem>
                                    <MenuItem onClick={handleRegistration}>Registration Managment</MenuItem>
                                </Menu>
                            ) :
                            (
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    sx={{display: 'inline-flex'}}
                                >   
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleVisaSelf}>Visa</MenuItem>
                                </Menu>
                            )
                        }
                        
                </Box>
                <Button color="inherit" onClick={handleSign}>{isLoggedIn ? 'Sign Out' : 'Sign In'}</Button>
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;