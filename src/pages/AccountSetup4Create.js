import '../App.css';
import HelperTextBox from './helperTextBox';
import backButton from '../assets/BackButton.png';
import progressBar from '../assets/progressBar60.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AccountSetup4Create() {
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
        bodyComp: '',
        starSign: '',
        drinking: '',
        smoking: '',
        kids: '',
        currentJob: '',
        religion: '',
        genderID: '',
        nationality: '',
    });

    const handleButtonBoolean = (e) => {
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

    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/accountSetup3Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/>
                <form className='form-container' onSubmit={handleNext} action='/accountSetup5Create'>
                    <div className='pc-header-text'>
                        Your General Interests
                    </div>
                    <div className='pc-sub-header-text'>
                        These interests help match you to better people on meet me up. Select or add as many interests as you want.
                    </div>
                    <Button variant='contained' onClick={handleButtonBoolean} name='interestsEatingOut'
                        sx={{ backgroundColor: formData['interestsEatingOut'] ? '#E4423F' : '#ffffff', color: '#000000',
                            maxWidth: '202px', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', marginRight: '-10px', textTransform: 'none' }}
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
                    <Button variant='contained' name='height' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Height
                    </Button>
                    <Button variant='contained' name='education' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Education
                    </Button>
                    <Button variant='contained' name='bodyComp' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Body Composition
                    </Button>
                    <Button variant='contained' name='starSign' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Star Sign
                    </Button>
                    <Button variant='contained' name='drinking' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Drinking
                    </Button>
                    <Button variant='contained' name='smoking' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Smoking
                    </Button>
                    <Button variant='contained' name='kids' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Kids
                    </Button>
                    <Button variant='contained' name='currentJob' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Current Job
                    </Button>
                    <Button variant='contained' name='religion' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Religion
                    </Button>
                    <Button variant='contained' name='genderID' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Gender Identification
                    </Button>
                    <Button variant='contained' name='nationality' style={{justifyContent: 'flex-start'}}
                        sx={{ backgroundColor: '#ffffff', color: '#000000',
                            width: '90%', borderRadius: '41px', marginTop: '20px', marginLeft: '20px', textTransform: 'none' }}
                    >
                        Nationality
                    </Button>
                    <HelperTextBox text="That's a lot of information..."/>
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