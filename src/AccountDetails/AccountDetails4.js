import React from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import arrow from '../Assets/Images/arrow.png';

const AccountDetails4 = () => {
  const handleNext = () => {
    console.log('Next');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '2rem',
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '8px',
          
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Box
            component="button"
            sx={{
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
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '18px',
              fontWeight: 400,
              textAlign: 'center',
              flex: 1,
              
            }}
          >
            Update Password
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Segoe UI',
            fontSize: '18px',
            fontWeight: 400,
            marginBottom: '1rem',
            
          }}
        >
          Security
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: '2rem',
            fontFamily: 'Segoe UI',
            fontSize: '14px',
            fontWeight: 400,
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
          }}
        >
          Please verify your identity by providing us your current password for your meet me up account.
        </Typography>

        <TextField
            variant="filled"
            label="Current Password"
            type="password"
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

      <Button
        variant="contained"
        color="error"
        onClick={handleNext}
        sx={{
          marginTop: '16px',
          width: '80%',
          maxWidth: '384px',
          height: '44px',
          borderRadius: '30px',
          backgroundColor: '#E4423F',
          textTransform:'none',
          fontFamily: 'Segoe UI', 
      fontSize: '18px',
      fontWeight: 'normal',

        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default AccountDetails4;
