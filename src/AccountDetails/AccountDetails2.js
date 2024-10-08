import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import account from "../Assets/Images/account.png";
import location from "../Assets/Images/location.png";
import notification from "../Assets/Images/notification.png";
import password from "../Assets/Images/password.png";
import arrow from "../Assets/Images/arrow.png";
import './AccountDetails.css';  
import TopTitle from '../Assets/Components/TopTitle';

const AccountDetails2 = () => {
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
          {/* <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
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
                fontFamily: 'Segoe UI',
                fontSize: '22px',
                fontWeight: 400,
                marginLeft:'auto',
                marginRight: 'auto',
                color:'#1A1A1A'
              }}
            >
                Settings</Typography>
          </Grid> */}
          <TopTitle title={'Settings'}></TopTitle>

          <Grid container alignItems="center" 
            style={{ 
              marginBottom: '24px' 
            }}>
            <Grid item 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1 
              }}>
              <Box 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginRight: 16 
                }}>
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
                color:'#1A1A1A'
                
              }}
              >Account Details</Typography>
            </Grid>
            <Typography variant="body1">&gt;</Typography>
          </Grid>

          <Grid container alignItems="center" 
            style={{ 
              marginBottom: '24px' 
            }}>
            <Grid item 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1 
              }}>
              <Box 
                style={{ display: 'flex', justifyContent: 'center', marginRight: 16 }}>
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
                  color:'#1A1A1A'
                  
                }}
              >Update Password</Typography>
            </Grid>
            <Typography variant="body1">&gt;</Typography>
          </Grid>

          <Grid container alignItems="center" 
            style={{ 
              marginBottom: '24px' 
            }}>
  <Grid item 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      flexGrow: 1 
    }}>
    <Box 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginRight: 16 
      }}>
      <img 
        src={location} 
        alt="Location Icon" 
        style={{ 
          width: '30px', 
          height: '30px' 
      }} 
      />
      <Typography variant="body1" 
        style={{ 
          marginLeft: '12px',
          fontFamily: 'Segoe UI', 
      fontSize: '18px',
      fontWeight: 'normal',
      color:'#1A1A1A'
        }}>
        Location Services
      </Typography>
    </Box>
    <Box 
      style={{ 
        flexGrow: 1 
      }}>
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
  <Typography variant="caption" color="textSecondary" 
    style={{ 
      marginTop: '8px', 
      flexGrow: 1,
      fontFamily: 'Segoe UI', 
      fontSize: '14px',
      fontWeight: 'normal',
      color:'#1A1A1A'
    }}>
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
        style={{ width: '30px', height: '30px' }} 
      />
      <Typography variant="body1" 
        style={{ 
          marginLeft: '12px',
          fontFamily: 'Segoe UI', 
      fontSize: '18px',
      fontWeight: 'normal',
      color:'#1A1A1A'
        }}>
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
  <Typography variant="caption" color="textSecondary" 
    style={{ marginTop: '8px', flexGrow: 1,fontFamily: 'Segoe UI', 
      fontSize: '14px',
      fontWeight: 'normal',
      color:'#1A1A1A' }}>
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
              textTransform: 'none',
              backgroundColor:'#E4423F',
              color:'#FFFFFF',
              fontFamily: 'Segoe UI', 
              fontSize: '18px',
              fontWeight: 'normal',

            }}
          >
            Settings Saved
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AccountDetails2;
