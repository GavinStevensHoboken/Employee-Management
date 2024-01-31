import React from 'react';
import { fetchUserRole } from '../utils/userIdUtils';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import './home.css';

function Home () {

    const [role, setRole] = useState();

    useEffect(() => {
        fetchUserRole()
        .then(role => {
            setRole(role);
        })
    }, [])

    return (
        <Container>
            <div className='home-container'>
                {role === 'hr' ?  <h1>Welcome to HR management</h1> : <h1>Welcome to Employee Management</h1>}
                {role === 'hr' && <p>You are currently logged in as a HR account</p>}
            </div>
        </Container>
    )
};

export default Home;