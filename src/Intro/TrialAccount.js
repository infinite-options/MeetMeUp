import React from 'react';
import { Container, Typography, Box, Grid, IconButton } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; 
import background from '../Assets/Images/background.png'; 

const TrialAccount = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Container style={{ position: 'relative', minHeight: '100vh', paddingTop: '20px' }}>

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

      
      <Box 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '20px',
          marginRight:'100px'
        }}>
        <IconButton onClick={handleBackClick} style={{ color: '#fff' }}>
          <img src={arrow} alt="Back" style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <Typography variant="h6" 
          style={{ 
            color: '#1A1A1A',
            fontFamily:'Lexend',
            fontSize:'22px',
            fontWeight: 'bold'
          }}>
          Trial Account
        </Typography>
      </Box>

      
      <Grid
        container
        justifyContent="center"
        alignItems="flex-middle"
        style={{ marginTop:'400px', width:'378px', height:'199px', marginBottom: '20px' }}
      >
        <Box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'left',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <Typography variant="h5" style={{ fontFamily:'Lexend',
            fontSize:'28px',
            fontWeight: 'bold',
            color:'#282828' }}>
            Let's start
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px',fontFamily:'Lexend',
            fontSize:'14px',
            fontWeight: 'normal',
            color:'#282828' }}>
            by setting up a trial account so you can experience creating a date, if you would like to continue setting up a real date you can complete your full profile account after the trial experience.
          </Typography>
          <Typography variant="caption" display="block" style={{fontFamily:'Lexend',
            fontSize:'14px',
            fontWeight: 'normal',
            color:'#282828' }}>
            This is a preview date.
          </Typography>
        </Box>
      </Grid>

      
      <Box
        style={{
          backgroundColor: '#E4423F',
          borderRadius: '28px',
          margin: 'auto',
          marginTop:'40px',
          padding: '10px 0',
          cursor: 'pointer',
          color: '#FFFFFF',
          fontFamily: 'Lexend',
          fontSize:'18px',
          fontWeight: 'normal',
          textAlign: 'center',
          width:'188px',
          height:'30px',

          position: 'relative',
          zIndex: 1, 
        }}
      >
        Start
      </Box>
    </Container>
  );
};

export default TrialAccount;
