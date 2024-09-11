import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Avatar, Paper, Grid, Slider } from '@mui/material';
import EditIcon from "../Assets/Images/EditIcon.png";
import './DateSummary.css';
import TopTitle from '../Assets/Components/TopTitle';
import SendArrowIcon from '../Assets/Images/SendArrow.png'

export default function DateSummary() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [], formattedAddress } = location.state || {};

    const EditableItem = ({ label, value }) => {
        return (
            <Paper elevation={3} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f8f8',
                borderRadius: '20px',
                padding: '10px 15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <Typography variant="body1" sx={{ fontFamily: 'Lexend', fontSize: '14px' }}>
                    {label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Lexend', fontSize: '14px', color: '#555' }}>
                        {value}
                    </Typography>
                    <IconButton size="small">
                        <img src={EditIcon} alt="Edit" style={{ width: '14px', height: '14px' }} />
                    </IconButton>
                </Box>
            </Paper>
        );
    };

    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const handleSend = () => {
        // Implement your send functionality here
        console.log("Date invitation sent!");
        // Reset slider
        setSliderValue(0);
    };
    useEffect(() => {
        if (sliderValue > 80) {
            handleSend();
        }
    }, [sliderValue]);



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '15px', width: '100%' }}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '18px' }}><TopTitle /> </div>
                    <Avatar
                        src={AccountUser[0]?.src}
                        alt='Account User'
                        sx={{
                            width: 50,
                            height: 50,
                            border: '2px solid white',
                            position: 'relative',
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
                            position: 'relative',
                            marginLeft: '-15px',
                            zIndex: 0
                        }}
                    />
                </Box>
                <Typography variant="h6" sx={{ fontSize: '15px', marginTop: '20px', fontFamily: 'Lexend' }}>
                    {user.name}
                </Typography>
            </Box>

            <Typography variant="body1" sx={{ padding: '25px', fontFamily: 'Lexend', fontSize: '23px', textAlign: 'center', marginTop: '160px' }}>
                Let's meet up on <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime},</span> and go to <span style={{ color: '#E4423F' }}>{selectedDateIdea}</span> at the <span style={{ color: '#E4423F' }}>{formattedAddress}</span>
            </Typography>

            <Grid container direction="column" spacing={2} sx={{ width: '290px' }}>
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

            <Box sx={{ width: '100%', maxWidth: '290px', marginTop: '70px', position: 'relative', height: '60px', borderColor: 'black', border: '2px solid #ccc', borderRadius: '18px' }}>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-labelledby="slide-to-send"
                    style={{ marginTop: '9px', marginLeft: '30px' }}
                    sx={{
                        '& .MuiSlider-thumb': {
                            width: 50,
                            height: 50,
                            backgroundColor: '#E4423F',
                            borderRadius: '18px',
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: '0px 0px 0px 8px rgba(228, 66, 63, 0.16)',
                            },
                            '&:before': {
                                boxShadow: 'none',
                            },
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: 'white',
                            border: 'none'
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
                        fontSize: '14px',
                        pointerEvents: 'none',
                    }}
                >
                    Slide to send
                </Typography>

            </Box>
        </Box>
    );
}