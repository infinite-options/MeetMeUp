import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import account from "../Assets/Images/account.png";
import location from "../Assets/Images/location.png";
import notification from "../Assets/Images/notification.png";
import password from "../Assets/Images/password.png";
import arrow from "../Assets/Images/arrow.png";
import './AccountDetails.css';  

const Account = () => {
  const [locationServices, setLocationServices] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleToggleLocationServices = () => {
    setLocationServices(!locationServices);
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <Box style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Container maxWidth="sm" style={{ padding: '32px' }}>
      <Box>
          <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
            <Box 
              component="button"
              onClick={() => console.log('Back clicked')} 
              style={{
                marginRight: '16px',
                background: 'transparent',
                border: 'none',
                padding: '0',
                cursor: 'pointer',
              }}
            >
              <img 
                src={arrow} 
                
                style={{ 
                  width: '28px', 
                  height: '28px' 
                }} 
              />
            </Box>
            <Typography variant="h5"
              style ={{
                fontFamily: 'Segoe UI', // Correct font-family
                fontSize: '22px',
                fontWeight: 400,
                marginLeft: '180px'
                
              }}
            >
                Settings</Typography>
          </Grid>

          <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box style={{ display: 'flex', justifyContent: 'center', marginRight: 16 }}>
                <img 
                  src={account} 
                  style={{ 
                    width: '28px', 
                    height: '28px' 
                  }} />
              </Box>
              <Typography variant="body1"
              style ={{
                fontFamily: 'Segoe UI', 
                fontSize: '18px',
                fontWeight: 400,
               
                
              }}
              >Account Details</Typography>
            </Grid>
            <Typography variant="body1">&gt;</Typography>
          </Grid>

          <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box style={{ display: 'flex', justifyContent: 'center', marginRight: 16 }}>
              <img 
                  src={password} 
                  style={{ 
                    width: '28px', 
                    height: '28px' 
                  }} />
              </Box>
              <Typography variant="body1"
                style ={{
                  fontFamily: 'Segoe UI', 
                  fontSize: '18px',
                  fontWeight: 400,
                 
                  
                }}
              >Update Password</Typography>
            </Grid>
            <Typography variant="body1">&gt;</Typography>
          </Grid>

          <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
  <Grid item style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
    <Box style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <img 
        src={location} 
        alt="Location Icon" 
        style={{ width: '28px', height: '28px' }} 
      />
      <Typography variant="body1" style={{ marginLeft: '8px' }}>
        Location Services
      </Typography>
    </Box>
    <Box style={{ flexGrow: 1 }}>
      <div className="switch-container">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={locationServices} 
            onChange={handleToggleLocationServices} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </Box>
  </Grid>
  <Typography variant="caption" color="textSecondary" style={{ marginTop: '8px', flexGrow: 1 }}>
  This will help assist you in meeting up for 
potential dates and meeting in the correct 
locations.  </Typography>
</Grid>

<Grid container alignItems="center" style={{ marginBottom: '24px' }}>
  <Grid item style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
    <Box style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <img 
        src={notification} 
        alt="Notification Icon" 
        style={{ width: '28px', height: '28px' }} 
      />
      <Typography variant="body1" style={{ marginLeft: '8px' }}>
        Notifications
      </Typography>
    </Box>
    <Box style={{ flexGrow: 1 }}>
      <div className="switch-container">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={handleToggleNotifications} 
          />
          <span className="slider"></span>
        </label>
      </div>
    </Box>
  </Grid>
  <Typography variant="caption" color="textSecondary" style={{ marginTop: '8px', flexGrow: 1 }}>
  Notifications will be sent to your device to 
help you coordinate and plan dates! It will 
also let you know when you have received a 
message from a potential date!  </Typography>
</Grid>


          <Button
            variant="contained"
            color="error"
            fullwidth
            onClick={handleLogout}
            style={{ 
              marginTop: '16px',
              width: '100%',
              height: '44px',
              
              backgroundColor:'#E4423F'
            }}
          >
            Settings Saved
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Account;
