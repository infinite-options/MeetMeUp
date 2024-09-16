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

    const handleNextButton = async (user) => {
        try {
            await sendDataToAPI(selectedDay, selectedTime);
            navigate('/nextPlace', { state: { user, selectedDay, selectedTime, AccountUser } });
        } catch (error) {    
            console.error('Error:', error);
        }
    };
    const sendDataToAPI = async(day, time)=>{
       
        const formData = new FormData();
        formData.append('meet_user_id', ' ');
        formData.append('meet_date_user_id', ' ');
        formData.append('meet_day', day);
        formData.append('meet_time', time);
        // const data ={
        //     meet_user_id:'',
        //     meet_date_user_id:'',
        //     day,
        //     time};
        try{
            const response= await fetch('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/meet',{
                method: 'POST',
                // headers:{
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(data)
                body: formData
            });

            if(!response.ok){
                throw new Error('Network response not okay');
            }

            const result = await response.json();
            console.log("success:", result)
        } catch (error){
            console.error('Error:', error);
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: { xs: '10px', md: '20px' }, mt: 4, width: '100%' }}>
                <Box sx={{ mr: { xs: 5, md: 10 } }}><TopTitle /></Box>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mr: { xs: 4, md: 20 } }}>
                    <Avatar
                        src={AccountUser[0]?.src}
                        alt='Account User'
                        sx={{
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 },
                            border: '2px solid white',
                            zIndex: 1
                        }}
                    />
                    <Avatar
                        src={user.src}
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