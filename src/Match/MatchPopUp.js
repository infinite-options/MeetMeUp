import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography, Avatar, Box, Grid } from '@mui/material';
import axios from 'axios';

export default function MatchPopUp({ user,userStates, setUserStates,index }) {
    const navigate = useNavigate();

    const handleBegin = (user) => {
        navigate('/begin', { state: { user, AccountUser } });
    }

    const handleContinue = () => {
        const updatedStates = [...userStates];
        updatedStates[index].liked = false
        updatedStates[index].showPopup = false;
        setUserStates(updatedStates);
        const userId = localStorage.getItem('user_uid');
        const fd = new FormData;
        fd.append('liker_user_id',userId)
        fd.append('liked_user_id', user.user_uid)
        axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', {
            data:fd})
            .then(res => {
                console.log(res)
            })
        navigate('/match');
    }
    const userId = localStorage.getItem("user_uid");
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
            }])
          })
          .catch(err=> {
            console.log(err)
          })
      },[])


    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    alt='Account User'
                    sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid white',
                        zIndex: 1
                    }}
                />
                <Avatar
                    src={user.src}
                    alt='Matched User'
                    sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid white',
                        marginLeft: '-15px',
                        zIndex: 0
                    }}
                />
            </Box>
            <Typography variant="h5" sx={{ color: '#E4423F', mt: 2 }}>
                It's A Match!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                Let's start by creating a date with <br />{user.name} and you
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
                <Grid container justifyContent="center">
                    <Button 
                        onClick={handleContinue}
                        sx={{ 
                            textTransform: 'capitalize', 
                            color: '#E4423F' 
                        }}
                    >
                        Keep matching
                    </Button>
                </Grid>
            </Stack>
        </Box>
    )
}