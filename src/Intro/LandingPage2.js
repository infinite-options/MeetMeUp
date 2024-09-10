import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import image2 from "../Assets/Images/image2.png";
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';

const LandingPage2 = () => {
  const navigate = useNavigate(); 
  const handleMatchClick = () => {
    navigate('/landing-page-3'); 
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
            fontWeight: 'normal',
            marginTop:'30px'
          }}
        >
        Browse a <strong>soulmate</strong> or new friend <br></br> and <strong>fast track</strong> to meeting.
        
      </Typography>
      
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginY: 3,
        }}
      >
        <img
          src={image2}
          className="custom-image"
        />
      </Box>

      <Typography 
          style={{ 
              fontFamily: 'Lexend', 
              fontSize: '20px', 
            fontWeight: 'normal',
            marginBottom:'50px'
          }}
        >
        <strong>Remove</strong> that <strong>awkwardness</strong><br></br> asking for <strong>the first date</strong>.
       
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
            onClick={handleMatchClick}
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
            Let's Match
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

export default LandingPage2;
