import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import TopTitle from '../Assets/Components/TopTitle';
import { Box, Button, Grid, Avatar, Typography } from '@mui/material';

export default function SelectPlace() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, AccountUser = [], accountUserData=[] } = location.state || {};
    const navigate = useNavigate();

    const [selectedButton, setSelectedButton] = useState("");

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
    };
    const userInterests = user.user_date_interests ? user.user_date_interests.split(',') : [];

    const renderDateIdeaButtons = () => {
        return dateIdeas.map((idea, index) => {
            const isUserInterest = userInterests.includes(idea);
            return (
                <Grid item xs={6} key={index}>
                    <Button
                        onClick={() => handleButtonClick(idea)}
                        fullWidth
                        variant={selectedButton === idea ? "contained" : "outlined"}
                        sx={{
                            backgroundColor: selectedButton === idea ? '#E4423F' : '#FFFFFF',
                            color: selectedButton === idea ? '#FFFFFF' : '#000000',
                            height: '60px',
                            borderRadius: '20px',
                            fontFamily: 'Lexend, sans-serif',
                            fontSize: { xs: '14px', sm: '16px', md: '18px' }, 
                            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
                            border: isUserInterest ? '2px solid #E4423F' : 'none',
                            textTransform: 'none',
                            padding: { xs: '10px', sm: '12px', md: '15px' }, 
                            margin: { xs: '8px 0', sm: '10px 0', md: '12px 0' }, 
                            '&:hover': {
                                backgroundColor: selectedButton === idea ? '#d13c39' : (isUserInterest ? '#FFD1D1' : '#f5f5f5'),
                            },
                        }}
                    >
                        {idea}
                    </Button>
                </Grid>
            );
        });
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '20px' }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: { xs: '10px', md: '20px' }, mt: 2, width: '100%' }}>
                <Box sx={{ mr: { xs: 5, md: 10 } }}><TopTitle /></Box>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mr: { xs: 4, md: 20 } }}>
                    <Avatar
                        //src={AccountUser[0].photo?JSON.parse(AccountUser[0].photo):''}
                        src={AccountUser.length > 0 && AccountUser[0].photo ? JSON.parse(AccountUser[0].photo)[0] : ''}
                        alt='Account User'
                        sx={{
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 },
                            border: '2px solid white',
                            zIndex: 1
                        }}
                    />
                    <Avatar
                        src={user.user_photo_url?JSON.parse(user.user_photo_url)[0]:''}
                        alt='Matched User'
                        sx={{
                            width: { xs: 40, sm: 50 },
                            height: { xs: 40, sm: 50 },
                            border: '2px solid white',
                            marginLeft: '-15px',
                            zIndex: 0
                        }}
                    />
                    <Typography variant="h6" sx={{ mt: 1, fontFamily: 'Lexend', fontSize: { xs: '16px', md: '20px' }, ml: { xs: 1, md: 2 } }}>{user.user_first_name}</Typography>
                    
                </Box>
            </Box>
            
            <Typography variant="h5" sx={{ textAlign: 'center', mt: 7, fontFamily: 'Lexend', fontSize: '22px', mx: '15%' }}>
                Let's meet up on
                <Typography variant="h5" component="span" color="primary" sx={{ fontFamily: 'Lexend', color: '#E4423F' }}> {selectedDay} {selectedTime}</Typography>, and go to
                <Typography component="span" color="primary" sx={{ fontFamily: 'Lexend', color: '#E4423F' }}> _</Typography>
            </Typography>
            <Typography sx={{ textAlign: 'center', mt: 3, fontSize: '14px', fontFamily: 'Lexend', mx: '15%' }}>
                Select a pre-filled date idea or suggest your own
            </Typography>

            <Box sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ maxWidth: '600px', margin: '0 auto' }}>
                    {renderDateIdeaButtons()}
                </Grid>
            </Box>

            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="contained"
                    onClick={handleNextButton}
                    sx={{
                        backgroundColor: '#E4423F',
                        borderRadius: '18px',
                        width: '100px',
                        fontFamily: 'Lexend, sans-serif',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#d13c39',
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}
