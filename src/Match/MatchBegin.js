import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Avatar, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import TopTitle from '../Assets/Components/TopTitle';

export default function Begin() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, AccountUser = [] } = location.state || {};

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleNextButton = (user) => {
        navigate('/nextPlace', { state: { user, selectedDay, selectedTime, AccountUser } });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', mt: 2 }}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}><TopTitle /></Box>
                    <Avatar
                        src={AccountUser[0]?.src}
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
                <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Lexend' }}>{user.name}</Typography>
            </Box>

            <Typography variant="h5" sx={{ textAlign: 'center', mt: 7, fontFamily: 'Lexend' }}>
                Let's meet up on <span style={{ color: '#E4423F' }}>_</span>
            </Typography>

            <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 13, fontFamily: 'Lexend', mx: { xs: 0, sm: '15%' } }}>
                <strong>Pick your dates</strong> and see which ones align with your match. <strong>Show</strong> your <strong>match</strong> all your <strong>date availability</strong> by selecting <strong>multiple date</strong> and <strong>times</strong> and <strong>fast track</strong> the scheduling for your <strong>match</strong> and your <strong>date.</strong>
            </Typography>

            <Container sx={{ mt: 5 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Date day</InputLabel>
                    <Select value={selectedDay} onChange={handleDayChange} label="Date day">
                        <MenuItem value="">Select Day</MenuItem>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Date time</InputLabel>
                    <Select value={selectedTime} onChange={handleTimeChange} label="Date time">
                        <MenuItem value="">Select Time</MenuItem>
                        {['7:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:30 PM', '9:00 PM'].map((time) => (
                            <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Container>

            <Grid container direction="column" alignItems="center" sx={{ mt: 10 }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#F36A67',
                        color: '#E4423F',
                        borderRadius: '18px',
                        width: '130px',
                        mb: 2,
                        fontFamily: 'Lexend',
                        textTransform: 'none',
                    }}
                >
                    Multiple date
                </Button>
                <Button
                    variant="contained"
                    onClick={() => handleNextButton(user)}
                    sx={{
                        backgroundColor: '#E4423F',
                        borderRadius: '18px',
                        width: '100px',
                        fontFamily: 'Lexend',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#d13c39',
                        },
                    }}
                >
                    Next
                </Button>
            </Grid>
        </Box>
    );
}