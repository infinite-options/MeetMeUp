import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SelectLocation.css';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import TopTitle from '../Assets/Components/TopTitle';

export default function SelectLocation() {
    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [] } = location.state || {};

    const activities = [{ name: 'Coffee' }, { name: 'Lunch' }, { name: 'Surprise me' }];
    const [formattedAddress, setFormattedAddress] = useState('');
    const navigate = useNavigate();
    const [center, setCenter] = useState({ lat: -32.015001263602, lng: 115.83650856893345 });
    const [searchResult, setSearchResult] = useState('');

    const handleNextButton = async (user) => {
        try {
            await sendDataToAPI(selectedDateIdea, formattedAddress, '-32.015001263602', '115.83650856893345', '200-0000011');
            navigate('/nextSummary', { state: { user, selectedDay, selectedTime, selectedDateIdea, AccountUser, formattedAddress } });
        } catch (error) {
            console.error('Error:', error);

        }
    };

    // const handleNextButton = (user) => {
    //     navigate('/nextSummary', { state: { user, selectedDay, selectedTime, selectedDateIdea, AccountUser, formattedAddress } });
    // }

    const sendDataToAPI = async (datetype, datelocation, latitude, longitude, uid) => {
        const formData = new FormData();
        formData.append('meet_date_type', datetype);
        formData.append('meet_location', datelocation);
        formData.append('meet_latitude', latitude);
        formData.append('meet_longitude', longitude);
        formData.append('meet_uid', uid);

        // const data={
        //     meet_data_type : datatype,
        //     meet_location: datelocation,
        //     meet_latitude: latitude,
        //     meet_longitude: longitude,
        //     meet_uid:uid
        // };

        try {
            const response = await fetch('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/meet', {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            console.log("Success:", result);
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    };





    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const placesLibrary = ['places'];

    const mapContainerStyle = {
        width: { xs: '80%', md: '100%' },
        height: '300px',
        border: '2px solid #000',
        borderRadius: '10px',
    };

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY,
        libraries: placesLibrary,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    function onPlaceChanged() {
        if (searchResult !== '') {
            const place = searchResult.getPlace();
            const formattedAddress = place.formatted_address;
            console.log("formatted address:", formattedAddress);
            setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
            setFormattedAddress(formattedAddress);
        } else {
            alert('Enter in a new location');
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: { xs: 2, md: 4 } }}>
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
                        src={user.user_photo_url ? JSON.parse(user.user_photo_url)[0] : ''}
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


            <Box sx={{ mt: 3, textAlign: 'center', mx: { xs: 1, sm: 5 } }}>
                {/* <Typography variant="body1" sx={{ padding: '5px', fontFamily: 'Lexend', fontSize: { xs: '18px', md: '23px' }, textAlign: 'center', mt: { xs: 4, md: '100px' }, mx: { xs: '5%', sm: '10%' } }}>
                    This is when <Box component="span" sx={{ fontWeight: 'bold' }}>{user.name}</Box> is available and these are the <Box component="span" sx={{ fontWeight: 'bold' }}>activities</Box> they enjoy:
                </Typography> 
                <Box sx={{ mt: 1 }}>
                    {activities.map((activity, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            sx={{
                                backgroundColor: 'white',
                                border: '2px solid #808080',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontFamily: 'Lexend',
                                fontSize: { xs: 12, md: 14 },
                                cursor: 'pointer',
                                marginRight: '5px',
                                mt: 1,
                                color: '#E4423F',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    border: '2px solid #808080',
                                },
                            }}
                        >
                            {activity.name}
                        </Button>
                    ))}
                </Box>*/}
                <Typography variant="body1" sx={{ padding: '25px', fontFamily: 'Lexend', fontSize: { xs: '18px', md: '23px' }, textAlign: 'center', mt: { xs: 4, md: '110px' }, mx: { xs: '5%', sm: '10%' } }}>
                    Let's meet up on <span style={{ color: '#E4423F' }}>{selectedDay} {selectedTime},</span> and go to <span style={{ color: '#E4423F' }}>{selectedDateIdea}</span> at the <span style={{ color: '#E4423F' }}>_</span>
                </Typography>
            </Box>


            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Lexend',
                    mt: 2,
                    textAlign: 'center',
                    fontSize: { xs: 16, sm: 18 },
                    mx: { xs: 2, sm: '15%' }
                }}
            >
                Location
            </Typography>
            <Typography sx={{ textAlign: 'center', mt: 1, fontSize: { xs: 12, sm: 13 }, fontFamily: 'Lexend', mx: { xs: 2, sm: '15%' } }}  >
                Here's a map you can use to find out what might be convenient.
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: { xs: '10px', sm: '20px' },
                }}
            >

                <Box sx={{ width: { xs: '80%', md: '100%' }, maxWidth: '360px', mb: 2, fontFamily: 'Lexend', textAlign: 'center', mx: { xs: '15%', sm: '10%' }, padding: '5px' }} >
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <TextField
                            placeholder="Location"
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: { xs: 12, sm: 14 },
                                    padding: '10px',
                                }
                            }}
                        />
                    </Autocomplete>
                </Box>


                <Box sx={{ width: { xs: '80%', md: '100%' }, maxWidth: '360px', mb: 2, mx: { xs: 1, sm: '15%' } }}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={center}
                        mapId='map_id'
                    >
                        <MarkerF position={center} />
                    </GoogleMap>
                </Box>


                <Button
                    variant="contained"
                    onClick={() => handleNextButton(user)}
                    sx={{
                        backgroundColor: '#E4423F',
                        borderRadius: '18px',
                        width: '100px',
                        fontFamily: 'Lexend, sans-serif',
                        mt: 4,
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
