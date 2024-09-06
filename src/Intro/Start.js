import React from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import './Start.css';

const StartPage = () => {
    const navigate = useNavigate(); 

    const handleNavigateStart= () => {
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
            }}
            // onClick={()=> {
            //     handleNavigateStart();
            // }}
        >
            <Button
                variant="text"
                onClick={handleNavigateStart}
                style={{
                    fontFamily: 'Inria Sans',
                    fontSize: '64px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    padding: 1,
                    textTransform: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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

                <Typography 
                    style={{ 
                    fontFamily: 'Inria Sans', 
                    fontSize: '16px',  
                    color: '#FFFFFF',
                    marginTop: '2px',
                    }}
                    variant='subtitle'
                >
                    optimized for mobile screens. click to begin
                </Typography>
                </Button>
            {/* <Typography 
                style={{ 
                    fontFamily: 'Inria Sans', 
                    fontSize: '64px', 
                    fontWeight: 'bold', 
                    color: '#FFFFFF',
                }}
                >
                    meet me up
                </Typography>
                <Typography 
                    style={{ 
                        fontFamily: 'Inria Sans', 
                        fontSize: '64px', 
                        fontWeight: 'bold', 
                        color: '#FFFFFF',
                    }}
                    variant='subtitle'
                >
                    optimized for mobile screens. click to begin
                </Typography>
                */}
        </Container>
    );
};

export default StartPage;