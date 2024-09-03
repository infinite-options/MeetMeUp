import React from 'react';
import { Box, Container, Typography, Button, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import icon from "../Assets/Images/icon.png";
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';

const LocationPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/location2'); 
  };
  return (
    <Container
      maxWidth="sm"
      style={{
        textAlign: 'center',
        paddingTop: 32,
        paddingBottom: 32,
        backgroundColor: '#E4423F',
        color: '#FFFFFF',
        borderRadius: 8,
        height: '100vh',
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
            marginLeft: '70px',
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
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <img
            src={icon}
            alt="Location Icon"
            style={{ 
              width: '72px', 
              height: '72px',
              marginRight: '455px'
             }}
          />
        </Box>

       
        <Box
          style={{
            textAlign: 'left', 
            width: '94%', 
            marginBottom: 16,
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              fontFamily: 'Segoe UI',
              fontSize: '30px',
              fontWeight: 200,
              marginRight: '200px'
            }}
          >
            Would you like to <br /> turn on location <br />services?
            
          </Typography>
        </Box>

        <Box
          style={{
            textAlign: 'left',
            width: '94%', 
            marginBottom: 16,
          }}
        >
          <Typography 
          variant="body1" 
          style={{ 
            fontFamily: 'Segoe UI',
            fontSize: '14px',
            fontWeight: 200,
            marginRight: '200px'
          }}
        >
          This will help assist you in meeting up for <br />
          potential dates and meeting in the correct <br />
          locations.
        </Typography>
        </Box>


        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleYesClick}
              style={{
                backgroundColor: '#FFFFFF',
                width: '130px',
                height: '45px',
                marginRight: '370px',
                color: '#000000',
                borderRadius: '20px',
                textTransform: 'none',
                fontFamily: 'Segoe UI',
                fontSize: '18px',
                fontWeight: 400,
                paddingX: 4,
               
              }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              style={{
                color: '#000000',
                fontFamily: 'Segoe UI',
                fontSize: '18px',
                fontWeight: 400,
                marginRight: '360px',
                textTransform: 'none',
              }}
            >
              Maybe Later
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LocationPage;
