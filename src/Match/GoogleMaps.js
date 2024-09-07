import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { alignProperty } from '@mui/material/styles/cssUtils';

const libraries = ['places'];
const mapContainerStyle = {
    width: '20vw',
    height: '25vh',
    border: '2px solid black',
    borderRadius: '20px',
    marginLeft:'40px'
};
const center = {
    lat: 36.7783,  
    lng: -119.4179 
};

const GoogleMaps = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAc5mh0KmWDSBr4OuL4E5l6_wV7OUa-604',
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}>
                <Marker position={center} />
            </GoogleMap>
        </div >
    );
};

export default GoogleMaps;