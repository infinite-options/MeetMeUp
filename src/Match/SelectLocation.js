import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SelectLocation.css';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import ArrowBackIcon from '../Assets/Images/BackButton.png';
import { Box, Button, TextField, Typography, Avatar  } from '@mui/material';
import TopTitle from '../Assets/Components/TopTitle';

export default function SelectLocation() {

    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [] } = location.state || {};
    //console.log("Select Location", user);
    //console.log("Selected Date Idea:", selectedDateIdea)


    const activities = [{ name: 'Coffee' }, { name: 'Lunch' }, { name: 'Surprise me' }];
    const [formattedAddress, setFormattedAddress] = useState('');

    const navigate = useNavigate();

    const [center, setCenter] = useState({ lat: -32.015001263602, lng: 115.83650856893345 });
    const [searchResult, setSearchResult] = useState('');

    const handleNextButton = (user) => {
        navigate('/nextSummary', { state: { user, selectedDay, selectedTime, selectedDateIdea, AccountUser, formattedAddress } });

    }
    const handleBackClick = () => {
        window.history.back();
    };

    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const placesLibrary = ['places'];

    const mapContainerStyle = {
        width: '350px',
        height: '250px',
        border: '2px solid #000',
        borderRadius: '10px',

    };

    // const mapContainerStyle = {
    //     width: '80%',
    //     height: '400px',
    //     marginTop: '10px',
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //     // border: 'solid',
    //     // borderWidth: '2px',
    //     borderRadius: '10px',

    // };

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
            console.log("formatted address:", formattedAddress)
            //formData['location'] = formattedAddress;
            setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
            setFormattedAddress(formattedAddress);
        } else {
            alert('Enter in a new location');
        }
    }


    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '20px', width: '100%' }}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <div style={{marginRight:'18px'}}><TopTitle/> </div>
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
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>This is when <span style={{ fontWeight: 'bold' }}>{user.name}</span> is available</p>
                <p>And these are the <span style={{ fontWeight: 'bold' }}>activities</span> they enjoy:</p>
                <div>
                    {activities.map((activity, index) => (
                        <button
                            key={index}
                            style={{
                                backgroundColor: 'white',
                                border: '2px solid #808080',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontFamily: 'Lexend',
                                fontSize: '13px',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                        >
                            {activity.name}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <h2 style={{
                    fontWeight: 'bold',
                    fontFamily: 'Lexend',
                    marginBottom: '10px',
                }}>
                    Location
                </h2>
                <p style={{
                    fontFamily: 'Lexend',
                    fontSize: '11px',
                    maxWidth: '300px'
                }}>
                    Here's a map you can use to find out what might be convenient
                </p>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: '350px', marginBottom: '20px' }} >
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} >
                        <TextField
                            placeholder="Location"
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                    padding: '10px',
                                },
                            }}
                        />
                    </Autocomplete>
                </Box>

                <Box sx={{ width: '100%', maxWidth: '350px', marginBottom: '20px' }}>
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
                        marginTop: '56px',
                        '&:hover': {
                            backgroundColor: '#d13c39',
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </div>
    )
}