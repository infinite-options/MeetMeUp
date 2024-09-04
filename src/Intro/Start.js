import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './Start.css';

const StartPage = () => {
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
            }}
        >
            <Typography 
                style={{ 
                    fontFamily: 'Inria Sans', 
                    fontSize: '64px', 
                    fontWeight: 'bold', 
                    color: '#FFFFFF',
                }}
            >
                meet me up
            </Typography>
        </Container>
    );
};

export default StartPage;
