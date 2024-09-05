import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar20.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';

export default function AccountSetup2Create() {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log('formData: ', formData);
    };

    return (
        <div className='App'>
            <div className='white-background'>
                {/* <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                <Progress percent="20%" prev="/accountSetup1Login" />

                <form className='form-container' onSubmit={handleNext}>
                    <div className='pc-header-text'>
                        Account Details
                    </div>
                    <div className='pc-sub-header-text'>
                        We need some basic details to help verify your identity and account.
                    </div>
                    <Box
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 0.88 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='email' label='Email' type='email' variant='outlined'/>
                        <TextField onChange={handleChange} name='phoneNumber' label='Phone Number' type='tel' variant='outlined'/>
                    </Box>
                    <div className='pc-sub-header-text'>
                        Already have an account? <span onClick={() => {
                            navigate('/accountSetup1Login');
                        }}>Click Here</span>
                    </div>
                    <div className='pc-header-text'>
                        Security
                    </div>
                    <div className='pc-sub-header-text'>
                        Make a strong passcode that will be very hard to guess. View our security guidelines here.
                    </div>
                    <Box
                        sx={{ '& > :not(style)': { marginTop: 1.5, marginLeft: 3, marginRight: 3, width: 0.88 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='password' label='Create Password' type='password' variant='outlined'/>
                        <TextField onChange={handleChange} name='passwordConfirm' label='Confirm Password' type='password' variant='outlined'/>
                    </Box>
                    <HelperTextBox text='How do you need to make a secure password?'/>
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
                        <NextButton onClick={handleNext} next={'/accountSetup3Create'}></NextButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
