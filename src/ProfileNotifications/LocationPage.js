import React from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import icon from "../Assets/Images/icon.png";
import { useNavigate } from 'react-router-dom'; 

const LocationPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/location2'); 
  };
  const handleLaterClick = () => {
    navigate('/matching1PreferencesPage'); 
  };

  return (
    <Box 
      style={{
        backgroundColor: '#E4423F', 
        minHeight: '100vh', 
        padding: 0, 
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Container
        maxWidth="sm"
        style={{
          textAlign: 'left', // Align text to the left
          paddingTop: 32,
          paddingBottom: 32,
          backgroundColor: '#E4423F',
          color: '#FFFFFF',
          borderRadius: 8,
          width: '100%',
          height: '100%',
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
              marginLeft: '10px',
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
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start', // Align items to the left
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // Align image to the left
              marginBottom: 16,
              width: '100%',
            }}
          >
            <img
              src={icon}
              alt="Location Icon"
              style={{ 
                width: '72px', 
                height: '72px',
                marginBottom: '16px'
              }}
            />
          </Box>

          <Box
            style={{
              textAlign: 'left', // Align text to the left
              width: '100%', 
              marginBottom: 16,
            }}
          >
            <Typography 
              variant="h5" 
              style={{ 
                fontFamily: 'Segoe UI',
                fontSize: '30px',
                fontWeight: 200,
                color: '#FFFFFF',
              }}
            >
              Would you like to <br /> turn on location <br /> services?
            </Typography>
          </Box>

          <Box
            style={{
              textAlign: 'left',
              width: '100%', 
              marginBottom: 32,
            }}
          >
            <Typography 
              variant="body1" 
              style={{ 
                fontFamily: 'Segoe UI',
                fontSize: '14px',
                fontWeight: 200,
                color: '#FFFFFF'
              }}
            >
              This will help assist you in meeting up for <br />
              potential dates and meeting in the correct <br />
              locations.
            </Typography>
          </Box>

          <Grid container spacing={2} style={{ width: '100%' }}>
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
                onClick={handleLaterClick}
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
        </Box>
      </Container>
    </Box>
  );
};

export default LocationPage;
