import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import { useState } from 'react';
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
        user_height: '',
        user_education: '',
        user_body_composition: '',
        user_star_sign: '',
        user_drinking: '',
        user_smoking: '',
        user_kids: '',
        user_job: '',
        user_religion: '',
        user_gender: '',
        user_nationality: '',
        user_general_interests: [],
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
            [specificsName[name]]: value,
        }));

        return value;
    };

    const [passData, setPassData] = useState(null);
    const [complete, setComplete] = useState(false);

    const handleNext = async (e) => {
        console.log(e);
        console.log('formData: ', formData);
        const specificsForm = populateFormData();
        console.log('specificsForm: ', specificsForm);
        const formObj = {
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
        gender: 'user_gender',
        nationality: 'user_nationality',
    };

    return (
        <div className='App'>
            <Container>
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