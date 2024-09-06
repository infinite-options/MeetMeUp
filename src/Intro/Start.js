import React from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
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
                paddingTop: '20vh',
            }}
        >
            <Button
                variant="text"
                onClick={handleNavigateStart}
                style={{
                    fontFamily: 'Inria Sans',
                    fontSize: '4vw', 
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography 
                    style={{ 
                        fontFamily: 'Inria Sans', 
                        fontSize: '4vw', 
                        fontWeight: 'bold', 
                        color: '#FFFFFF',
                    }}
                >
                    meet me up
                </Typography>
                
                <Typography 
                    style={{ 
                        fontFamily: 'Inria Sans', 
                        fontSize: '2.5vw',  
                        color: '#FFFFFF',
                        marginTop: '8px',
                    }}
                    variant='subtitle'
                >
                    optimized for mobile screens. click to begin
                </Typography>
            </Button>
        </Container>
    );
};

export default StartPage;
