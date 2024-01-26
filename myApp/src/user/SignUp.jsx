import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FaceSharpIcon from '@mui/icons-material/FaceSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";
import {getJwtToken} from "../utils/jwtTokenUtils.js";
import { useLocation } from 'react-router-dom';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                Employee Management Project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const defaultTheme = createTheme();

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [UserNameError, setUserNameError] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let query = useQuery();
    let tokenName = query.get('token');

    useEffect(() => {
        async function fetchData() {
            const token = getJwtToken();
            try {
                const response = await fetch(`http://localhost:3001/api/registration/${tokenName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const responseBody = await response.json();
                    console.log(responseBody);

                    const tokenExpires = responseBody.tokenExpires;

                    const expirationDate = new Date(tokenExpires);

                    const currentDate = new Date();

                    if (currentDate > expirationDate) {
                        console.error('Token has expired');
                        navigate('/404');
                    }
                } else {
                    navigate('/404');
                    console.error('Response not OK', await response.text());
                }
            } catch (error) {
                console.error('Server error', error);
            }
        }
        fetchData();
    }, []);
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('userName'),
            type: 'emp',
            applyStatus: 'no'
        };

        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('user register success');
                const responseBody = await response.json();
                setEmailError(false);
                setEmailHelperText("");
                navigate('/login');
            }else if(response.status === 409){
                setEmailError(true);
                setEmailHelperText("Email address is already existed.");
                console.log('Email address already exist.');
            }else if(response.status === 410){
                setUserNameError(true);
                setEmailError(false);
                setEmailHelperText("");
                console.log('User name already exist.');
            }else {
                console.log('Registration failed.');
            }
        } catch (error) {
            console.error('Server error', error);
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!regex.test(password)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <FaceSharpIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                    error={UserNameError}
                                    helperText={UserNameError ? "Username already exist, please choose other name." : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={emailError || !isEmailValid}
                                    helperText={!isEmailValid ? "Please enter a valid email." : (emailError ? emailHelperText : "")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="new-password"
                                    value = {password}
                                    onChange={handlePasswordChange}
                                    error = {PasswordError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={PasswordError ? "Password must include uppercase, lowercase, number, and special character and at least 8 characters." : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label={
                                        <Typography variant="body2">
                                            I agree to the <Link href="#" variant="body2">Terms of Service</Link>.
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 1, mb: 2}}
                        >
                            Create Account
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="http://localhost:3000/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}