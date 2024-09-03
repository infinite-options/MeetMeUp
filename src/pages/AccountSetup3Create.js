import '../App.css';
import backButton from '../assets/BackButton.png';
import progressBar from '../assets/progressBar40.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const mapContainerStyle = {
    width: '400px',
    height: '500px',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
};

const center = {
    lat: -32.015001263602,
    lng: 115.83650856893345,
};

export default function AccountSetup3Create() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        profileBio: '',
        location: '',
        sexualityStraight: false,
        sexualityBisexual: false,
        sexualityTransgender: false,
        sexualityLGBTQ: false,
        sexualityHomosexual: false,
        openToStraight: false,
        openToBisexual: false,
        openToTransgender: false,
        openToLGBTQ: false,
        openToHomosexual: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleButton = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: !formData[name]
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_API_KEY
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/accountSetup2Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/>
                <form className='form-container' onSubmit={handleNext} action='/accountSetup4Create'>
                    <div className='pc-header-text'>
                        About You
                    </div>
                    <div className='pc-sub-header-text'>
                        These details are about you and will be public to potential matches on meet me up.
                    </div>
                    <Box
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 0.88 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='name' label='Name' type='text' variant='outlined'/>
                        <TextField onChange={handleChange} name='age' label='Age' type='number' variant='outlined'/>
                        <TextField onChange={handleChange} name='gender' label='Gender' type='text' variant='outlined'/>
                        <TextField onChange={handleChange} name='profileBio' label='Profile Bio' type='text' variant='outlined'/>
                    </Box>
                    <div className='pc-header-text'>
                        Location
                    </div>
                    <div className='pc-sub-header-text'>
                        Your location helps us pin point where you are to provide better matches to you.
                    </div>
                    <Box
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 0.88 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='location' label='Location' type='text' variant='outlined'/>
                    </Box>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={center}
                    >
                        <Marker position={center}/>
                    </GoogleMap>
                    <div className='pc-header-text'>
                        Your Sexuality
                    </div>
                    <div className='pc-sub-header-text'>
                        Select the fields that best describe your sexuality
                    </div>
                    <Button variant='contained' onClick={handleButton} name='sexualityStraight'
                        sx={{ backgroundColor: formData['sexualityStraight'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Straight
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityBisexual'
                        sx={{ backgroundColor: formData['sexualityBisexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Bi-Sexual
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityTransgender'
                        sx={{ backgroundColor: formData['sexualityTransgender'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Trans-gender
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityLGBTQ'
                        sx={{ backgroundColor: formData['sexualityLGBTQ'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        LGBTQ
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityHomosexual'
                        sx={{ backgroundColor: formData['sexualityHomosexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Homosexual
                    </Button>
                    <div className='pc-header-text'>
                        Open To...
                    </div>
                    <div className='pc-sub-header-text'>
                        Select the fields that best describe what you are open to in a partner
                    </div>
                    <Button variant='contained' onClick={handleButton} name='openToStraight'
                        sx={{ backgroundColor: formData['openToStraight'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Straight
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToBisexual'
                        sx={{ backgroundColor: formData['openToBisexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Bi-Sexual
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToTransgender'
                        sx={{ backgroundColor: formData['openToTransgender'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Trans-gender
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToLGBTQ'
                        sx={{ backgroundColor: formData['openToLGBTQ'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        LGBTQ
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToHomosexual'
                        sx={{ backgroundColor: formData['openToHomosexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Homosexual
                    </Button>
                    <div className='form-button-container'>
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{
                                backgroundColor: '#E4423F',
                                maxWidth: '202px',
                                borderRadius: '41px',
                                marginTop: '20px',
                                boxShadow: 'none',
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}