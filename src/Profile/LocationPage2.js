import React from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import icon2 from "../Assets/Images/icon2.png";
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';

const LocationPage2 = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/account'); 
  };

  return (
    <Box
      style={{
        backgroundColor: '#E4423F',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          textAlign: 'left',
          paddingTop: 32,
          paddingBottom: 32,
          color: '#FFFFFF',
          borderRadius: 8,
          height: 'auto', // Adjust height to content
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center', 
            width: '100%',
            justifyContent: 'flex-start',
            marginBottom: 32,
          }}
        >
          <IconButton 
            style={{ 
              color: 'white',
              marginRight: 8,
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6"
            style={{
              marginLeft: 8,
              fontFamily:'Segoe UI',
              fontSize:'22px',
              fontWeight:'normal'
            }}
          >
            Profile Creation
          </Typography>
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Align to the left
            marginBottom: 16,
          }}
        >
          <img
            src={icon2}
            alt="Notification Icon"
            style={{ 
              width: '73px', 
              height: '73px',
              marginBottom: 8, // Reduce gap between image and text
            }}
          />

          <Typography 
            variant="h5" 
            style={{ 
              fontFamily: 'Segoe UI',
              fontSize: '30px',
              fontWeight: 200,
              color: '#FFFFFF',
              marginBottom: 8,
            }}
          >
            Would you like to <br /> receive notifications <br /> from Meet Me Up?
          </Typography>

          <Typography 
            variant="body1" 
            style={{ 
              fontFamily: 'Segoe UI',
              fontSize: '14px',
              fontWeight: 200,
              color: '#FFFFFF',
            }}
          >
            Notifications will be sent to your device to <br />
            help you coordinate and plan dates! It will <br />
            also let you know when you have received a <br />
            message from a potential date!
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <Button
              variant="contained"
              onClick={handleYesClick}
              style={{
                backgroundColor: '#FFFFFF',
                width: '130px',
                height: '45px',
                color: '#000000',
                borderRadius: '20px',
                textTransform: 'none',
                fontFamily: 'Segoe UI',
                fontSize: '18px',
                fontWeight: 400,
              }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              variant="text"
              style={{
                color: '#1A1A1A',
                fontFamily: 'Segoe UI',
                fontSize: '18px',
                fontWeight: 400,
                textTransform: 'none',
              }}
            >
              Maybe Later
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LocationPage2;
