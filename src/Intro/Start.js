import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import './Start.css';

const StartPage = () => {
    const navigate = useNavigate(); 

    const handleNavigateStart = () => {
        navigate('/landing-page-1'); 
    };

    return (
        <Container
            maxWidth="false"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 0,
                backgroundColor: '#E4423F',
                borderRadius: 2,
                minHeight: '100vh',
                paddingTop: '0',
                paddingBottom: '0',
            }}
        >
            <Button
                variant="text"
                onClick={handleNavigateStart}
                style={{
                    fontFamily: 'Inria Sans',
                    fontSize: '4rem', // Increased font size for better readability
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px', // Added padding for better spacing
                }}
            >
                <Typography 
                    style={{ 
                        fontFamily: 'Inria Sans', 
                        fontSize: '3rem', 
                        fontWeight: 'bold', 
                        color: '#FFFFFF',
                        margin: '0', // Remove default margins
                    }}
                >
                    meet me up
                </Typography>
                
                <Typography 
                    style={{ 
                        fontFamily: 'Inria Sans', 
                        fontSize: '1rem', 
                        color: '#FFFFFF',
                        marginTop: '8px',
                        margin: '0', // Remove default margins
                    }}
                >
                    optimized for mobile screens. click to begin
                </Typography>
            </Button>
        </Container>
    );
};

export default StartPage;
