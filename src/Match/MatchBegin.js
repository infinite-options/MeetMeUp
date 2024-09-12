import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Begin.css';
import { Box, Container, Grid2, Typography } from '@mui/material';

export default function Begin() {
    const location = useLocation();
    const { user, AccountUser = [] } = location.state || {};
    //console.log("Begin:", user);

    console.log("user img", user.src)
    console.log("Accountuser img", AccountUser[0].src)

    const navigate = useNavigate();
    const handleNextButton = (user) => {
        navigate('/nextPlace', { state: { user, selectedDay, selectedTime, AccountUser } });

    }


    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    // Function to handle day change
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    // Function to handle time change
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    return (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <div className='title' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={AccountUser[0]?.src}
                        alt='Account User'
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid white',
                            position: 'relative',
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
                            position: 'relative',
                            marginLeft: '-15px', // Overlap the images
                            zIndex: 0
                        }}
                    />
                </div>
                <h2 className='userName' style={{ fontSize: '15px', marginTop: '20px', fontFamily: 'Lexend' }}>{user.name}</h2>
            </div>
            <div>
                <h3 className='titleText' style={{ textAlign: 'center', marginTop: '70px', fontFamily: 'Lexend' }}>Let's meet up on <span style={{ color: '#E4423F' }}>_</span> </h3>
                <Typography className='paraText' sx={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', fontFamily: 'Lexend', marginLeft:{xs:"0", sm:"15%"}, marginRight:{xs:"0", sm:"15%"}}}><span style={{ fontWeight: 'bold' }}>Pick your dates</span> and see which ones align with your match. <span style={{ fontWeight: 'bold' }}>Show </span> your <span style={{ fontWeight: 'bold' }}>match </span> all your <span style={{ fontWeight: 'bold' }}>date availability</span> by selecting <span style={{ fontWeight: 'bold' }}>multiple date</span> and <span style={{ fontWeight: 'bold' }}>times</span> and <span style={{ fontWeight: 'bold' }}>fast track</span> the scheduling for your <span style={{ fontWeight: 'bold' }}>match</span> and your <span style={{ fontWeight: 'bold' }}>date.</span></Typography>
            </div>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Container>

                <div >
                    <p>Date day</p>
                    <select value={selectedDay} onChange={handleDayChange} style={{ width: '320px', padding: '10px', borderRadius: '5px', marginRight: '30px', fontFamily: 'Lexend' }}>
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>

                <div style={{ marginLeft: '0px' }}>
                    <p>Date time</p>
                    <select value={selectedTime} onChange={handleTimeChange} style={{ width: '320px', padding: '10px', marginRight: '30px', borderRadius: '5px', fontFamily: 'Lexend' }}>
                        <option value="">Select Time</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                    </select>
                </div>
                </Container>

            </div>
            <Grid2 container sx={{flexDirection:"column", alignItems:"center"}}>
                <button
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        border: '2px solid #F36A67',
                        padding: '10px',
                        borderRadius: '18px',
                        width: '130px',
                        cursor: 'pointer',
                        marginTop: '100px',
                        color: '#E4423F',
                        fontFamily: 'Lexend',
                        borderStyle:"solid"

                    }}>Multiple date</button>
                <button className='nextButton' onClick={() => handleNextButton(user)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#E4423F',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '18px',
                        width: '100px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        color: 'white',
                        fontFamily: 'Lexend',

                    }}>Next</button>
            </Grid2>
        </Box>
    );
}