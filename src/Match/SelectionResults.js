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

const matchedResults = [

];

const usersWhoSelectedYou = [
  { name: 'Hawk Tuah Tey', age: 40, where: 'Mandurah', gender: 'female', src: HawkImg, source: 'usersWhoSelectedYou' },
  { name: 'Cherrywood', age: 23, gender: 'female', where: 'Mandurah', src: CherryImg, source: 'usersWhoSelectedYou' },
];

const usersWhoYouSelected = [
  { name: 'Tiffany', age: 31, gender: 'female', where: 'Mandurah',  src: TiffanyImg, source: 'usersWhoYouSelected' },
  { name: 'Bob Hawk', age: 43, gender: 'male', where: 'Mandurah', src: BobImg, source: 'usersWhoYouSelected' },
  { name: 'Esmeralda Butterfly', age: 29, where: 'Mandurah', gender: 'female', src: ButterflyImg, source: 'usersWhoYouSelected' },
  //{ name: 'cherrywood', age: 23, gender: 'female', src: CherryImg, source:'usersWhoYouSelected'},
];


const SelectionResults = () => {
  const navigate = useNavigate();
  const handleEditPreferences = () => {
    navigate('/matchPreferences');
  }

  const handleBackClick = () => {
    window.history.back(); 
  };
  const handleUserClick = (user, source) => {
    const userName = encodeURIComponent(user.name);
    navigate(`/user-details/${userName}`, { state: { user, source } });
  }
  // making a component since used twice - easier to edit
  const UserBox = ({user, type}) => (
    <Box sx={{ marginLeft:{xs:"0%", sm:"15%"}, marginRight:{xs:"0%", sm:"15%"}}}>
    <ListItem alignItems="flex-start">
      <ListItemButton onClick={() => handleUserClick(user, type)}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={user.src? user.src: ''}/>
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
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

  return (
    <div>
      <div className="selection-results-container">
        {/* <button className="back-button" onClick={handleBackClick}>
        <img src={ArrowBackIcon}/>
          </button> */}
        <TopTitle title={'Selection Results'}></TopTitle>
          {/* TODO: FIX BUTTON FORMATTING MAKE ON THE SAME LINE */}
        {/* <BackArrowButton />
        <h2>Selection Results</h2> */}
      <br></br>
      <Typography sx={{marginLeft:{xs:"0%", sm:"15%"}, marginRight:{xs:"0%", sm:"15%"},  fontSize:"18px", color:"grey", fontWeight:"bold"}}>Matched Results</Typography>
      <List>
      {matchedResults.map((user, index) => (
        <UserBox user={user} type={'matchedResults'}></UserBox>
      ))}
      </List>
      <Typography sx={{marginLeft:{xs:"0%", sm:"15%"}, marginRight:{xs:"0%", sm:"15%"},  fontSize:"18px", color:"grey", fontWeight:"bold"}}>People who selected you</Typography>
      <List>
      {usersWhoSelectedYou.map((user, index) => (
        <UserBox user={user} type={'usersWhoSelectedYou'}></UserBox>
      ))}
      </List>

      <Typography sx={{marginLeft:{xs:"0%", sm:"15%"}, marginRight:{xs:"0%", sm:"15%"},  fontSize:"18px", color:"grey", fontWeight:"bold"}}>People who you selected</Typography>
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
  </div>
  );
}

export default SelectionResults;


   {/* <div>
       <div className="selection-results-container">
         <button className="back-button" onClick={handleBackClick}>
           <img src={ArrowBackIcon}/>
         </button>
         <h2>Selection Results</h2>
         <div style={{ marginTop:'50px', marginLeft:'0px',}}>
           <h4 style={{ color: 'grey'}}>Matched Results</h4>
           {matchedResults.length === 0 ? (
             <p style={{ padding: '20px 0' }} />
           ) : (
             matchedResults.map((user, index) => (
               <div key={index} className="user-card">
                 <img src={user.src} alt={user.name} className="user-avatar" />
                 <div className="user-info">
                   <span className="user-name">{user.name}</span>
                   <span className="user-age-gender">
                     {user.age} {user.gender}
                   </span>
                 </div>
                 <button
                   className="navigate-button"
                   onClick={() => handleUserClick(user, 'matchedResults')}
                 >
                   ➔
                 </button>
               </div>
             ))
           )}
         </div>

        
         <div className="section">
           <h4 style={{ color: 'grey' }}>People who selected you</h4>
           {usersWhoSelectedYou.map((user, index) => (
             <div key={index} className="user-card">
               <img src={user.src} alt={user.name} className="user-avatar" />
               <div className="user-info">
                 <span className="user-name">{user.name}</span>
                 <span className="user-age-gender">
                   {user.age} {user.gender}
                 </span>
               </div>
               <button
                 className="navigate-button"
                 onClick={() => handleUserClick(user, 'usersWhoSelectedYou')}
               >
                 ➔
               </button>
             </div>
           ))}
         </div>

         <div className="section">
           <h4 style={{ color: 'grey' }}>People who you selected</h4>
           {usersWhoYouSelected.map((user, index) => (
             <div key={index} className="user-card">
               <img src={user.src} alt={user.name} className="user-avatar" />
               <div className="user-info">
                 <span className="user-name">{user.name}</span>
                 <span className="user-age-gender">
                   {user.age} {user.gender}
                 </span>
               </div>
               <button
                 className="navigate-button"
                 onClick={() => handleUserClick(user, 'usersWhoYouSelected')}
               >
                 ➔
               </button>
             </div>
           ))}
         </div>
       </div>
       <div>
         <button className='editButton' onClick={() => { handleEditPreferences() }}>Edit Preferences</button>
       </div>
     </div> */}