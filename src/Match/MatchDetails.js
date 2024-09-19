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

const MatchDetails = () => {
    const location = useLocation();
    const { user, source } = location.state || {};
    console.log("User:", user);
    console.log("Source:", source);
    const [isRightHeartFilled, setIsRightHeartFilled] = useState(source === 'usersWhoYouSelected');
    const [showPopup, setShowPopup] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [liked, setLiked] = useState(like)
    const popupRef = useRef(null);
    const isLeftHeartVisible = source === 'usersWhoSelectedYou';

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
        setIsRightHeartFilled(newHeartState);
        if (isLeftHeartVisible && newHeartState) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    };
    const handleSetLiked = () => {
        setLiked(prevState=>!prevState)

        // const newHeartState = !isRightHeartFilled;
        // setIsRightHeartFilled(newHeartState);
        if (isLeftHeartVisible && liked) {
            console.log()
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
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
        navigate(`/grid`);
    };

    const AccountUser = [
        { name: 'Hawk Tuah Tey', age: 40, gender: 'female', where: 'Mandurah', src: AccountUserImg, source:'Account user' }
    ]
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
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Box>
            {isLeftHeartVisible && isRightHeartFilled && showPopup && (
                <div className='popup'>
                    <div className='popup-content' ref={popupRef}>
                        <MatchPopUp user={user} AccountUser={AccountUser}/>
                            </div>
                        </div>
                    )}
                <Box sx={{backgroundColor:"#E4423F", paddingTop:"30px", paddingBottom:"50px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", minHeight: '600px' , maxWidth:"414px", margin:"0 auto", marginTop:"20px"}}>
                    <img src={user.src} style={{width:"100%", height:"90%"}} height={440}></img>
{/* FIX THE SRC  */}

                    {/* <img src="profileimg.png" style={{width:"100%", height:"90%"}}></img> */}
                    <Typography sx={{position:"absolute", zIndex: '10', top:"10%", color:"white", fontSize:'20px'}}>{user.user_first_name + ' ' + user.user_last_name}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10',top:"14%", color:"white", fontSize:"10px"}}>{user.user_age} - {user.user_gender} - {user.user_country}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10', bottom:"2%", color:"white", fontSize:"18px"}} onClick={()=>setIsFlipped(true)}>Tap to See Profile</Typography>
                    {/* <img src="like.png" style={{position:"absolute", right:"2%", top:"2%"}}></img> */}
                    <img src={liked ? like : likedImg} style={{position:"absolute", right:"2%", top:"1%"}}
                    onClick={handleSetLiked}></img>
                    {isLeftHeartVisible && (
                        <img src={likedImg} style={{position:"absolute", left:"2%", top:"1%"}} ></img>
                    )}


                </Box>
                <Grid container size={12} justifyContent="center" >
                <Link to="/matching1PreferencesPage">
                    <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"20px", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
                </Link>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button onClick={handleNavigate} sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <LogoutButton></LogoutButton>
            </Grid>
        </Box>
       
        <ViewProfile setIsFlipped={setIsFlipped} liked={liked} onClick={handleSetLiked} showPopup={showPopup} isLiked={isLeftHeartVisible} user={user} AccountUser={AccountUser} setShowPopup={setShowPopup} userData={user} />
       
        {/* <ViewProfile setIsFlipped={setIsFlipped} liked={liked} onClick={handleSetLiked} showPopup={showPopup} isLiked={isLeftHeartVisible} user={user} AccountUser={AccountUser} setShowPopup={setShowPopup} /> */}
    </ReactCardFlip>
    );
};


export default MatchDetails;
