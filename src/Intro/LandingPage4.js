import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image4 from "../Assets/Images/image4.png";
import './LandingPage.css';

const LandingPage4 = () => {
  const navigate = useNavigate();

  const handleTrialNavigate = () => {
    navigate('/trial');
  };

  const handleSkipClick = () => {
    navigate('/accountSetup1Login');
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: `url(${image4})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        padding: 0,
      }}
    >
      {/* Card with content */}
      <Box
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '400px',
          backgroundColor: 'rgb(208 205 205)',
          borderRadius: '30px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
          padding: '10px',
          textAlign: 'center',
        }}
      >
         {/* Pagination Indicator */}
         <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 4px',
            }}
          ></span>
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 4px',
            }}
          ></span>
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 4px',
            }}
          ></span>
            <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#E4423F',
              borderRadius: '50%',
              display: 'inline-block',
              margin: '0 4px',
            }}
          ></span>
        </Box>

        {/* Title */}
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontSize: '21px',
            fontWeight: 'bold',
            color: '#1A1A1A',
            marginBottom: '16px',
          }}
        >
          No Misleading Profiles
        </Typography>

        {/* Subtitle */}
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#555555',
            marginBottom: '24px',
          }}
        >
          Wary of being catfished? Don’t be! MeetMeUp requires every user to upload a video of themselves to their profile, updated yearly. 
          </Typography>

        {/* Meet Up Button */}
        <Button
          variant="contained"
          onClick={handleSignUpClick}
          style={{
            backgroundColor: '#E4423F',
            color: '#FFFFFF',
            borderRadius: '20px',
            textTransform: 'none',
            fontFamily: 'Lexend',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 40px',
            marginBottom: '12px',
            width: '100%',
          }}
        >
          Continue
        </Button>

        <Typography
                    style={{
                        fontFamily: 'Inria Sans',
                        fontSize: '14px',
                        color: 'black',
                    }}
                >
                    Already have an account?{' '}
                    <span
                        style={{
                            color: 'red',
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

export default LandingPage4;
