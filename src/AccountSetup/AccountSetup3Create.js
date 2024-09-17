import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import { useState, useEffect } from 'react';
import { Box, Grid2, MenuItem, TextField } from '@mui/material';
import { Autocomplete, GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import Dates from "../Assets/Components/Dates";
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
    // set the formData to the current existing data
    const [userData, setUserData] = useState({});
    const [savedAddress, setSavedAddress] = useState('');
    const userId = localStorage.getItem('user_uid');
    const [center, setCenter] = useState({lat: -32.015001263602, lng: 115.83650856893345});
    const [searchResult, setSearchResult] = useState('');
    const tempValue = 'hello'

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        profileBio: '',
        suburb: '',
        country: '',
        sexuality: '',
        openTo: [],
    });
    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    console.log('openTo formData: ', formData.openTo)
    useEffect(() => {
        axios
          .get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
          .then((res) => {
            setUserData(res.data.result[0]);
            console.log(res.data.result[0]);
            const fetchedData = res.data.result[0];
            const openToArray = fetchedData.user_open_to.split(',');
            console.log('openTo: ', fetchedData.user_open_to);
            handleAddress(fetchedData.user_latitude, fetchedData.user_longitude)
            setCenter({lat: Number(fetchedData.user_latitude), lng: Number(fetchedData.user_longitude)});
            // setSearchResult(savedAddress);
            // TODO: might fix to go under handleAddress
            console.log('fetchedData Center: ', center);
            setFormData(
                {
                ...formData,
                name: `${fetchedData.user_first_name} ${fetchedData.user_last_name}`,
                age: fetchedData.user_age,
                gender: fetchedData.user_gender || '',
                profileBio: fetchedData.user_profileBio || '',
                suburb: fetchedData.user_suburb || '',
                // country: '',
                sexuality: fetchedData.user_sexuality || '',
                openTo: openToArray || [],
              });
          })
          .catch((error) => {
            console.log("Error fetching data", error);
          });
      }, []);
    
    const handleAddress = async (lat, lang) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${GOOGLE_API_KEY}`, {
                method: 'GET',
            });
        
            if(response.ok) {
                const result = await response.json();
                console.log(result);
                // const address = result.results[0]?.formatted_address;
                // // return address;
                // setSavedAddress(address);
                if (result.results.length > 0) {
                    const address = result.results[0].formatted_address;
                    setSavedAddress(address);  
                    console.log('Fetched Address: ', address); 
                  } else {
                    console.error('No address found for the given coordinates');
                  }
                // NOT ACTUALLY BEING SAVED!!
            }
            else {
                console.error('Response Err:', response.statusText);
            }
            } catch (err) {
                console.log("Try Catch Err:", err);
            }
    }
    
    console.log('userData: ', userData);
    console.log('userData Age: ', userData.user_age);

    const genders = [
        'Male',
        'Female',
        'Nonbinary',
    ]

    const sexuality = [
        'Straight',
        'Bisexual',
        'Transgender',
        'LGBTQ',
        'Homosexual',
    ]

    const openTo = [
        'Straight',
        'Bisexual',
        'Transgender',
        'LGBTQ',
        'Homosexual',
    ] 

    
    
    function onPlaceChanged() {
        if (searchResult !== '') {
            const place = searchResult.getPlace();
            console.log('place full: ', place.address_components);
            for(var i = 0; i < place.address_components.length; i++) {
                console.log('place: ', place.address_components[i]["long_name"]);
                if(place.address_components[i]["types"].includes("country")) {
                    formData['country'] = place.address_components[i]["long_name"];
                }
            }
            setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
            console.log('onPlaceCenter: ', center);
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

    const handleAddressChange = (e) => {
        setSavedAddress(e.target.value);
    };

    const handleButton = (id, type) => {
        if(formData[type].includes(id)) {
            const index = formData[type].indexOf(id);
            formData[type].splice(index, 1);
        }
        else {
            formData[type].push(id);
        }
    };

    const handleButtonSexuality = (id, type) => {
        if(formData[type] === id) {
            setFormData({
                ...formData, 
                [type]: ''
            });
            
        }
        else {
            setFormData({
                ...formData, 
                [type]: id
            });
        }
    };


    const handleNext = async () => {
        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        let fd = new FormData();
        console.log('user_uid local: ', localStorage.getItem('user_uid'));
        fd.append("user_uid", localStorage.getItem('user_uid'));
        fd.append("user_email_id", localStorage.getItem('user_email_id'));
        fd.append("user_first_name", formData['name'].split(" ")[0]);
        fd.append("user_last_name", formData['name'].split(" ")[1]);
        fd.append("user_age", formData['age']);
        fd.append("user_gender", formData['gender']);
        fd.append("user_suburb", formData['suburb']);
        fd.append("user_profile_bio", formData['profileBio']);
        fd.append("user_country", formData['country']);
        fd.append("user_latitude", center['lat']);
        fd.append("user_longitude", center['lng']);
        fd.append("user_sexuality", formData['sexuality']);
        fd.append("user_open_to", formData['openTo']);
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });

            if(response.ok) {
                const result = await response.json();
                console.log(result.data);
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
            <form className='form-container' onSubmit={handleNext}>
            <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
            <Progress percent="40%" prev="/accountSetup2Create" />
                <div className='pc-header-text'>
                    About You
                </div>
                <div className='pc-sub-header-text'>
                    These details are about you and will be public to potential matches on meet me up.
                </div>
                <Grid2 container
                    sx={{ '& > :not(style)': { marginTop: 1.5, width: 1 } }}>
                    <TextField onChange={handleChange}
                        sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                        InputLabelProps={{style: { color: "#E4423F" }}}
                        name='name' label='Full Name' type='text' variant='outlined'
                        value={formData['name']}

                    />
                    <Grid2 container >
                        <Grid2 size={6}>
                            <TextField onChange={handleChange}
                                sx={{width:"98%",'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                                InputLabelProps={{style: { color: "#E4423F" }}}
                                name='age' label='Age' type='number' variant='outlined'
                                value={formData['age']}
                            />
                        </Grid2>
                        <Grid2 size={6} >
                            <TextField onChange={handleChange}
                                sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}, width: 1}}
                                InputLabelProps={{style: { color: "#E4423F" }}}
                                name='gender' label='Gender' variant='outlined' select value={formData['gender']}>
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
                        value={formData['suburb']}
                    />
                    <TextField onChange={handleChange}
                        sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                        InputLabelProps={{style: { color: "#E4423F" }}}
                        name='profileBio' label='Profile Bio' type='text' variant='outlined' multiline rows={4}
                        value={formData['profileBio']}
                    />
                </Grid2>
                <div className='pc-header-text'>
                    Location
                </div>
                <div className='pc-sub-header-text'>
                    Your location helps us pin point where you are to provide better matches to you.
                </div>
                <Grid2 container
                    sx={{ '& > :not(style)': { marginTop: 1.5, width: 1 } }}>

                <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                    {/* NOTE: why is this input and not textField? does this affect the googlemap? */}
                    {/* <input
                        className='autocomplete-text'
                        type='text'
                        placeholder='Location'
                        style={{
                            fontSize: '14px',
                            display: 'flex',
                            width: '100%',
                            height: '25px',
                            marginTop: '10px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            padding: '10px',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            textOverflow: 'ellipses',
                        }}
                    /> */}
                    <TextField
                        className='autocomplete-text' onChange={handleAddressChange}
                        sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                        InputLabelProps={{style: { color: "#E4423F" }}}
                        variant='outlined'
                        fullWidth
                        name='location' label='Location' type='text'
                        defaultValue={`${savedAddress}`}
                    />
                </Autocomplete>
                </Grid2>

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
                <Grid2 container spacing={1} sx={{marginTop: 3}}>
                    {sexuality.map((index) => 
                        <Grid2 key={index}>
                            <Dates id={index} handleButton={handleButtonSexuality} array={formData['sexuality']} type={'sexuality'}/>
                        </Grid2>
                    )}
                </Grid2>
                <div className='pc-header-text'>
                    Open To...
                </div>
                <div className='pc-sub-header-text'>
                    Select the fields that best describe what you are open to in a partner
                </div>
                <Grid2 container spacing={1} sx={{marginTop: 3}}>
                    {openTo.map((index) => 
                        <Grid2 key={index}>
                            <Dates id={index} handleButton={handleButton} array={formData['openTo']} type={'openTo'}/>
                        </Grid2>
                    )}
                </Grid2>
                <HelperTextBox text='Why do we need this information?'/>
                <div className='form-button-container'>
                    <NextButton onClick={handleNext} next={'/accountSetup4Create'}></NextButton>
                </div>
                </Box>
            </form>
        </div>
    )
}