import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './SelectionResults.css';
import { Box, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListItemButton, IconButton, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import TopTitle from '../Assets/Components/TopTitle';

const SelectionResults = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_uid');
  const [userData, setUserData] = useState([]); // State to hold matched results
  const [peopleYouSelected, setPeopleYouSelected] = useState([]); // State to hold people whom you selected
  const [peopleSelectedYou, setPeopleSelectedYou] = useState([]); // State to hold people who selected you
  const [userStates, setUserStates] = useState([]); // State to hold additional user information
  const [loading, setLoading] = useState(true);
  const [noId, setNoId] = useState(false);

  const location = useLocation();
  const accountUserData = location.state?.userData;
  //console.log("account user data details in selection results:", accountUserData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likesResponse, matchesResponse] = await Promise.all([
          axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`),
          axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`)
        ]);
  
        const { matched_results, people_whom_you_selected, people_who_selected_you } = likesResponse.data;
        const matchesData = matchesResponse.data.result;
  
        
        const enrichUserData = (users) => users.map(user => {
          const matchData = matchesData.find(match => match.user_uid === user.user_uid);
          return { ...user, ...matchData };
        });
  
        const enrichedMatched = enrichUserData(matched_results);
        const enrichedYouSelected = enrichUserData(people_whom_you_selected);
        const enrichedSelectedYou = enrichUserData(people_who_selected_you);
  
        setUserData(enrichedMatched);
        setPeopleYouSelected(enrichedYouSelected);
        setPeopleSelectedYou(enrichedSelectedYou);
  
        // console.log('Enriched Matched Results:', enrichedMatched);
        // console.log('Enriched People You Selected:', enrichedYouSelected);
        // console.log('Enriched People Who Selected You:', enrichedSelectedYou);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchData();
    } else {
      setLoading(false);
      setNoId(true);
    }
  }, [userId]);

  const handleEditPreferences = () => {
    navigate('/matchPreferences');
  };

  const handleMatchList = () => {
    navigate('/match');
  };

  const handleUserClick = (user, source) => {
    const userName = encodeURIComponent(user.user_first_name + user.user_last_name);
    const userState = userStates.find(state => state.user_uid === user.user_uid);
    
  
    navigate(`/user-details/${userName}`, { 
      state: { 
        user, 
        accountUserData,
        source, 
        userState,
        isFlipped: userState?.isFlipped || false,
        liked: userState?.liked || false,
        theyliked: userState?.theyliked || false,
        showPopup: userState?.showPopup || false
      } 
    });
  };

  const handleNext = (user) => {
    navigate('/messages', { state: { user } });
  };

  const UserBox = ({ user, type }) => (
    <Box>
      <ListItem alignItems="flex-start">
        <ListItemButton onClick={() => handleUserClick(user, type)}>
          <ListItemAvatar>
            <Avatar alt={user.user_first_name} src={(user.user_photo_url ? JSON.parse(user.user_photo_url)[0] : '')} />
          </ListItemAvatar>
          <ListItemText
            primary={user.user_first_name + ' ' + user.user_last_name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  {user.user_age} {user.user_gender} {user.user_suburb}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton sx={{ backgroundColor: "#E0E3E6", borderRadius: "25px" }}>
            <ArrowForwardIcon />
          </IconButton>
        </ListItemButton>
      </ListItem>
      <Button sx={{ marginLeft: "50px" }} onClick={() => handleNext(user)}>Message</Button>
    </Box>
  );

  if (loading) {
    return <div>Loading specifics...</div>;
  }
  if (noId) {
    navigate('/accountSetup1Login');
    return null;
  }

  return (
    <Box sx={{ marginLeft: { xs: '5%', sm: '15%' }, marginRight: { xs: '5%', sm: '15%' } }}>
      <div className="selection-results-container">
        <TopTitle title={'Selection Results'} />
        <br />
        
        {/* Section for Matched Results */}
       <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>Matched Results</Typography>
        {userData.length > 0 ? (
          <List>
            {userData.map((user, index) => (
              <UserBox user={user} type={'matchedResults'} key={index} />
            ))}
          </List>
        ) : (
        <Typography sx={{ fontSize: "16px", color: "grey", textAlign: "left", mt: 2 }}>
          No matches found yet
        </Typography>
      )}
        

        {/* Section for People Who Selected You */}
        <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold",marginTop:'10px'  }}>People who selected you</Typography>
        {peopleSelectedYou.length > 0 ? (
          <List>
            {peopleSelectedYou.map((user, index) => (
              <UserBox user={user} type={'usersWhoSelectedYou'} key={index} />
            ))}
          </List>
        ) : (
        <Typography sx={{ fontSize: "16px", color: "grey", textAlign: "left", mt: 2 }}>
          No selections yet
        </Typography>
      )}

        {/* Section for People You Selected */}
        <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold",marginTop:'10px'  }}>People who you selected</Typography>
        {peopleYouSelected.length > 0 ? (
          <List>
            {peopleYouSelected.map((user, index) => (
              <UserBox user={user} type={'usersWhoYouSelected'} key={index} />
            ))}
          </List>
        ) : (
        <Typography sx={{ fontSize: "16px", color: "grey", textAlign: "left", mt: 2 }}>
          You haven't selected anyone yet
        </Typography>
      )}

      </div>

      {/* Buttons for Editing Preferences and Viewing Match List */}
      <Grid container size={12} justifyContent="center">
        <Button onClick={handleEditPreferences} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Edit Preferences</Button>
      </Grid>
      <Grid container size={12} justifyContent="center">
        <Button onClick={handleMatchList} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular", marginTop:"10px" }}>Match List</Button>
      </Grid>
    </Box>
  );
};

export default SelectionResults;



