import React from 'react';
import { Container, Typography, Box, Grid, IconButton } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; // Importing the arrow image
import background from '../Assets/Images/background.png'; // Importing the background image

const TrialAccount = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Container style={{ position: 'relative', minHeight: '100vh', paddingTop: '20px' }}>
      {/* Background Image */}
      <img
        src={background}
        alt="Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Arrow and Trial Account on the Same Line */}
      <Box 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '20px',
          marginRight:'100px'
        }}>
        <IconButton onClick={handleBackClick} style={{ color: '#fff' }}>
          <img src={arrow} alt="Back" style={{ width: '24px', height: '24px' }} />
        </IconButton>
        <Typography variant="h6" style={{ color: '#fff' }}>
          Trial Account
        </Typography>
      </Box>

      {/* Let's Start Section Positioned Toward the Bottom */}
      <Grid
        container
        justifyContent="center"
        alignItems="flex-end"
        style={{ minHeight: '80vh', paddingBottom: '20px' }}
      >
        <Box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Let's start
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            by setting up a trial account so you can experience creating a date, if you would like to continue setting up a real date you can complete your full profile account after the trial experience.
          </Typography>
          <Typography variant="caption" display="block" style={{ marginTop: '10px' }}>
            This is a preview date.
          </Typography>
        </Box>
      </Grid>

      {/* Start Button Outside the Container */}
      <Box
        style={{
          backgroundColor: '#FF4D4D',
          borderRadius: '20px',
          margin: '20px auto',
          padding: '10px 0',
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '300px',
          position: 'relative',
          zIndex: 1, // Ensures the button is above the background
        }}
      >
        Start
      </Box>
    </Container>
  );
};

export default TrialAccount;
