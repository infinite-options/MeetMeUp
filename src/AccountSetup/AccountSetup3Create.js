import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar40.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid2, MenuItem, TextField } from '@mui/material';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Progress from '../Assets/Components/Progress';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const placesLibrary = ['places'];

const mapContainerStyle = {
    width: '375px',
    height: '450px',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
};

var center = {
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

    const genders = [
        'Male',
        'Female',
        'Nonbinary',
    ]

    
    const [searchResult, setSearchResult] = useState('');
    
    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    function onPlaceChanged() {
        if (searchResult != null || searchResult !== "") {
            const place = searchResult.getPlace();
            const formattedAddress = place.formatted_address;
            formData['location'] = formattedAddress;
            center['lat'] = place.geometry.location.lat();
            center['lng'] = place.geometry.location.lng();
            console.log(place);
            console.log(center);
        } else {
            alert('Please enter text');
        }
    }

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
        <div className='App'>
            <div className='white-background'>
                {/* <Link to='/accountSetup2Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                <Progress percent="40%" prev="/accountSetup2Create" />
                
                <form className='form-container' onSubmit={handleNext} action='/accountSetup4Create'>
                    <div className='pc-header-text'>
                        About You
                    </div>
                    <div className='pc-sub-header-text'>
                        These details are about you and will be public to potential matches on meet me up.
                    </div>
                    <Grid2 container
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 1 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='name' label='Name' type='text' variant='outlined'/>
                        <Grid2 container>
                            <Grid2 size={5.5} sx={{marginRight: 1.5}}>
                                <TextField onChange={handleChange} name='age' label='Age' type='number' variant='outlined'/>
                            </Grid2>
                            <Grid2 size={5.5} sx={{marginLeft: 1.5}}>
                                <TextField onChange={handleChange} name='gender' label='Gender' variant='outlined' select sx={{ width: 1 }} defaultValue = ''>
                                    {genders.map((gender) => (
                                        <MenuItem key={gender} value={gender}>
                                            {gender}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid2>
                        </Grid2>
                        <TextField onChange={handleChange} name='suburb' label='Suburb' type='text' variant='outlined'/>

                        <TextField onChange={handleChange} name='profileBio' label='Profile Bio' type='text' variant='outlined' multiline rows={4}/>
                    </Grid2>
                    <div className='pc-header-text'>
                        Location
                    </div>
                    <div className='pc-sub-header-text'>
                        Your location helps us pin point where you are to provide better matches to you.
                    </div>
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        <input
                            type='text'
                            placeholder='Location'
                            style={{
                                fontSize: '14px',
                                display: 'flex',
                                width: '350px',
                                height: '25px',
                                marginTop: '10px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                padding: '10px',
                                border: '1px solid transparent',
                                borderRadius: '5px',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                                textOverflow: 'ellipses',
                            }}
                        />
                    </Autocomplete>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={center}
                        mapId='map_id'
                        onLoad={map => {
                            const bounds = new window.google.maps.LatLngBounds(center);
                            map.fitBounds(bounds);
                        }}
                    >
                        <MarkerF position={center}/>
                    </GoogleMap>
                    <HelperTextBox text='Why do we need your location?'/>
                    <div className='pc-header-text'>
                        Your Sexuality
                    </div>
                    <div className='pc-sub-header-text'>
                        Select the fields that best describe your sexuality
                    </div>
                    <Button variant='contained' onClick={handleButton} name='sexualityStraight'
                        sx={{ backgroundColor: formData['sexualityStraight'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Straight
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityBisexual'
                        sx={{ backgroundColor: formData['sexualityBisexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Bi-Sexual
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityTransgender'
                        sx={{ backgroundColor: formData['sexualityTransgender'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Trans-gender
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityLGBTQ'
                        sx={{ backgroundColor: formData['sexualityLGBTQ'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        LGBTQ
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='sexualityHomosexual'
                        sx={{ backgroundColor: formData['sexualityHomosexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
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
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Straight
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToBisexual'
                        sx={{ backgroundColor: formData['openToBisexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Bi-Sexual
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToTransgender'
                        sx={{ backgroundColor: formData['openToTransgender'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Trans-gender
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToLGBTQ'
                        sx={{ backgroundColor: formData['openToLGBTQ'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        LGBTQ
                    </Button>
                    <Button variant='contained' onClick={handleButton} name='openToHomosexual'
                        sx={{ backgroundColor: formData['openToHomosexual'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Homosexual
                    </Button>
                    <HelperTextBox text='Why do we need this information?'/>
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