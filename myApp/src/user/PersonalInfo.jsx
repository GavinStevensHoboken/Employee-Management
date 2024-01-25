import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Grid} from '@mui/material';
import NameSection from './NameSection';
import {getJwtToken} from "../utils/jwtTokenUtils.js";
import AddressSection from "./AddressSection.jsx";
import ContactSection from "./ContactSection.jsx";
import EmploymentSection from "./EmploymentSection.jsx";
import EmergencyContactSection from "./EmergencySection.jsx";
import DocumentSection from "./DocumentSection.jsx";

const PersonalInformationPage = () => {
    const [userData, setUserData] = useState({
        personal: null,
        work: null,
        reference: null,
        emergencyContact: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchUserId() {
            const token = getJwtToken();
            try {
                const response = await fetch('http://localhost:3001/api/users/getId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                return data.userId;

            } catch (error) {
                console.error('Failed to fetch user ID:', error);
                throw error;
            }
        }

        async function fetchUserData(userId) {
            try {
                const response = await fetch(`http://localhost:3001/api/applications/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData({
                    personal: data.personal,
                    work: data.work,
                    reference: data.reference,
                    emergencyContact: data.emergencyContact,
                });
            } catch (error) {
                console.error('Failed to fetch application data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        (async () => {
            try {
                const userId = await fetchUserId();
                await fetchUserData(userId);
            } catch (error) {
                setLoading(false);
                setError('Failed to fetch data');
            }
        })();
    }, []);


    if (loading) {
        return (
            <Container maxWidth="sm"
                       style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container maxWidth="1200px">
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <NameSection data={{ ...userData.personal, work: userData.work }} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ContactSection data={userData.personal}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AddressSection data={userData.personal}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <EmploymentSection data={userData.work}/>
                        </Grid>
                        <Grid item xs={12}>
                            {/*<DocumentSection data={userData.personal} />*/}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <EmergencyContactSection data={userData.emergencyContact}/>
                </Grid>
            </Grid>

        </Container>
    );
};

export default PersonalInformationPage;
