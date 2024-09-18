import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, ListItemButton, ListItemIcon, ListItemText, ListItem, IconButton, Switch, Grid2 } from '@mui/material';
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
import axios from 'axios';

const switchStyle = {
  '& .MuiSwitch-track': {
    backgroundColor: '#E4423F',
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#FFFFFF',
  },
}
const Settings = () => {

  const [locationServices, setLocationServices] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(()=> {
    axios.get('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/100-000001')
      .then(res=> {
        console.log(res.data.result[0].user_location_service)
        console.log(res.data.result[0].user_notification_preference)
        setLocationServices(res.data.result[0].user_location_service==="True")
        setNotifications(res.data.result[0].user_notification_preference==="True")
      })
      .catch(err=> {
        console.log(err)
      })
  },[])

  useEffect(() => {
    if (locationServices !== null && notifications !== null) {
      const formData = new FormData();
      formData.append('user_uid', '100-000001');
      formData.append('user_email_id', 'bobhawk@gmail.com');
      formData.append('user_location_service', locationServices);
      formData.append('user_notification_preference', notifications);

      axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo', formData)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [locationServices, notifications]);

  const handleToggleLocationServices = () => {
    setLocationServices(!locationServices);
    console.log(locationServices)
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
  };
//Changes to make sure that local storage does not have any user data.
  const handleLogout   = () => {  
    console.log("Before logging out",localStorage.getItem("user_uid"));
    localStorage.removeItem('user_uid');
    setLocationServices(null);
    setNotifications(null);
    localStorage.clear();
    console.log('Logged out',localStorage.getItem('user_uid'));
  };
  const navigate = useNavigate();
  const handleAccount= () => {
      navigate(`/account3`);
  };
  const handlePassword= () => {
    navigate(`/account4`);
  };
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', marginLeft:{xs:"0",md:"15%"}, marginRight:{xs:"0",md:"15%"} }}>
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


    <ListItem alignItems="flex-start" style={{marginLeft:"15px"}}>
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
              sx={{switchStyle,
                '& .MuiSwitch-switchBase': {
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'white', 
                  },
                  '&.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#E4423F',
                    opacity:1
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#E4423F', 
              },
              }}
              inputProps={{ 'aria-label': 'location services switch' }} 
            />
    </ListItem>
 
    <ListItem alignItems="flex-start" style={{marginLeft:"15px"}}>
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
              sx={{switchStyle,
                '& .MuiSwitch-switchBase': {
                  color: 'white', 
                  '&.Mui-checked': {
                    color: 'white', 
                  },
                  '&.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#E4423F',
                    opacity:1
                  },
                },
                '& .MuiSwitch-track': {
                  backgroundColor: '#E4423F', 
              },
              }}
              inputProps={{ 'aria-label': 'location services switch' }} 
            />
            
    </ListItem>
    </List>
        <LogoutButton onClick={handleLogout}></LogoutButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Settings;
