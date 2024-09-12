import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar40.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid2, MenuItem, TextField } from '@mui/material';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import Dates from "../Assets/Components/Dates";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const placesLibrary = ['places'];

const mapContainerStyle = {
    width: '95%',
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
        suburb: '',
        location: '',
        sexuality: [],
        openTo: [],
    });

    const genders = [
        'Male',
        'Female',
        'Nonbinary',
    ]

    const sexuality = [
        'Straight',
        'Bixseuxal',
        'Transgender',
        'LGBTQ',
        'Homosexual',
    ]

    const openTo = [
        'Straight',
        'Bixseuxal',
        'Transgender',
        'LGBTQ',
        'Homosexual',
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

    const handleButton = (id, type) => {
        if(formData[type].includes(id)) {
            const index = formData[type].indexOf(id);
            formData[type].splice(index, 1);
        }
        else {
            formData[type].push(id);
        }

        console.log(formData[type]);
    };

    const handleNext = async () => {
        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        let fd = new FormData();
        fd.append("user_uid", "100-000008");
        fd.append("user_email_id", "pmarathay@yahoo.com");
        fd.append("user_first_name", formData['name'].split(" ")[0]);
        fd.append("user_last_name", formData['name'].split(" ")[1]);
        fd.append("user_age", formData['age']);
        fd.append("user_gender", formData['gender']);
        fd.append("user_suburb", formData['suburb']);
        fd.append("user_profile_bio", formData['profileBio']);
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });

            if(response.ok) {
                const result = await response.json();
                console.log(result);
            }
            else {
                console.error('Response Err:', response.statusText);
            }
        } catch (err) {
            console.log("Try Catch Err:", err);
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

    return (
        <div className='App'>
            <div className='white-background'>
                {/* <Link to='/accountSetup2Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                
                <Progress percent="40%" prev="/accountSetup2Create" />
                
                <form className='form-container' onSubmit={handleNext}>
                <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
                    <div className='pc-header-text'>
                        About You
                    </div>
                    <div className='pc-sub-header-text'>
                        These details are about you and will be public to potential matches on meet me up.
                    </div>
                    <Grid2 container
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 1 } }}>
                        <TextField onChange={handleChange}
                            sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='name' label='Full Name' type='text' variant='outlined'
                        />
                        <Grid2 container >
                            <Grid2 size={6}>
                                <TextField onChange={handleChange}
                                    sx={{width:"98%",'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                                    InputLabelProps={{style: { color: "#E4423F" }}}
                                    name='age' label='Age' type='number' variant='outlined'
                                />
                            </Grid2>
                            <Grid2 size={6} >
                                <TextField onChange={handleChange}
                                    sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}, width: 1}}
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
                            sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                            InputLabelProps={{style: { color: "#E4423F" }}}
                            name='suburb' label='Suburb' type='text' variant='outlined'
                        />
                        <TextField onChange={handleChange}
                            sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
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
                                width: '95%',
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
                    <Grid2 container spacing={1} sx={{marginTop: 3, marginLeft: 3}}>
                        {sexuality.map((index) => 
                            <Grid2>
                                <Dates id={index} handleButton={handleButton} array={formData['sexuality']} type={'sexuality'}/>
                            </Grid2>
                        )}
                    </Grid2>
                    <div className='pc-header-text'>
                        Open To...
                    </div>
                    <div className='pc-sub-header-text'>
                        Select the fields that best describe what you are open to in a partner
                    </div>
                    <Grid2 container spacing={1} sx={{marginTop: 3, marginLeft: 3}}>
                        {openTo.map((index) => 
                            <Grid2>
                                <Dates id={index} handleButton={handleButton} array={formData['openTo']} type={'openTo'}/>
                            </Grid2>
                        )}
                    </Grid2>
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
                        
                        <NextButton onClick={handleNext} next={'/accountSetup4Create'}></NextButton>
                    
                    </div>
                    </Box>
                </form>
                
            </div>
        </div>
    )
}