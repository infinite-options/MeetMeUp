import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import image3 from "../Assets/Images/image3.png";
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';

const LandingPage3 = () => {
  const navigate = useNavigate(); 

  const handleMatchClick = () => {
    navigate('/landing-page-4');
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
        Get to know your matches <strong>better</strong> with<br></br> a 
        profile <strong>recording</strong>, updated <strong>yearly</strong>.
 
        
      </Typography>
      
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginY: 3,
        }}
      >
        <img
          src={image3}
          className="custom-image"
        />
      </Box>

    

      <Typography 
          style={{ 
              fontFamily: 'Lexend', 
              fontSize: '20px', 
            fontWeight: 'normal',
            maringBottom:'40px'
          }}
        >
        No <strong>disappointment</strong>, that they <br></br>
        look <strong>nothing</strong> like their profile.
        
      </Typography>

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
  );
};

export default LandingPage3;
