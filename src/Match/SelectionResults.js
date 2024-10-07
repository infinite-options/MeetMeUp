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
  console.log("account user data details in selection results:", accountUserData)

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
  
        console.log('Enriched Matched Results:', enrichedMatched);
        console.log('Enriched People You Selected:', enrichedYouSelected);
        console.log('Enriched People Who Selected You:', enrichedSelectedYou);
  
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
        <List>
          {userData.map((user, index) => (
            <UserBox user={user} type={'matchedResults'} key={index} />
          ))}
        </List>

        {/* Section for People Who Selected You */}
        <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who selected you</Typography>
        <List>
          {peopleSelectedYou.map((user, index) => (
            <UserBox user={user} type={'usersWhoSelectedYou'} key={index} />
          ))}
        </List>

        {/* Section for People You Selected */}
        <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who you selected</Typography>
        <List>
          {peopleYouSelected.map((user, index) => (
            <UserBox user={user} type={'usersWhoYouSelected'} key={index} />
          ))}
        </List>
      </div>

      {/* Buttons for Editing Preferences and Viewing Match List */}
      <Grid container size={12} justifyContent="center">
        <Button onClick={handleEditPreferences} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Edit Preferences</Button>
      </Grid>
      <Grid container size={12} justifyContent="center">
        <Button onClick={handleMatchList} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Match List</Button>
      </Grid>
    </Box>
  );
};

export default SelectionResults;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SelectionResults.css';
// import { Box, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, ListItemButton, IconButton, Grid } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import axios from 'axios';
// import TopTitle from '../Assets/Components/TopTitle';

// const SelectionResults = () => {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem('user_uid');
//   const [userData, setUserData] = useState([]); // State to hold matched results
//   const [peopleYouSelected, setPeopleYouSelected] = useState([]); // State to hold people whom you selected
//   const [peopleSelectedYou, setPeopleSelectedYou] = useState([]); // State to hold people who selected you
//   const [userStates, setUserStates] = useState([]); // State to hold additional user information
//   const [loading, setLoading] = useState(true);
//   const [noId, setNoId] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`);
//         const { matched_results, people_whom_you_selected, people_who_selected_you } = response.data;
  
//         setUserData(matched_results);
//         setPeopleYouSelected(people_whom_you_selected);
//         setPeopleSelectedYou(people_who_selected_you);
  
//         console.log('Matched Results:', matched_results);
//         console.log('People You Selected:', people_whom_you_selected);
//         console.log('People Who Selected You:', people_who_selected_you);
  
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data', error);
//         setLoading(false);
//       }
//     };
  
//     if (userId) {
//       fetchData();
//     } else {
//       setLoading(false);
//       setNoId(true);
//     }
//   }, [userId]);

//   const handleEditPreferences = () => {
//     navigate('/matchPreferences');
//   };

//   const handleMatchList = () => {
//     navigate('/match');
//   };

//   const handleUserClick = (user, source) => {
//     const userName = encodeURIComponent(user.user_first_name + user.user_last_name);
//     const userState = userStates.find(state => state.user_uid === user.user_uid);
//     navigate(`/user-details/${userName}`, { state: { user, source, userState } });
//   };

//   const handleNext = (user) => {
//     navigate('/messages', { state: { user } });
//   };
  

//   const UserBox = ({ user, type }) => (
//     <Box>
//       <ListItem alignItems="flex-start">
//         <ListItemButton onClick={() => handleUserClick(user, type)}>
//           <ListItemAvatar>
//             <Avatar alt={user.user_first_name} src={(user.user_photo_url ? JSON.parse(user.user_photo_url)[0] : '')} />
//           </ListItemAvatar>
//           <ListItemText
//             primary={user.user_first_name + ' ' + user.user_last_name}
//             secondary={
//               <React.Fragment>
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   sx={{ color: 'text.primary', display: 'inline' }}
//                 >
//                   {user.user_age} {user.user_gender}
//                 </Typography>
//               </React.Fragment>
//             }
//           />
//           <IconButton sx={{ backgroundColor: "#E0E3E6", borderRadius: "25px" }}>
//             <ArrowForwardIcon />
//           </IconButton>
//         </ListItemButton>
//       </ListItem>
//       <Button sx={{ marginLeft: "50px" }} onClick={() => handleNext(user)}>Message</Button>
//     </Box>
//   );

//   if (loading) {
//     return <div>Loading specifics...</div>;
//   }
//   if (noId) {
//     navigate('/accountSetup1Login');
//     return null;
//   }

//   return (
//     <Box sx={{ marginLeft: { xs: '5%', sm: '15%' }, marginRight: { xs: '5%', sm: '15%' } }}>
//       <div className="selection-results-container">
//         <TopTitle title={'Selection Results'} />
//         <br />
        
//         {/* Section for Matched Results */}
//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>Matched Results</Typography>
//         <List>
//           {userData.map((user, index) => (
//             <UserBox user={user} type={'matchedResults'} key={index} />
//           ))}
//         </List>

//         {/* Section for People Who Selected You */}
//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who selected you</Typography>
//         <List>
//           {peopleSelectedYou.map((user, index) => (
//             <UserBox user={user} type={'usersWhoSelectedYou'} key={index} />
//           ))}
//         </List>

//         {/* Section for People You Selected */}
//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who you selected</Typography>
//         <List>
//           {peopleYouSelected.map((user, index) => (
//             <UserBox user={user} type={'usersWhoYouSelected'} key={index} />
//           ))}
//         </List>
//       </div>

//       {/* Buttons for Editing Preferences and Viewing Match List */}
//       <Grid container size={12} justifyContent="center">
//         <Button onClick={handleEditPreferences} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Edit Preferences</Button>
//       </Grid>
//       <Grid container size={12} justifyContent="center">
//         <Button onClick={handleMatchList} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Match List</Button>
//       </Grid>
//     </Box>
//   );
// };

// export default SelectionResults;





// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SelectionResults.css';
// import HawkImg from '../Assets/Images/Hawk.jpg'
// import TiffanyImg from '../Assets/Images/Tiffany.jpeg'
// import ButterflyImg from '../Assets/Images/Butterfly.jpg'
// import CherryImg from '../Assets/Images/Cherry.jpg'
// import BobImg from '../Assets/Images/Bob.jpg'
// import ArrowBackIcon from '../Assets/Images/BackButton.png'
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { Box, Button, ListItemButton } from '@mui/material';
// import { IconButton } from '@mui/material';
// import List from '@mui/material/List';
// import BackArrowButton from '../Assets/Components/BackArrowButton';
// import Grid from "@mui/material/Grid2";
// import TopTitle from '../Assets/Components/TopTitle';
// import AccountContext from '../AccountSetup/AccountContext';
// import { useContext } from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';




// const SelectionResults = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false); // temp set to false
//   const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT
//   const [peopleYouSelected, setPeopleYouSelected] = useState([]);
//   const [peopleSelectedYou, setPeopleSelectedYou] = useState([]);
//   const [match, setMatch] = useState([]);

//   // /likes/<user_id>
//   const userId = localStorage.getItem('user_uid');
//   const [userData, setUserData] = useState({});
//   useEffect(() => {
//     const fetchUserData = async () => {
//       // will be used to fetch the data
//       try {
//         axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`)
//           .then(res => {
//             console.log("likes data in selection ", res.data)
//             setPeopleYouSelected(res.data.people_whom_you_selected)
//             setPeopleSelectedYou(res.data.people_who_selected_you)
//             setMatch(res.data.matched_results)
//             console.log(res.data.people_whom_you_selected)
//             console.log(res.data.matched_results)
//           })
//       } catch (error) {
//         console.log("Error fetching data", error);
//       };
//     }
//     if (userId) {
//       fetchUserData();
//     } else {
//       setLoading(false);
//       setNoId(true);
//     }
//   }, [userId]);
//   // usersWhoYouSelected should be passed in
//   const { selections, setSelections } = useContext(AccountContext);
//   const handleEditPreferences = () => {
//     navigate('/matchPreferences');
//   }
//   const handleMatchList = () => {
//     navigate('/match');
//   }
//   const handleBegin = (user) => {
//     console.log("user HERE", user)
//   }

//   const handleBackClick = () => {
//     window.history.back();
//   };
//   const handleUserClick = (user, source) => {
//     const userName = encodeURIComponent(user.user_first_name + user.user_last_name);
//     console.log("matched user details in SELECTION RESULTS:", user)
//     navigate(`/user-details/${userName}`, { state: { user, source } });
//   }
//   const handleNext = (user) => {
//     console.log(user)
//     navigate('/messages', { state: { user } })
//   }
//   // making a component since used twice - easier to edit
//   const UserBox = ({ user, type }) => (
//     <Box>
//       <ListItem alignItems="flex-start">
//         <ListItemButton onClick={() => handleUserClick(user, type)}>
//           <ListItemAvatar>
//             <Avatar alt={user.user_first_name} src={(user.user_photo_url ? JSON.parse(user.user_photo_url) : '')} />
//           </ListItemAvatar>
//           <ListItemText
//             primary={user.user_first_name + ' ' + user.user_last_name}
//             secondary={
//               <React.Fragment>
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   sx={{ color: 'text.primary', display: 'inline' }}
//                 >
//                   {user.user_age} {user.user_gender}
//                 </Typography>
//               </React.Fragment>
//             }
//           />
//           {/* onClick={() => handleUserClick(user, 'usersWhoYouSelected')} */}
//           <IconButton sx={{
//             backgroundColor: "#E0E3E6", borderRadius: "25px",
//           }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </ListItemButton>
//       </ListItem>
//       <Button sx={{ marginLeft: "50px" }} onClick={() => handleNext(user)}>Message</Button>
//       {/* <Divider component="li" variant="inset" sx={{width: '90%'}}/> */}
//     </Box>

//   )

//   if (loading) {
//     return <div>Loading specifics</div>;
//   }
//   if (noId) {
//     navigate('/accountSetup1Login');
//   }

//   return (
//     <Box sx={{ marginLeft: { xs: '5%', sm: '15%' }, marginRight: { xs: '5%', sm: '15%' } }}>
//       <div className="selection-results-container">

//         <TopTitle title={'Selection Results'}></TopTitle>
//         {/* TODO: FIX BUTTON FORMATTING MAKE ON THE SAME LINE */}

//         <br></br>
//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>Matched Results</Typography>
//         <List>
//           {match.map((user, index) => (
//             <UserBox user={user} type={'matchedResults'} onclick={() => handleBegin(user)}></UserBox>
//           ))}
//         </List>
//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who selected you</Typography>
//         <List>
//           {peopleSelectedYou.map((user, index) => (
//             <UserBox user={user} type={'usersWhoSelectedYou'}></UserBox>
//           ))}
//         </List>

//         <Typography sx={{ fontSize: "18px", color: "grey", fontWeight: "bold" }}>People who you selected</Typography>
//         <List>
//           {peopleYouSelected.map((user, index) => (
//             <UserBox user={user} type={'usersWhoYouSelected'}></UserBox>
//           ))}
//         </List>

//       </div>
//       {/* <div>
//       <button className='editButton' onClick={() => { handleEditPreferences() }}>Edit Preferences</button>
//     </div> */}
//       <Grid container size={12} justifyContent="center" >
//         <Button onClick={handleEditPreferences} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Edit Preferences</Button>
//       </Grid>
//       <Grid container size={12} justifyContent="center" >
//         <Button onClick={handleMatchList} sx={{ width: "150px", minWidth: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "5px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>Match List</Button>
//       </Grid>
//     </Box>
//   );
// }

// export default SelectionResults;
