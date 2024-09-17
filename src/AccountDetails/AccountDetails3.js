import React from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; 

const AccountDetails3 = () => {
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
                marginRight: 'auto',
                marginLeft: 'auto'
                
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

        <TextField
            variant="filled"
            label="Email"
            defaultValue="lachlan@konnectdigital.io"
            InputProps={{
              disableUnderline: true, 
            }}
            sx={{
              fontFamily: 'Segoe UI',
              width:"100%",
              fontSize: '14px',
              fontWeight: 500,
              color: '#E4423F',
              marginBottom: '0.5rem',
              '@media (max-width: 600px)': {
                fontSize: '12px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputLabel-root': {
              color: '#E4423F',
              fontWeight:"bold",
              fontSize:'14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#E4423F', 
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(226,226,226,.5)', 
              borderRadius:"10px",
              borderStyle:"solid",
              borderWidth:"1px",
              borderColor:"#CECECE",
            },
            }}
          />
        <TextField
            variant="filled"
            label="Phone Number"
            defaultValue="0412 345 678"
            InputProps={{
              disableUnderline: true, 
            }}
            sx={{
              fontFamily: 'Segoe UI',
              width:"100%",
              fontSize: '14px',
              fontWeight: 500,
              color: '#E4423F',
              marginBottom: '0.5rem',
              '@media (max-width: 600px)': {
                fontSize: '12px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiInputLabel-root': {
              color: '#E4423F',
              fontWeight:"bold",
              fontSize:'14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#E4423F', 
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(226,226,226,.5)', 
              borderRadius:"10px",
              borderStyle:"solid",
              borderWidth:"1px",
              borderColor:"#CECECE",
            },
            }}
          />

      </Container>
    </Box>
  );
};

export default AccountDetails3;
