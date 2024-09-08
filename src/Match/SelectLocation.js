import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SelectLocation.css';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';

export default function SelectLocation() {

    const location = useLocation();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [] } = location.state || {};
    //console.log("Select Location", user);
    //console.log("Selected Date Idea:", selectedDateIdea)
    const [center, setCenter] = useState({lat: -32.015001263602, lng: 115.83650856893345});

    const activities = [{ name: 'Coffee' }, { name: 'Lunch' }, { name: 'Surprise me' }];

    const navigate = useNavigate();
    const handleNextButton = (user) => {
        navigate('/nextSummary', { state: { user, selectedDay, selectedTime, selectedDateIdea } });

    }

    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const placesLibrary = ['places'];

    const mapContainerStyle = {
        width: '80%',
        height: '400px',
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        // border: 'solid',
        // borderWidth: '2px',
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

    return (
        <div>
            <div className='title' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
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
                <h2 className='userName' style={{ fontSize: '15px', marginTop: '35px', fontFamily: 'Lexend' }}>{user.name}</h2>
            </div>
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
            <div style={{ marginLeft: '30px' }}>
                <h2 style={{ fontWeight: 'bold', fontFamily: 'Lexend' }}>Location</h2>
                <p style={{ fontFamily: 'Lexend', fontSize: '11px' }}>Here's a map you can use to find out what might be convenient</p>
            </div>
            <div>
                <div>
                    {/* <GoogleMaps /> */}
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={center}
                        mapId='map_id'
                    >
                        <MarkerF position={center}/>
                    </GoogleMap>
                </div>
                <button className='saveButton'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#E4423F',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '10px',
                        width: '100px',
                        cursor: 'pointer',
                        marginTop: '56px',
                        marginLeft: '70px',
                        color: 'white',
                        fontFamily: 'Lexend',

                    }}>Save</button>

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
                        marginTop: '-38px',
                        marginLeft: '210px',
                        color: 'white',
                        fontFamily: 'Lexend',

                    }}>Next</button>
            </div>
        </div>
    )
}