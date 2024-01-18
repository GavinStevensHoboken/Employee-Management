import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../redux/authActions';
import { getJwtToken } from '../utils/jwtTokenUtils';
import './navBar.css'

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    useEffect(() => {
        const token = getJwtToken();
        if (token) {
            dispatch(logIn());
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
        }else{
            navigate('/login');
        }
    };
    const handleEmployee = () => {
        navigate('/employees')
    };
    const handleVisa = () => {
        
    };
    const handleHiring = () => {
        
    };

    return (
        <AppBar className="app-bar" position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <div className='menu'>
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
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                            'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleEmployee}>Employee Profiles</MenuItem>
                            <MenuItem onClick={handleVisa}>Visa Status Management</MenuItem>
                            <MenuItem onClick={handleHiring}>Hiring Management</MenuItem>
                        </Menu>
                    </div>
                </Box>
                <Button color="inherit" onClick={handleSign}>{isLoggedIn ? 'Sign Out' : 'Sign In'}</Button>
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;