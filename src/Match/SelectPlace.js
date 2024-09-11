import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectPlace.css';
import TopTitle from '../Assets/Components/TopTitle';
import { Box, Button, Grid, Avatar, Typography } from '@mui/material';

export default function SelectPlace() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, AccountUser = [] } = location.state || {};
    const navigate = useNavigate();

    const [selectedButton, setSelectedButton] = useState("");

    // Define the date ideas array
    const dateIdeas = [
        "Dinner", "Drinks", "Coffee", "Lunch", "Movies", "Custom", "Ask date to suggest"
    ];

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const handleNextButton = () => {
        navigate('/nextLocation', {
            state: {
                user,
                selectedDay,
                selectedTime,
                selectedDateIdea: selectedButton,
                AccountUser
            }
        });
    }

    const renderDateIdeaButtons = () => {
        return dateIdeas.map((idea, index) => (
            <Grid item xs={6} key={index}>
                <Button

                    onClick={() => handleButtonClick(idea)}
                    fullWidth
                    sx={{
                        backgroundColor: selectedButton === idea ? '#E4423F' : '#FFFFFF',
                        color: selectedButton === idea ? '#FFFFFF' : '#000000',
                        width: idea === "Ask date to suggest" ? '150px' : '100px',
                        padding: idea === "Ask date to suggest" ? '15px' : '20px',
                        height: idea === "Ask date to suggest" ? 'auto' : '60px',
                        borderRadius: '20px',
                        fontFamily: 'Lexend, sans-serif',
                        fontSize: '15px',
                        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
                        border: 'none',
                        marginLeft: idea === "Ask date to suggest" ? '5px' : '20px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: selectedButton === idea ? '#d13c39' : '#f5f5f5',
                        },
                    }}
                >
                    {idea}
                </Button>
            </Grid>
        ));
    }
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
                <h3 className='titleText' style={{ textAlign: 'center', marginTop: '70px', fontFamily: 'Lexend' }}>Let's meet up on<br /> <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime}</span>, and go to <span style={{ color: '#E4423F' }}> _</span></h3>
                <p className='paraText' style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', fontFamily: 'Lexend', fontWeight: 'lighter' }}>Select a pre-filled date idea or suggest your own</p>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '350px',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        justifyContent: 'center',
                        marginTop: '25px',
                        marginBottom: '56px',
                    }}
                >
                    {renderDateIdeaButtons()}
                </Grid>

                <Button
                    variant="contained"
                    onClick={handleNextButton}
                    sx={{
                        backgroundColor: '#E4423F',
                        borderRadius: '18px',
                        width: '100px',
                        fontFamily: 'Lexend, sans-serif',
                        '&:hover': {
                            backgroundColor: '#d13c39',
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </div>
    );
}