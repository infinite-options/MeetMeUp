import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Avatar, Box, Grid } from '@mui/material';
import axios from 'axios';

export default function MatchPopUp({ user,userStates, setUserStates,index }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_uid');
    const handleBegin = (user) => {
        navigate('/begin', { state: { user, AccountUser } });
    }

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

    useEffect(()=> {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
          .then(res=> {
            const userData = res.data.result[0]
            setAccountUser([{
                name: userData.user_first_name,
                age: userData.user_age,
                gender: userData.user_gender,
                where: userData.suburb,
                photo: userData.user_photo_url
            }])
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
                    src={user.user_photo_url?JSON.parse(user.user_photo_url):''}
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