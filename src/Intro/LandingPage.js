import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
// import Grid from '@mui/material/Grid2';

import image1 from "../Assets/Images/image1.png";
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    navigate('/landing-page-2'); 
  };

  const handleSkipClick = () => {
    navigate('/accountSetup1Login'); 
  };
  return (
    <Container
      maxWidth="100%"
      style={{
        textAlign: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,

      
        justifyContent: 'center', 
      }}
    >
      <Typography 
          style={{ 
              //marginTop:'100px',
              fontFamily: 'Lexend', 
              fontSize: '20px', 
              fontWeight: '400px',
              marginTop:'30px' 
          }}
        >
        Hello, online <strong>daters</strong>.
        <br />
        Are you <strong>time poor</strong>?
      </Typography>
      
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginY: 3,
        }}
      >
        <img
          src={image1}
          className="custom-image"
        />
      </Box>

      <Typography 
          style={{ 
              fontFamily: 'Lexend', 
              fontSize: '22px', 
            fontWeight: 'normal' 
          }}
        >
        We do <strong>small talk</strong> for you.
      </Typography>

      <Typography 
          style={{ 
              fontFamily: 'Lexend', 
              fontSize: '14px', 
            fontWeight: 'normal',
            marginBottom:'40px'
          }}
        >
        <strong>Arrange</strong> your <strong>meeting</strong> time &amp; <strong>destination </strong> 
        through the <br></br>app with only
        <strong> automated prompting</strong>.
      </Typography>
      
      <Container style={{position: 'absolute', top: '90%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        textAlign: 'center'}}>
        <Grid container spacing={2} style={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="error"
            onClick={handleStartClick}
            style={{
              borderRadius: '20px',
              backgroundColor:'#E4423F',
              width:'172px',
              height:'42px',
              textTransform:'none',
              fontFamily: 'Lexend', 
              fontSize: '18px', 
            fontWeight: 'normal' 
            }}
          >
            Let's Start
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="text"
            color="black"
            fontWeight="700px"
            onClick={handleSkipClick}
            style={{
              fontFamily: 'Lexend', 
              fontSize: '12px', 
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: 1,
              textTransform:'none'
              
            }}
          >
            Skip &gt;
          </Button>
        </Grid>
      </Grid>
      </Container>

    </Container>
  );
};

export default LandingPage;
