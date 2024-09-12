import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar60.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid2 } from '@mui/material';
import DrawerContext from '../Assets/Components/DrawerContext';
import AccountContext from './AccountContext';
import React from 'react';
import DrawerOptions from '../Assets/Components/DrawerOptions';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import Dates from '../Assets/Components/Dates';
export default function AccountSetup4Create() {
    const [option, setOption] = React.useState('');
    // const 
    const {details, setDetails} = React.useContext(AccountContext);
    const [pickerValue, setPickerValue] = useState({
        single: ''
      })
    const [formData, setFormData] = useState({
        interestsEatingOut: false,
        interestsBikeRides: false,
        interestsDrinking: false,
        interestsDancing: false,
        interestsCooking: false,
        interestsBaking: false,
        interestsCrafting: false,
        interestsPainting: false,
        interestsSurfing: false,
        interestsTraveling: false,
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
        generalInterests: [],
    });

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
    })
    const handleSetSpecifics = (name, value) => {
        setSpecifics((prevSpecifics) => ({
          ...prevSpecifics,
          [name]: value,
        }));
        setFormData((formData) => ({
            ...formData,
            [name]: value,
          }));
      };
    const [passData, setPassData] = useState(null);
    const [complete, setComplete] = useState(false);

    const handleButtonBoolean = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: !formData[name]
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log('formData: ', formData);
        const specificsForm = populateFormData();
        console.log('specificsForm: ', specificsForm);
        const formObj = {
            interestsEatingOut: specificsForm.get('interestsEatingOut'),
            interestsBikeRides: specificsForm.get('interestsBikeRides'),
            interestsDrinking: specificsForm.get('interestsDrinking'),
            interestsDancing: specificsForm.get('interestsDancing'),
            interestsCooking: specificsForm.get('interestsCooking'),
            interestsBaking: specificsForm.get('interestsBaking'),
            interestsCrafting: specificsForm.get('interestsCrafting'),
            interestsPainting: specificsForm.get('interestsPainting'),
            interestsSurfing: specificsForm.get('interestsSurfing'),
            interestsTraveling: specificsForm.get('interestsTraveling'),
            height: specificsForm.get('height'),
            education: specificsForm.get('education'),
            body: specificsForm.get('body'),
            star: specificsForm.get('star'),
            drinking: specificsForm.get('drinking'),
            smoking: specificsForm.get('smoking'),
            children: specificsForm.get('children'),
            position: specificsForm.get('position'),
            religion: specificsForm.get('religion'),
            gender: specificsForm.get('gender'),
            nationality: specificsForm.get('nationality'),
            generalInterests: specificsForm.get('generalInterests')
        };
        setDetails(formObj);
        console.log('formObj: ', formObj);
    };

    const populateFormData = () => {
        const specificsForm = new FormData();    
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

        console.log(formData[type]);
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

    return (
        <div className='App'>
            <Container>
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
                                <Dates id={index} handleButton={handleButton} array={formData['generalInterests']} type={'generalInterests'}/>
                            </Grid2>
                        )}
                    </Grid2>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsEatingOut'
                        sx={{ backgroundColor: formData['interestsEatingOut'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Eating Out
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsBikeRides'
                        sx={{ backgroundColor: formData['interestsBikeRides'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Bike Rides
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsDrinking'
                        sx={{ backgroundColor: formData['interestsDrinking'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Drinking
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsDancing'
                        sx={{ backgroundColor: formData['interestsDancing'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Dancing
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsCooking'
                        sx={{ backgroundColor: formData['interestsCooking'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Cooking
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsBaking'
                        sx={{ backgroundColor: formData['interestsBaking'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Baking
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsCrafting'
                        sx={{ backgroundColor: formData['interestsCrafting'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Crafting
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsPainting'
                        sx={{ backgroundColor: formData['interestsPainting'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Painting
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsSurfing'
                        sx={{ backgroundColor: formData['interestsSurfing'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Surfing
                    </Button>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsTraveling'
                        sx={{ backgroundColor: formData['interestsTraveling'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
                    >
                        Traveling
                    </Button>
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
                    <Button variant='contained' name='genderID' style={{justifyContent: 'space-between'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '100%', borderRadius: '41px', marginTop: '20px',  textTransform: 'none' }}
                        onClick={()=>{
                            setOption('gender');
                        }}
                    >
                        <span>Gender Identification</span>
                        {specifics.gender?<span>{specifics.gender}</span>:<span>Not Entered</span>}
                    </Button>
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
                <DrawerContext.Provider value={{option, setOption, handleSetSpecifics, passData, setPassData, complete, setComplete, pickerValue, setPickerValue}}>
                    <DrawerOptions></DrawerOptions>
                </DrawerContext.Provider>
            </Container>
        </div>
    )
}