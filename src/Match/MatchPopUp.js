import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Avatar, Box, Grid } from '@mui/material';
import axios from 'axios';
import profileUserIcon from "../Assets/Images/profileUserIcon.webp"

export default function MatchPopUp({ user,userStates, setUserStates,index,accountUserData }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_uid');
    const handleBegin = (user) => {
        navigate('/begin', { state: { user, AccountUser,accountUserData } });
    }
    
    //console.log("account user data details in match pop up:", accountUserData) //account user
    //console.log("USER DATA IN MATCH POP UP:", user) //matched user
    //console.log("matched user url:",JSON.parse(user.user_photo_url)[0])

    const handleContinue = () => {
        if (userStates) {
            const updatedStates = [...userStates];
            updatedStates[index].liked = false
            updatedStates[index].showPopup = false;
            setUserStates(updatedStates);
            const fd = new FormData;
            fd.append('liker_user_id',userId)
            fd.append('liked_user_id', user.user_uid)
            axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', {
                data:fd})
                .then(res => {
                    console.log(res)
                })
        }
        navigate('/match');
    }

    const [AccountUser, setAccountUser] = useState([])
    //console.log("Account User Details:", AccountUser)

    useEffect(()=> {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
          .then(res=> {
            const userData = res.data.result[0]
            //console.log("USER DATA:", userData)
            setAccountUser([{
                name: userData.user_first_name,
                lastName: userData.user_last_name,
                age: userData.user_age,
                gender: userData.user_gender,
                where: userData.user_suburb,
                photo: userData.user_photo_url,
                email: userData.user_email_id,
                phoneNumber: userData.user_phone_number,
                availableTime: JSON.parse(userData.user_available_time),
                bodyComposition: userData.user_body_composition,
                country: userData.user_country,
                dateInterests: userData.user_date_interests.split(','),
                drinking: userData.user_drinking,
                education: userData.user_education,
                favoritePhoto: userData.user_favorite_photo,
                generalInterests: userData.user_general_interests.split(','),
                height: userData.user_height,
                job: userData.user_job,
                kids: userData.user_kids,
                latitude: userData.user_latitude,
                longitude: userData.user_longitude,
                nationality: userData.user_nationality,
                openTo: JSON.parse(userData.user_open_to),
                preferAgeMax: userData.user_prefer_age_max,
                preferAgeMin: userData.user_prefer_age_min,
                preferDistance: userData.user_prefer_distance,
                preferGender: userData.user_prefer_gender,
                preferHeightMin: userData.user_prefer_height_min,
                preferKids: userData.user_prefer_kids,
                profileBio: userData.user_profile_bio,
                religion: userData.user_religion,
                sexuality: userData.user_sexuality,
                smoking: userData.user_smoking,
                starSign: userData.user_star_sign,
                uid: userData.user_uid,
                videoUrl: JSON.parse(userData.user_video_url)
              }]);
          })
          .catch(err=> {
            console.log(err)
          })
      },[])



    return (
        <Box sx={{display:'flex'}}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Avatar
                    src={AccountUser.length > 0 && AccountUser[0].photo ? JSON.parse(AccountUser[0].photo)[0] : ''}
                    alt='Account User'
                    sx={{
                        width: 100,
                        height: 100,
                        border: '2px solid white',
                        zIndex: 0
                    }}
                />
                <Avatar
                    src={user.user_photo_url?JSON.parse(user.user_photo_url)[0]:''}
                    alt='Matched User'
                    sx={{
                        width: 100,
                        height: 100,
                        border: '5px solid white',
                        marginLeft: '-30px',
                        mb:"30px",
                        zIndex: 1
                    }}
                />
            </Box>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h5" sx={{ color: '#E4423F', mt: 2 }}>
                    It's A Match!
                </Typography>
                <Typography variant="body1" sx={{fontSize:"14px", mt: 1, mb: 2, textAlign:"center" }}>
                    Let's start by creating a date with <br />{user.user_first_name} {user.user_last_name} and you
                </Typography>
                <Stack spacing={2} alignItems="center">
                    <Grid container justifyContent="center">
                        <Button 
                            onClick={() => handleBegin(user)}
                            variant="contained"
                            sx={{
                                width: 130,
                                backgroundColor: "#E4423F",
                                borderRadius: 25,
                                height: 45,
                                textTransform: "none",
                                fontFamily: "Segoe UI",
                                fontSize: 18,
                                fontWeight: "regular"
                            }}
                        >
                            Begin!
                        </Button>
                    </Grid>
                </Stack>
            </Box>
        </Box>
    )
}