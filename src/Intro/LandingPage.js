import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image1 from "../Assets/Images/image1.png";
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate('/landing-page-2');
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
        backgroundImage: `url(${image1})`,
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
              backgroundColor: '#E4423F',
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
              backgroundColor: '#ffffff',
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
          No Boring Small Talk
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
          Too short on time to search for your soulmate? Get to know a bit about
          your match by checking out their profile page in advance.
        </Typography>

        {/* Continue Button */}
        <Button
          variant="contained"
          onClick={handleContinueClick}
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

        {/* Sign Up Button */}
        <Button
          variant="text"
          onClick={handleSignUpClick}
          style={{
            color: '#555555',
            fontFamily: 'Lexend',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
