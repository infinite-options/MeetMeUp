import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import image4 from "../Assets/Images/image4.png";
import { useNavigate } from 'react-router-dom';

import './LandingPage.css';

const LandingPage4 = () => {
  const navigate = useNavigate();

  const handleTrialNavigate = () => {
    navigate('/trial');
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
        marginTop: '30px',


        justifyContent: 'center',
      }}
    >
      <Typography
        style={{
          //marginTop:'100px',
          fontFamily: 'Lexend',
          mariginTop: '30px',
          fontSize: '20px',
          fontWeight: 'normal',

        }}
      >
        <strong>Time</strong> is so <strong>precious</strong> in <br></br> today’s time and day!

      </Typography>

      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginY: 3,
        }}
      >
        <img
          src={image4}
          className="custom-image"
        />
      </Box>

      <Typography
        style={{
          fontFamily: 'Lexend',
          fontSize: '22px',
          fontWeight: 'bold',
          marginTop:'-12px'
        }}
      >
        <strong>Meet me</strong>
      </Typography>

      <Typography
        style={{
          fontFamily: 'Lexend',
          fontSize: '16px',
          fontWeight: 'normal',
          marginBottom: '50px'
        }}
      >
        Meet the missing piece that <br></br><strong>compliments</strong>  you.

      </Typography>
      <Container style={{
        position: 'absolute', top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <Grid container spacing={2} style={{ marginTop: 4 }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              //onClick={handeMatchClick}
              onClick={() => {
                handleTrialNavigate();
              }}
              style={{
                borderRadius: '20px',
                backgroundColor: '#E4423F',
                width: '172px',
                height: '42px',
                textTransform: 'none',
                fontFamily: 'Lexend',
                fontSize: '18px',
                fontWeight: 'normal',
                marginTop:'30px' 
              }}
            >
              Let's Meet Up
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
                textTransform: 'none',

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

export default LandingPage4;
