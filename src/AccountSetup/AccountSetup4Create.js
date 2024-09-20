import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar60.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid2, Box } from '@mui/material';
import DrawerContext from '../Assets/Components/DrawerContext';
import AccountContext from './AccountContext';
import React from 'react';
import DrawerOptions from '../Assets/Components/DrawerOptions';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import Dates from '../Assets/Components/Dates';
import axios from 'axios';

export default function AccountSetup4Create() {
    const [option, setOption] = React.useState('');
    // const 
    const {details, setDetails} = React.useContext(AccountContext);
    const [pickerValue, setPickerValue] = useState({
        single: ''
    })
    // TODO: a lot of general interests are getting created!!
    const [formData, setFormData] = useState({
        user_height: '',
        user_education: '',
        user_body_composition: '',
        user_star_sign: '',
        user_drinking: '',
        user_smoking: '',
        user_kids: '',
        user_job: '',
        user_religion: '',
        user_nationality: '',
        user_general_interests: [],
    });
    const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT

    console.log('userGeneral Interests', formData['user_general_interests'])
    console.log('setup4 formData: ', formData);

    // based on option set specific to passData
    const [specifics, setSpecifics] = useState({
        height: '',
        education: '',
        body: '',
        star: '',
        drinking: '',
        smoking: '',
        children: '',
        position: '',
        religion: '',
        gender: '',
        nationality: '',
        general_interests: [],
    })

    const handleSetSpecifics = (name, value) => {
        setSpecifics((prevSpecifics) => ({
            ...prevSpecifics,
            [name]: value,
        }));

        setFormData((formData) => ({
            ...formData,
            [specificsName[name]]: value,
        }));

        return value;
    };

    // use the setSpecifics
    const userId = localStorage.getItem('user_uid');
    const [loading, setLoading] = useState(true); 
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
                const fetchedData = response.data.result[0];
                setUserData(fetchedData);
                console.log('userData: ', userData)
                setLoading(false);
                handleSetSpecifics('height', fetchedData.user_height || '',);
                handleSetSpecifics('education', fetchedData.user_education || '',);
                handleSetSpecifics('body', fetchedData.user_body_composition || '',);
                handleSetSpecifics('star', fetchedData.user_star_sign || '',);
                handleSetSpecifics('drinking', fetchedData.user_drinking || '',);
                handleSetSpecifics('smoking', fetchedData.user_smoking || '',);
                handleSetSpecifics('children', fetchedData.user_kids || '',);
                handleSetSpecifics('position', fetchedData.user_job || '',);
                handleSetSpecifics('religion', fetchedData.user_religion || '',);
                handleSetSpecifics('nationality', fetchedData.user_nationality || '',);
                // const openToArray = fetchedData.user_open_to ? fetchedData.user_open_to.split(',') : [];

                const interestsArray = fetchedData.user_general_interests? fetchedData.user_general_interests.split(',') : [];
                setFormData(prevFormData => ({
                    ...prevFormData,
                    user_general_interests: interestsArray
                }));

                } catch (error) {
                    console.log("Error fetching data", error);
                };
        }
        if (userId) {
            fetchUserData();
        } else {
            setLoading(false);
            setNoId(true);
        }
      }, [userId]);

    const [passData, setPassData] = useState(null);
    const [complete, setComplete] = useState(false);

    const handleNext = async (e) => {
        console.log(e);
        console.log('formData: ', formData);
        const specificsForm = populateFormData();
        console.log('specificsForm: ', specificsForm);
        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: specificsForm,
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

    const populateFormData = () => {
        const specificsForm = new FormData();
        specificsForm.append("user_uid", localStorage.getItem('user_uid'));
        specificsForm.append("user_email_id", localStorage.getItem('user_email_id'));
        Object.entries(formData).forEach(([key, value]) => {
            specificsForm.append(key, value);
        });

        return specificsForm;
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

    const generalInterests= [
        'Eating Out',
        'Bike Rides',
        'Drinking',
        'Dancing',
        'Cooking',
        'Baking',
        'Crafting',
        'Painting',
        'Surfing',
        'Traveling'
    ]

    const specificsName = {
        height: 'user_height',
        education: 'user_education',
        body: 'user_body_composition',
        star: 'user_star_sign',
        drinking: 'user_drinking',
        smoking: 'user_smoking',
        children: 'user_kids',
        position: 'user_job',
        religion: 'user_religion',
        nationality: 'user_nationality',
    };

    if (loading) {
        return <div>Loading specifics</div>; 
    }
    
    if (noId) {
        return <div>No User Found</div>;
      }

    return (
        <div className='App'>
            <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
                {/* <Link to='/accountSetup3Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                {/* <Progress percent="60%" prev="/accountSetup3Create" /> */}
                <form className='form-container' onSubmit={handleNext}>
                    <Progress percent="60%" prev="/accountSetup3Create" />

                    <div className='pc-header-text'>
                        Your General Interests
                    </div>
                    <div className='pc-sub-header-text'>
                        These interests help match you to better people on meet me up. Select or add as many interests as you want.
                    </div>

                    <Grid2 container spacing={1} sx={{marginTop: 3}}>
                        {generalInterests.map((index) => 
                            <Grid2>
                                <Dates id={index} handleButton={handleButton} array={formData['user_general_interests']} type={'user_general_interests'}/>
                            </Grid2>
                        )}
                    </Grid2>
                    <div className='pc-header-text'>
                        Some Specifics
                    </div>
                    <div className='pc-sub-header-text'>
                        These help give a better insight into who you are and will allow matches to better understand you as a person.
                    </div>
                    <Button variant='contained' name='height' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('height');
                        }}
                    >
                        <span>Height</span>
                        {specifics.height?<span>{specifics.height}</span>:<span>Not Entered</span>}
                    </Button>
                    <Button variant='contained' name='education' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('education');
                        }}
                    >
                        <span>Education</span>
                        {specifics.education?<span>{specifics.education}</span>:<span>Not Entered</span>}
                        
                    </Button>
                    <Button variant='contained' name='bodyComp' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('body');
                        }}
                    >
                        <span>Body Composition</span>
                        {specifics.body?<span>{specifics.body}</span>:<span>Not Entered</span>}
                    </Button>
                    <Button variant='contained' name='starSign' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('star');
                        }}
                    >
                        <span>Star Sign</span>
                        {specifics.star?<span>{specifics.star}</span>:<span>Not Entered</span>}

                    </Button>
                    <Button variant='contained' name='drinking' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('drinking');
                        }}
                    >
                        <span>Drinking</span>
                        {specifics.drinking?<span>{specifics.drinking}</span>:<span>Not Entered</span>}
                        
                    </Button>
                    <Button variant='contained' name='smoking' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('smoking');
                        }}
                    >
                        <span>Smoking</span>
                        {specifics.smoking?<span>{specifics.smoking}</span>:<span>Not Entered</span>}
                        
                    </Button>
                    <Button variant='contained' name='kids' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('children');
                        }}
                    >
                        <span>Kids</span>
                        {specifics.children?<span>{specifics.children}</span>:<span>Not Entered</span>}
                    </Button>
                    <Button variant='contained' name='currentJob' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('position');
                        }}
                    >   
                        <span>Current Job</span>
                        {specifics.position?<span>{specifics.position}</span>:<span>Not Entered</span>}
                    </Button>
                    <Button variant='contained' name='religion' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px', textTransform: 'none' }}
                        onClick={()=>{
                            setOption('religion');
                        }}
                    >
                        <span>Religion</span>
                        {specifics.religion?<span>{specifics.religion}</span>:<span>Not Entered</span>}
                    </Button>
                    {/* <Button variant='contained' name='genderID' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px',  textTransform: 'none' }}
                        onClick={()=>{
                            setOption('gender');
                        }}
                    >
                        <span>Gender Identification</span>
                        {specifics.gender?<span>{specifics.gender}</span>:<span>Not Entered</span>}
                    </Button> */}
                    <Button variant='contained' name='nationality' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px',  textTransform: 'none' }}
                        onClick={()=>{
                            setOption('nationality');
                        }}
                    >
                        <span>Nationality</span>
                        {specifics.nationality?<span>{specifics.nationality}</span>:<span>Not Entered</span>}
                    </Button>
                    <HelperTextBox text="That's a lot of information..."/>
                    <div className='form-button-container'>
                        
                        <NextButton onClick={handleNext} next={'/accountSetup5Create'}></NextButton>

                    </div>
                </form>
                <DrawerContext.Provider value={{specifics, option, setOption, handleSetSpecifics, passData, setPassData, complete, setComplete, pickerValue, setPickerValue}}>
                    <DrawerOptions></DrawerOptions>
                </DrawerContext.Provider>
            </Box>
        </div>
    )
}