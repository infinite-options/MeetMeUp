import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; 

const SettingsPage = () => {
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
            Settings
          </Typography>
        </Box>

        <Typography variant="body1" 
          style={{ 

            fontFamily: 'Segoe UI', 
            fontSize: '18px',
            fontWeight: 400, 
          }}>
          Account Details
        </Typography>

        <Typography variant="body1" style={{ 
            marginBottom: '2rem',
            fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400, 
          }}>
          We need some basic account details to help verify your identity and account.
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
            Email
          </Typography>
          <Typography variant="body2"style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400,backgroundColor:'#E2E2E2', color: '1A1A1A' }}>lachlan@konnectdigital.io</Typography>
        </Box>

        <Box
          style={{
            backgroundColor: '#E2E2E2',
            width: '354px',
            height: '50px',
            padding: '1rem',
            borderRadius: '8px',
            marginRight: '50px'
          }}
        >
          <Typography variant="body2" style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 500,backgroundColor:'#E2E2E2', color: '#E4423F', marginBottom: '0.5rem' }}>
            Phone Number
          </Typography>
          <Typography variant="body2"style={{ fontFamily: 'Segoe UI', 
            fontSize: '14px',
            fontWeight: 400,backgroundColor:'#E2E2E2', color: '1A1A1A' }}>0412 345 678</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SettingsPage;
