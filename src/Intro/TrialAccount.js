import React from 'react';
import { Container, Typography, Box, Grid, IconButton, Button } from '@mui/material';
import arrow from '../Assets/Images/arrow.png'; 
import background from '../Assets/Images/background.png'; 
import { useNavigate } from 'react-router-dom'; 
import './Start.css';
import TopTitle from '../Assets/Components/TopTitle';

const TrialAccount = () => {
  const handleBackClick = () => {
    window.history.back();
  };
  const navigate = useNavigate(); 

  const handleCreateProfile = () => {
    navigate('/accountSetup2Create'); 
  };
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw', 
    height: '100vh', 
    objectFit: 'cover',
    zIndex: -1,
    padding:'none',
    margin:'none',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }
  return (
    <Container 
      style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center', 
    }}
    >
      <Box 
        style={{
          backgroundColor: '#FFFFFF',  
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          zIndex: 2,
        }}
      >
        <TopTitle title={'Trial Account'} weight={'bold'}></TopTitle>
        {/* <IconButton onClick={handleBackClick}>
          <img src={arrow} alt="Back" style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <Typography 
          variant="h6" 
          style={{ 
            color: '#1A1A1A', 
            fontFamily:'Lexend', 
            fontSize: '22px',
            fontWeight: 'bold',
          }}
        >
          Trial Account
        </Typography> */}
      </Box>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ 
          marginTop: '100px', 
          maxWidth: '378px', 
        }}
      >
        <Box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'left',
            width: '100%',
            maxWidth: '378px',
            marginRight: '10px'
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              fontFamily:'Lexend',
              fontSize:'24px',
              fontWeight: 'bold',
              color:'#282828',
            }}
          >
            Let's start
          </Typography>
          <Typography 
            variant="body1" 
            style={{ 
              marginTop: '10px',
              fontFamily:'Lexend',
              fontSize:'14px',
              fontWeight: 'normal',
              color:'#282828' 
            }}
          >
            by setting up a trial account so you can experience creating a date. If you'd like to continue setting up a real date, you can complete your full profile after the trial experience.
          </Typography>
          <Typography 
            variant="caption" 
            display="block" 
            style={{ 

              fontFamily:'Lexend',
              fontSize:'14px',
              fontWeight: 'normal',
              color:'#282828' 
            }}
          >
            This is a preview date.
          </Typography>
        </Box>
      </Grid>

      <Button
        variant="contained"
        color="error"
        onClick={handleCreateProfile}
        style={{
          borderRadius: '20px',
          backgroundColor:'#E4423F',
          width: '172px',
          height: '42px',
          textTransform: 'none',
          fontFamily: 'Lexend', 
          fontSize: '18px', 
          fontWeight: 'normal',
          marginTop: '20px',
        }}
      >
        Start
      </Button>
      {/* </Container> */}

    </Container>
  );
};

export default TrialAccount;
