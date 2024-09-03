import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import image1 from "../Assets/Images/image1.png";
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleStartClick = () => {
    navigate('/landing-page-2'); 
  };

  const handleSkipClick = () => {
    navigate('/location'); 
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
              fontWeight: '400px' 
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
            fontWeight: 'normal' 
          }}
        >
        <strong>Arrange</strong> your <strong>meeting</strong> time &amp; <strong>destination </strong> 
        through the app with only
        <strong> automated prompting</strong>.
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="error"
            onClick={handleStartClick}
            style={{
              borderRadius: '20px',
              backgroundColor:'#E4423F',
              paddingX: 4,
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
              fontWeight: 'normal',
              borderRadius: '10px',
              padding: 1,
              textTransform: 'none',
              
            }}
          >
            Skip &gt;
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
