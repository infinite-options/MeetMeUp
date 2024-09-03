import React from 'react';

import { Container, Box, Typography, Grid, Button } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; 

const SettingsPage = () => {
  const handleNext = () => {
    console.log('Next');
  };
  return (
    <Box 
      style={{
        backgroundColor: '#FFFFFF', 
        minHeight: '100vh', 
        margin: 0, 
        padding: 0 
      }}>
      <Container
        maxWidth="sm"
        style={{
          marginTop: '2rem',
          backgroundColor: '#FFFFFF', 
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Box
            component="button"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              marginRight: '1rem',
              display: 'flex', 
              alignItems: 'center',
            }}
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="Back"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </Box>
          <Typography variant="h6" 
            style={{ 
                fontFamily: 'Segoe UI', 
                fontSize: '18px',
                fontWeight: 400, 
                flexGrow:1
            }}>
            Update Password
          </Typography>
        </Box>

        <Typography variant="body1" 
          style={{ 

            fontFamily: 'Segoe UI', 
            fontSize: '18px',
            fontWeight: 400, 
          }}>
          Create New Password
        </Typography>

        <Typography variant="body1" style={{ 
            marginBottom: '2rem',
            fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400, 
          }}>
          Make a strong passcode that will be very hard to guess. 
          View our security guidelines here.
        </Typography>

        <Box
          style={{
            backgroundColor: '#E2E2E2',
            width: '354px',
            height: '50px',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="body2" style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 500,backgroundColor:'#E2E2E2', color: '#E4423F', marginBottom: '0.5rem' }}>
            Create Password
          </Typography>
          <Typography variant="body2"style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400,backgroundColor:'#E2E2E2', color: '1A1A1A' }}>**********</Typography>
        </Box>
        
        <Box
          style={{
            backgroundColor: '#E2E2E2',
            width: '354px',
            height: '50px',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="body2" style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 500,backgroundColor:'#E2E2E2', color: '#E4423F', marginBottom: '0.5rem' }}>
            Current Password
          </Typography>
          <Typography variant="body2"style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400,backgroundColor:'#E2E2E2', color: '1A1A1A' }}>**********</Typography>
        </Box>

        <Box
          style={{
            backgroundColor: '#E2E2E2',
            width: '354px',
            height: '30px',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <Typography variant="body2"style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400,backgroundColor:'#E2E2E2', color: '1A1A1A' }}>What do you need to make a secure password? </Typography>
        </Box>

        
      </Container>
      <Button
            variant="contained"
            color="error"
            
            onClick={handleNext}
            style={{ 
              marginTop: '16px',
              width: '130px',
              height: '45px',
              borderRadius: '30px',
              marginLeft:'500px',
            }}
          >
            Next
          </Button>
    </Box>
  );
};

export default SettingsPage;
