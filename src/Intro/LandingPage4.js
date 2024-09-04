import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import image4 from "../Assets/Images/image4.png";
import './LandingPage.css';

const LandingPage4 = () => {
 
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
            fontWeight: 'normal' 
          }}
        >
        Get to know your matches <strong>better</strong> with a 
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
          src={image4}
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
        <strong>Meet Me</strong> 
      </Typography>

      <Typography 
          style={{ 
              fontFamily: 'Lexend', 
              fontSize: '14px', 
            fontWeight: 'normal' 
          }}
        >
        Meet the missing piece that <strong>compliments</strong>  you.
        
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="error"
            //onClick={handeMatchClick}
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
            Let's Meet Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="text"
            color="black"
            fontWeight="700px"
            //onClick={handleSkipClick}
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

export default LandingPage4;
