import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Begin.css';
import TopTitle from '../Assets/Components/TopTitle';
import { Box,Avatar, Typography,Button, Container } from '@mui/material';

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
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '20px', width: '100%' }}>
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
            <div>
                <h3 className='titleText' style={{ textAlign: 'center', marginTop: '70px', fontFamily: 'Lexend' }}>Let's meet up on <span style={{ color: '#E4423F' }}>_</span> </h3>
                <p className='paraText' style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', fontFamily: 'Lexend' }}><span style={{ fontWeight: 'bold' }}>Pick your dates</span> and see which ones align with your match. <span style={{ fontWeight: 'bold' }}>Show </span> your <span style={{ fontWeight: 'bold' }}>match </span> all your <span style={{ fontWeight: 'bold' }}>date availability</span> by selecting <span style={{ fontWeight: 'bold' }}>multiple date</span> and <span style={{ fontWeight: 'bold' }}>times</span> and <span style={{ fontWeight: 'bold' }}>fast track</span> the scheduling for your <span style={{ fontWeight: 'bold' }}>match</span> and your <span style={{ fontWeight: 'bold' }}>date.</span></p>
            </div>
            <div className="date-time-container">
                <Container className="selection-container">
                    <div className="selection-item">
                        <p>Date day</p>
                        <select
                            value={selectedDay}
                            onChange={handleDayChange}
                            className="select-input"
                        >
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
                    <div className="selection-item">
                        <p>Date time</p>
                        <select
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="select-input"
                        >
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
                    <div className="button-container">
                        <Button
                            variant="outlined"
                            className="multiple-date-button"
                        >
                            Multiple date
                        </Button>
                        <Button
                            variant="contained"
                            className="next-button"
                            onClick={() => handleNextButton(user)}
                        >
                            Next
                        </Button>
                    </div>
                </Container>
            </div>
            {/* <div>
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
                        marginLeft: '125px',
                        color: '#E4423F',
                        fontFamily: 'Lexend',

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
                        marginLeft: '140px',
                        color: 'white',
                        fontFamily: 'Lexend',

                    }}>Next</button>
            </div> */}
        </div>
    );
}