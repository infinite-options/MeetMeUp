import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Button, ListItemButton, ListItemIcon, ListItemText, ListItem, IconButton, Switch } from '@mui/material';
import account from "../Assets/Images/account.png";
import location from "../Assets/Images/location.png";
import notification from "../Assets/Images/notification.png";
import password from "../Assets/Images/password.png";
import arrow from "../Assets/Images/arrow.png";
import './AccountDetails.css';  
import LogoutButton from '../Assets/Components/LogoutButton';
import List from '@mui/material/List';
import BackArrowButton from '../Assets/Components/BackArrowButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom'; 
import TopTitle from '../Assets/Components/TopTitle';

const switchStyle = {
  '& .MuiSwitch-track': {
    backgroundColor: '#E4423F',
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#FFFFFF',
  },
}
const Settings = () => {
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
  const navigate = useNavigate();
  const handleAccount= () => {
      navigate(`/account3`);
  };
  const handlePassword= () => {
    navigate(`/account4`);
  };

  return (
    <Box style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Container style={{ padding: '32px' }}>
        
      <Box>
          {/* <Grid container alignItems="center" style={{ marginBottom: '24px' }}>
            <BackArrowButton></BackArrowButton>
            <Typography variant="h5"
              style ={{
                fontFamily: 'Segoe UI', 
                fontSize: '22px',
                fontWeight: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
                color:'#1A1A1A'
                
              }}
            >
                Settings</Typography>
          </Grid> */}
          <TopTitle title={'Settings'}></TopTitle>
          <List>
              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                <ListItemButton onClick={handleAccount}>
                  <ListItemIcon>
                    <img src={account} 
                      style={{ 
                        width: '28px', 
                        height: '28px' 
                      }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1"
                      style ={{
                        fontFamily: 'Segoe UI', 
                        fontSize: '18px',
                        fontWeight: 400,
                        color:'#1A1A1A'
                        
                      }}
                    >Account Details</Typography>
                  </ListItemText>
                  <IconButton edge="end" aria-label="delete">
                    <ChevronRightIcon/>
                  </IconButton>
                </ListItemButton>
              </ListItem>
              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                <ListItemButton onClick={handlePassword}>
                  <ListItemIcon>
                    <img src={password} 
                      style={{ 
                        width: '28px', 
                        height: '28px' 
                      }} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1"
                      style ={{
                        fontFamily: 'Segoe UI', 
                        fontSize: '18px',
                        fontWeight: 400,
                        color:'#1A1A1A'
                        
                      }}
                    >Update Password</Typography>
                  </ListItemText>
                  <IconButton edge="end" aria-label="delete">
                    <ChevronRightIcon/>
                  </IconButton>
                </ListItemButton>
              </ListItem>



    <ListItem alignItems="flex-start">
          <ListItemIcon>
              <img src={location} 
                style={{ 
                  width: '28px', 
                  height: '28px' 
                }} />
          </ListItemIcon>
          <ListItemText
            primary="Location Services"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline'}}
                >
                  This will help assist you in meeting up for 
                  potential dates and meeting in the correct 
                  locations.
                </Typography>
              </React.Fragment>
            }
          />
  
          {/* onClick={() => handleUserClick(user, 'usersWhoYouSelected')} */}
            <Switch
              checked={locationServices}
              onChange={handleToggleLocationServices}
              sx={switchStyle}
              inputProps={{ 'aria-label': 'location services switch' }} 
            />
    </ListItem>
 
    <ListItem alignItems="flex-start">
          <ListItemIcon>
              <img src={notification} 
                style={{ 
                  width: '28px', 
                  height: '28px' 
                }} />
          </ListItemIcon>
          <ListItemText
            primary="Notifications"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline'}}
                >
                  Notifications will be sent to your device to 
                  help you coordinate and plan dates! It will 
                  also let you know when you have received a 
                  message from a potential date!
                </Typography>
              </React.Fragment>
            }
          />
  
          {/* onClick={() => handleUserClick(user, 'usersWhoYouSelected')} */}
            <Switch
              checked={notifications}
              onChange={handleToggleNotifications}
              sx={switchStyle}
              inputProps={{ 'aria-label': 'location services switch' }} 
            />
            
    </ListItem>
    </List>
        <LogoutButton></LogoutButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
