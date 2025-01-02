import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Start.css';

const StartPage = () => {
    const navigate = useNavigate();

    const handleNavigateStart = () => {
        navigate('/landing-page-1');
    };

    return (
        <Container
            maxWidth={false}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between', // Space between Typography and Box
                textAlign: 'center',
                backgroundColor: '#E4423F',
                minHeight: '100vh',
                padding: '40px 20px', // Added padding for some spacing from edges
            }}
        >
            {/* Title Typography - Centered Vertically */}
            <Typography
                style={{
                    fontFamily: 'Inria Sans',
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginTop: 'auto', // Automatically adjusts space above
                    marginBottom: 'auto', // Automatically adjusts space below
                    whiteSpace: 'nowrap',}}
            >
                meet me up
            </Typography>

            {/* Box containing Button and Log In link - Positioned at the bottom */}
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px', // Space between Button and "Log In"
                    marginBottom: '20px', // Added margin for some spacing from the bottom
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleNavigateStart}
                    style={{
                        width: '100%',
                        fontFamily: 'Inria Sans',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000000',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        padding: '10px 40px',
                        textTransform: 'none',
                    }}
                >
                    Get Started!
                </Button>
                <Typography
                    style={{
                        fontFamily: 'Inria Sans',
                        fontSize: '14px',
                        color: '#FFFFFF',
                    }}
                >
                    Already have an account?{' '}
                    <span
                        style={{
                            color: '#000000',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </span>
                </Typography>
            </Box>
        </Container>
    );
};

export default StartPage;
