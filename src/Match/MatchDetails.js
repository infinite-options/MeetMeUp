import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useLocation } from 'react-router-dom';
import './UserDetails.css';
import MatchPopUp from './MatchPopUp';
import AccountUserImg from "../Assets/Images/accountUser.jpg"
import LogoutButton from '../Assets/Components/LogoutButton';
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import ViewProfile from "./ViewProfile";
import profileImg from "../Assets/Images/profileimg.png"
import like from "../Assets/Images/like.png"
import likedImg from "../Assets/Images/filledheart.png"
import axios from 'axios';

const MatchDetails = () => {
    const location = useLocation();
    const { user, source } = location.state || {};
    console.log("User:", user);
    console.log("Source:", source);
    const [isRightHeartFilled, setIsRightHeartFilled] = useState(source === 'usersWhoYouSelected' || source ==='matchedResults');
    const [showPopup, setShowPopup] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [liked, setLiked] = useState(like)
    const popupRef = useRef(null);
    const isLeftHeartVisible = source === 'usersWhoSelectedYou' || source === 'matchedResults';
    const userId = localStorage.getItem("user_uid");

    // NOTE: user is being saved as a different object make a new object
    // TEMP FOR NOW

// const nameArray = user.name ? user.name.split(" ") : [];
//     const lastName = nameArray.length > 1 ? nameArray[nameArray.length - 1] : '';
//     const firstName = nameArray.length > 0 ? nameArray[0] : '';
//     const userData = {
//         user_first_name: firstName,
//         user_last_name: lastName,
//         user_age: user.age,
//         user_gender: user.gender,
//         // user_height: 
//     }


    // LEFT WILL ONLY SHOW IF THEY SELECTED YOU
    const handleRightHeartClick = () => {
        console.log('handling heart click');
        const newHeartState = !isRightHeartFilled;
        const fd = new FormData();
        fd.append('liker_user_id',userId)
        fd.append('liked_user_id',user.user_uid)
        if (newHeartState) {
            axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes',fd)
        }
        else {
            console.log("DELETE")
            axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', {
                data:fd})
        }
        setIsRightHeartFilled(newHeartState);
    };
    const handleSetLiked = () => {
        setLiked(prevState=>!prevState)
        handleRightHeartClick();
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const navigate = useNavigate();
    const handleEditPreferences = () => {
        navigate('/matchPreferences');
      }
    const handleBackClick = () => {
        window.history.back();
    };


    const handleNavigate = () => {
        navigate(`/selectionResults`);
    };


    const [AccountUser, setAccountUser] = useState([])

    useEffect(()=> {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
          .then(res=> {
            const userData = res.data.result[0]
            setAccountUser([{
                name: userData.user_first_name,
                age: userData.user_age,
                gender: userData.user_gender,
                where: userData.suburb,
                source: 'Account user'
            }])
          })
          .catch(err=> {
            console.log(err)
          })
      },[])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClosePopup();
            }
        };  
        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);


    return (
        <Box>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Box >
                <Box sx={{backgroundColor:"#E4423F", paddingTop:"30px", paddingBottom:"50px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", minHeight: '600px' , maxWidth:"414px", margin:"0 auto", marginTop:"20px"}}>
                    <img src={user.user_photo_url?JSON.parse(user.user_photo_url)[0]: profileImg} style={{width:"100%"}}></img>
{/* FIX THE SRC  */}
                    {isLeftHeartVisible && isRightHeartFilled && (
                    <Box sx={{position:"absolute", bottom:"10%", backgroundColor:"white", borderRadius:"30px", padding:"5px"}}>
                        <MatchPopUp user={user} AccountUser={AccountUser}/>
                    </Box>
                    )}

                    {/* <img src="profileimg.png" style={{width:"100%", height:"90%"}}></img> */}
                    <Typography sx={{position:"absolute", zIndex: '10', top:"10%", color:"white", fontSize:'20px'}}>{user.user_first_name + ' ' + user.user_last_name}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10',top:"14%", color:"white", fontSize:"10px"}}>{user.user_age} - {user.user_gender} - {user.user_country}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10', bottom:"2%", color:"white", fontSize:"18px"}} onClick={()=>setIsFlipped(true)}>Tap to See Profile</Typography>
                    {/* <img src="like.png" style={{position:"absolute", right:"2%", top:"2%"}}></img> */}
                    <img src={isRightHeartFilled ? likedImg : like} style={{position:"absolute", right:"2%", top:"1%"}}
                    onClick={handleRightHeartClick}></img>
                    {isLeftHeartVisible && (
                        <img src={likedImg} style={{position:"absolute", left:"2%", top:"1%"}} ></img>
                    )}


                </Box>
        </Box>
       
        <ViewProfile setIsFlipped={setIsFlipped} liked={isRightHeartFilled} onClick={handleSetLiked} isLiked={isLeftHeartVisible} user={user} AccountUser={AccountUser} userData={user} />
       
        {/* <ViewProfile setIsFlipped={setIsFlipped} liked={liked} onClick={handleSetLiked} showPopup={showPopup} isLiked={isLeftHeartVisible} user={user} AccountUser={AccountUser} setShowPopup={setShowPopup} /> */}
    </ReactCardFlip>
    <Grid container size={12} justifyContent="center" >
            <Link to="/matching1PreferencesPage">
                    <Button sx={{width:"150px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"20px", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
                </Link>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button onClick={handleNavigate} sx={{width:"150px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <LogoutButton></LogoutButton>
            </Grid>
    </Box>
    
    );
};


export default MatchDetails;
