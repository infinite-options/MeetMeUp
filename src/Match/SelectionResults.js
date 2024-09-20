import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionResults.css';
import HawkImg from '../Assets/Images/Hawk.jpg'
import TiffanyImg from '../Assets/Images/Tiffany.jpeg'
import ButterflyImg from '../Assets/Images/Butterfly.jpg'
import CherryImg from '../Assets/Images/Cherry.jpg'
import BobImg from '../Assets/Images/Bob.jpg'
import ArrowBackIcon from '../Assets/Images/BackButton.png'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button,  ListItemButton } from '@mui/material';
import { IconButton } from '@mui/material';
import List from '@mui/material/List';
import BackArrowButton from '../Assets/Components/BackArrowButton';
import Grid from "@mui/material/Grid2";
import TopTitle from '../Assets/Components/TopTitle';
import AccountContext from '../AccountSetup/AccountContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const matchedResults = [

];

const usersWhoSelectedYou = [
  { name: 'Hawk Tuah Tey', age: 40, where: 'Mandurah', gender: 'female', src: HawkImg, source: 'usersWhoSelectedYou' },
  { name: 'Cherrywood', age: 23, gender: 'female', where: 'Mandurah', src: CherryImg, source: 'usersWhoSelectedYou' },
];

// append onto this list after selecting
// { name: 'firstname + lastname, age: '}
const usersWhoYouSelected = [
  { name: 'Tiffany', age: 31, gender: 'female', where: 'Mandurah',  src: TiffanyImg, source: 'usersWhoYouSelected' },
  { name: 'Bob Hawk', age: 43, gender: 'male', where: 'Mandurah', src: BobImg, source: 'usersWhoYouSelected' },
  { name: 'Esmeralda Butterfly', age: 29, where: 'Mandurah', gender: 'female', src: ButterflyImg, source: 'usersWhoYouSelected' },
  //{ name: 'cherrywood', age: 23, gender: 'female', src: CherryImg, source:'usersWhoYouSelected'},
];






const SelectionResults = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // temp set to false
  const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT
  const [peopleYouSelected, setPeopleYouSelected] = useState([]);
  const [peopleSelectedYou, setPeopleSelectedYou] = useState([]);

    // /likes/<user_id>
  const userId = localStorage.getItem('user_uid');
  const [userData, setUserData] = useState({});
useEffect(() => {
  const fetchUserData = async () => {
    // will be used to fetch the data
    try {
        const res = axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`)
        setUserData(res);
        console.log('userData: ', userData);
        console.log(res);
    }   catch (error) {
      console.log("Error fetching data", error);
    };
  }
  if (userId) {
      fetchUserData();
  } else {
      setLoading(false);
      setNoId(true);
  }
}, [userId]);
  // usersWhoYouSelected should be passed in
  const {selections, setSelections} = useContext(AccountContext);
  let tempArray;
  if (selections) {
    tempArray = selections.concat(usersWhoYouSelected);
  } else {
    tempArray = usersWhoYouSelected
  }
  console.log('concattedArray: ', tempArray);
  const handleEditPreferences = () => {
    navigate('/matchPreferences');
  }

  const handleBackClick = () => {
    window.history.back(); 
  };
  const handleUserClick = (user, source) => {
    const userName = encodeURIComponent(user.user_first_name + user.user_last_name);
    navigate(`/user-details/${userName}`, { state: { user, source } });
  }
  // making a component since used twice - easier to edit
  const UserBox = ({user, type}) => (
    <Box>
    <ListItem alignItems="flex-start">
      <ListItemButton onClick={() => handleUserClick(user, type)}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.src? user.src: ''}/>
          </ListItemAvatar>
          <ListItemText
            primary={user.user_first_name + ' ' + user.user_last_name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline'}}
                >
                  {`${user.age} ${user.name}`}
                </Typography>
              </React.Fragment>
            }
          />
  
          {/* onClick={() => handleUserClick(user, 'usersWhoYouSelected')} */}
        <IconButton sx={{
          backgroundColor: "#E0E3E6", borderRadius: "25px",
          }}
          >
         <ArrowForwardIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
    {/* <Divider component="li" variant="inset" sx={{width: '90%'}}/> */}
    </Box>

  )

  if (loading) {
    return <div>Loading specifics</div>; 
  }
  if (noId) {
      return <div>No User Found</div>;
  }

  return (
    <Box sx={{ marginLeft: {xs: '5%',sm: '15%'}, marginRight: { xs: '5%',sm: '15%'}}}>
      <div className="selection-results-container">

        <TopTitle title={'Selection Results'}></TopTitle>
          {/* TODO: FIX BUTTON FORMATTING MAKE ON THE SAME LINE */}

      <br></br>
      <Typography sx={{fontSize:"18px", color:"grey", fontWeight:"bold"}}>Matched Results</Typography>
      <List>
      {matchedResults.map((user, index) => (
        <UserBox user={user} type={'matchedResults'}></UserBox>
      ))}
      </List>
      <Typography sx={{fontSize:"18px", color:"grey", fontWeight:"bold"}}>People who selected you</Typography>
      <List>
      {tempArray.map((user, index) => (
        <UserBox user={user} type={'usersWhoSelectedYou'}></UserBox>
      ))}
      </List>

      <Typography sx={{  fontSize:"18px", color:"grey", fontWeight:"bold"}}>People who you selected</Typography>
      <List>
      {usersWhoYouSelected.map((user, index) => (
        <UserBox user={user} type={'usersWhoYouSelected'}></UserBox>
      ))}
      </List>

    </div>
    {/* <div>
      <button className='editButton' onClick={() => { handleEditPreferences() }}>Edit Preferences</button>
    </div> */}
    <Grid container size={12} justifyContent="center" >
        <Button onClick={handleEditPreferences} sx={{width:"auto", minWidth: "130px", backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Edit Preferences</Button>
    </Grid>
  </Box>
  );
}

export default SelectionResults;
