import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar40.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid2, MenuItem, TextField, Typography } from '@mui/material';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import { useNavigate } from 'react-router-dom'; 
import Grid from "@mui/material/Grid2";
import axios from 'axios';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const placesLibrary = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '450px',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
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

    const [center, setCenter] = useState({lat: -32.015001263602, lng: 115.83650856893345});
    const [searchResult, setSearchResult] = useState('');
    
    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    function onPlaceChanged() {
        if (searchResult !== '') {
            const place = searchResult.getPlace();
            const formattedAddress = place.formatted_address;
            formData['location'] = formattedAddress;
            setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
        } else {
            alert('Enter in a new location');
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
    const navigate = useNavigate(); 

    const handleNavigate = () => {
        navigate(`/accountSetup4Create`);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(e);
        console.log('formData: ', formData);
        if (form) {
            const data = new FormData(form);
            const formObj = {
                name: data.get('name'),
                user_age: data.get('age'),
                user_gender: data.get('gender'),
            }
            data.append('user_uid', '100-000008');
            const user_uid = '100-000008';
            data.append('user_email_id', localStorage.getItem('user_email_id'));
            console.log('localStorage email: ', data.get('user_email_id'));
            data.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            console.log('formObj: ', formObj);
            axios
            .put(
                `https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${user_uid}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error occurred:", error); // This will log the 404 error
              });
            handleNavigate();
        }
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
    
    const fieldStyle = {'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}, width: 1};
    return (
        <div className='App'>
            <Box sx={{marginLeft:'15%', marginRight:'15%'}}>       
                <Progress percent="40%" prev="/accountSetup2Create" />

                <Box component="form" onSubmit={handleSubmit}>
                    {/* TODO: FIX FORMATTING */}
                    <div className='pc-header-text'>
                        About You
                    </div>
                    <div className='pc-sub-header-text'>
                        These details are about you and will be public to potential matches on meet me up.
                    </div>
                    <Grid2 container
                        sx={{ '& > :not(style)': { marginTop: 1.5, width: 1 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange}
                            sx={fieldStyle}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='name' label='Full Name' type='text' variant='outlined'
                        />
                        <Grid2 container spacing={1}>
                            <Grid2 size={6}>
                                <TextField onChange={handleChange}
                                    sx={fieldStyle}
                                    InputLabelProps={{style: { color: "#E4423F" }}}
                                    name='age' label='Age' type='number' variant='outlined'
                                />
                            </Grid2>
                            <Grid2 size={6} >
                                <TextField onChange={handleChange}
                                    sx={fieldStyle}
                                    InputLabelProps={{style: { color: "#E4423F" }}}
                                    name='gender' label='Gender' variant='outlined' select defaultValue = ''>
                                    {genders.map((gender) => (
                                        <MenuItem key={gender} value={gender}>
                                            {gender}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid2>
                        </Grid2>
                        <TextField onChange={handleChange}
                            sx={fieldStyle}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='suburb' label='Suburb' type='text' variant='outlined'
                        />
                        <TextField onChange={handleChange}
                            sx={fieldStyle}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='profileBio' label='Profile Bio' type='text' variant='outlined' multiline rows={4}
                        />
                    </Grid2>
                    <div className='pc-header-text'>
                        Location
                    </div>
                    <div className='pc-sub-header-text'>
                        Your location helps us pin point where you are to provide better matches to you.
                    </div>
                    <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                        {/* <TextField onChange={handleChange}
                            sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='profileBio' label='Profile Bio' type='text' variant='outlined' multiline rows={4}
                        /> */}
                        {/* NOTE: why is this input and not textField? does this affect the googlemap? */}
                        <input
                            className='autocomplete-text'
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
                                border: '1px solid gray',
                                borderRadius: '5px',
                                textOverflow: 'ellipses',
                            }}
                        />
                    </Autocomplete>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            mapId='map_id'
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
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginRight: '-10px', textTransform: 'none' }}
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
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginRight: '-10px', textTransform: 'none' }}
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
                        {/* <Button
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
                        </Button> */}
                        
                        <Grid container size={12} justifyContent="center">
                        <Button
                        variant='contained'
                        type='submit'
                        sx={{width:"130px", backgroundColor:"#E4423F", 
                            borderRadius:"25px", height:"45px", 
                            color:"white", marginTop:"40px", 
                            mb:"40px", textTransform:"none", 
                            fontFamily:"Lexend", 
                            fontSize:"18px", fontWeight:"regular"}}
                        >Next</Button> 
                        </Grid>

                    </div>
                </Box>
            </Box>
  
        </div>
    )
}