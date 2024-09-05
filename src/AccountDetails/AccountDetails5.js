import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import arrow from '../Assets/Images/arrow.png';
import question from '../Assets/Images/question.png';

const AccountDetails5 = () => {
  const handleNext = () => {
    console.log('Next');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Box
            component="button"
            sx={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => window.history.back()}
          >
            <img src={arrow} alt="Back" style={{ width: '28px', height: '28px' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '18px',
              fontWeight: 400,
              flexGrow: 1,
              textAlign: 'center',
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
          }}
        >
          Create New Password
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: '2rem',
            fontFamily: 'Segoe UI',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          Make a strong passcode that will be very hard to guess.
          View our security guidelines here.
        </Typography>

        <Box
          sx={{
            backgroundColor: '#E2E2E2',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 500,
              color: '#E4423F',
              marginBottom: '0.5rem',
            }}
          >
            Create Password
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 400,
              color: '1A1A1A',
            }}
          >
            **********
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#E2E2E2',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 500,
              color: '#E4423F',
              marginBottom: '0.5rem',
            }}
          >
            Current Password
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 400,
              color: '1A1A1A',
            }}
          >
            **********
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#E2E2E2',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={question}
            alt="Question"
            style={{ width: '28px', height: '28px', marginRight: '8px' }}
          />
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 400,
              color: '1A1A1A',
            }}
          >
            What do you need to make a secure password?
          </Typography>
        </Box>
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
          fontFamily: 'Segoe UI', 
          fontSize: '18px',
          fontWeight: 'normal',
          textTransform:'none'  
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default AccountDetails5;
