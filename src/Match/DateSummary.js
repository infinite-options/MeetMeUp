import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Avatar, Paper, Grid, Slider, Button } from '@mui/material';
import EditIcon from "../Assets/Images/EditIcon.png";
import './DateSummary.css';
import TopTitle from '../Assets/Components/TopTitle';
import SendArrowIcon from '../Assets/Images/SendArrow.png';
import axios from "axios";

export default function DateSummary() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [], formattedAddress } = location.state || {};
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_uid');

    const handleSelectionResults = () => {
        navigate('/selectionResults', { state: { user } })
    }


    const EditableItem = ({ label, value }) => (
        <Paper elevation={3} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
            borderRadius: '20px',
            padding: { xs: '8px 12px', md: '10px 15px' },
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <Typography variant="body1" sx={{ fontFamily: 'Lexend', fontSize: { xs: '12px', md: '14px' } }}>
                {label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Lexend', fontSize: { xs: '12px', md: '14px' }, color: '#555' }}>
                    {value}
                </Typography>
                <IconButton size="small">
                    <img src={EditIcon} alt="Edit" style={{ width: '14px', height: '14px' }} />
                </IconButton>
            </Box>
        </Paper>
    );

    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (event, newValue) => {
        if (newValue < 80) {
         setSliderValue(newValue);
        }
        else {
            setSliderValue(81)
        }
    };

    const handleSend = () => {
        console.log("Date invitation sent!");
        console.log(selectedDay, selectedTime)
        const fd = new FormData();
        fd.append('meet_user_id', userId)
        fd.append('meet_date_user_id', user.user_uid)
        fd.append('meet_day', selectedDay)
        fd.append('meet_time',selectedTime)
        fd.append('meet_date_type',selectedDateIdea)
        fd.append('meet_location', formattedAddress)

        const msg = `Let's meet up on ${selectedDay} ${selectedTime} and go to ${selectedDateIdea} at ${formattedAddress}`;

        axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/meet', fd)
            .then(res => {
                console.log(res)
            })
        axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/messages', {
            sender_id: userId,
            receiver_id: user.user_uid,
            message_content: msg
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    };

    useEffect(() => {
        if (sliderValue > 80) {
            handleSend();
        }
    }, [sliderValue]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: { xs: '10px', md: '20px' }, mt: 2, width: '100%' }}>
                <Box sx={{ mr: { xs: 5, md: 10 } }}><TopTitle /></Box>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mr: { xs: 4, md: 20 } }}>
                    <Avatar
                        src={AccountUser[0].photo?JSON.parse(AccountUser[0].photo):''}
                        alt='Account User'
                        sx={{
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 },
                            border: '2px solid white',
                            zIndex: 1
                        }}
                    />
                    <Avatar
                        src={user.user_photo_url?JSON.parse(user.user_photo_url):''}
                        alt='Matched User'
                        sx={{
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 },
                            border: '2px solid white',
                            marginLeft: '-15px',
                            zIndex: 0
                        }}
                    />
                    <Typography variant="h6" sx={{ mt: 1, fontFamily: 'Lexend', fontSize: { xs: '16px', md: '20px' }, ml: { xs: 1, md: 2 } }}>{user.name}</Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ padding: '25px', fontFamily: 'Lexend', fontSize: { xs: '18px', md: '23px' }, textAlign: 'center', mt: { xs: 4, md: '110px' }, mx: { xs: '5%', sm: '10%' } }}>
                Let's meet up on <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime},</span> and go to <span style={{ color: '#E4423F' }}>{selectedDateIdea}</span> at the <span style={{ color: '#E4423F' }}>{formattedAddress}</span>
            </Typography>

            <Grid container direction="column" spacing={2} sx={{ width: { xs: '90%', sm: '390px' }, mx: { xs: 0, sm: '15%' } }}>
                <Grid item>
                    <EditableItem label="Date & Time" value={`${selectedDay} ${selectedTime}`} />
                </Grid>
                <Grid item>
                    <EditableItem label="Date Theme" value={selectedDateIdea} />
                </Grid>
                <Grid item>
                    <EditableItem label="Location" value={formattedAddress} />
                </Grid>
            </Grid>

            <Box sx={{ mx: { xs: 0, sm: '15%' }, width: '100%', maxWidth: { xs: '250px', md: '290px' }, mt: { xs: 5, md: '70px' }, position: 'relative', height: '60px', border: '2px solid #ccc', borderRadius: '18px' }}>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-labelledby="slide-to-send"
                    disabled={sliderValue === 81}
                    sx={{
                        mt: { xs: '8px', md: '15px' },
                        ml: { xs: '27px', md: '30px' },
                        '& .MuiSlider-thumb': {
                            width: { xs: 45, md: 50 },
                            height: { xs: 45, md: 50 },
                            backgroundColor: '#E4423F',
                            borderRadius: '18px',
                            position: 'relative', 
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0px 0px 0px 8px rgba(228, 66, 63, 0.16)',
                            },
                            '&:before': {
                                boxShadow: 'none',
                            },
                            '&::after': {
                                content: '""', 
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '20px', 
                                height: '20px', 
                                backgroundImage: `url(${SendArrowIcon})`, 
                                backgroundSize: 'contain', 
                                backgroundRepeat: 'no-repeat',
                                transform: 'translate(-50%, -50%)', 
                            },
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: 'white',
                            border: 'none',
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: '#f8f8f8',
                            boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                />
                <Typography
                    id="slide-to-send"
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: sliderValue > 80 ? 'white' : '#555',
                        fontFamily: 'Lexend',
                        fontSize: { xs: '12px', md: '14px' },
                        pointerEvents: 'none',
                    }}
                >
                    Slide to send
                </Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    onClick={() => handleSelectionResults(user)}
                    sx={{
                        backgroundColor: '#E4423F',
                        borderRadius: '18px',
                        width: '160px',
                        fontFamily: 'Lexend, sans-serif',
                        mt: 4,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#d13c39',
                        },
                    }}
                >
                    Selection Results
                </Button>
            </Box>
        </Box>
    );
}
