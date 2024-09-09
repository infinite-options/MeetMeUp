import { Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid2";





export default function MatchPopUp({ user, AccountUser }) {
    const navigate = useNavigate();

    //console.log("account user img:", AccountUser[0].src)
    //console.log("user img:", user)

    const handleBegin = (user) => {
        navigate('/begin', { state: { user, AccountUser } });
    }

    const handleContinue = (user) => {
        navigate('/grid');
    }
    

    console.log("matchpopup:", user)
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '-10px' }}>
                <img
                    src={AccountUser[0].src}
                    alt='Account User '
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                        zIndex: 1
                    }}
                />
                <img
                    src={user.src}
                    alt='Matched User'
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                        marginLeft: '-15px', 
                        zIndex: 0
                    }}
                />
            </div>
            <h3 className='matchText' style={{ color: '#E4423F' }}>It's A Match!</h3>
            <p>Let's start by creating a date with <br />{user.name} and you </p>
            <Stack>
                <Grid container size={12} justifyContent="center" >
                    <Button onClick={() => handleBegin(user)}
                    sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Begin!</Button>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <Button style={{ textTransform: 'capitalize', color: '#E4423F' }}
                        onClick={handleContinue}
                    >Keep matching</Button>
                </Grid>
                {/* <Button onClick={() => handleBegin(user)}
                    style={{
                        color: 'white',
                        backgroundColor: '#E4423F',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '18px',
                        width: '100px',
                        fontSize: '15px',
                        cursor: 'pointer'
                    }}>Begin!</Button> */}
                    {/* TODO: FIX FORMATTING */}
                
            </Stack>

        </div>
    )
}