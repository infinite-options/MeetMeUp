import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar20.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid2, Button, TextField, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import React, { useRef } from 'react';
import Grid from "@mui/material/Grid2";
import axios from "axios";

export default function AccountSetup2Create() {
    const navigate = useNavigate(); 

    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
    });
    const [submit, setSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleNext = (e) => {
    //     const form = formRef.current;
    //     console.log(e);
    //     console.log('formData: ', formData);
    //     if (form) {
    //         const data = new FormData(form);
    //         const formObj = {
    //             user_email_id: data.get('email'),
    //             user_phone_number: data.get('phoneNumber'),
    //             user_password_hash: data.get('password'),
    //         }
    //         console.log('formObj: ', formObj);
    //         form.submit();
    //     }
    // };
    const handleNavigate = () => {
        navigate(`/accountSetup3Create`);
    };
    const handleSubmit = (e) => {
        setSubmit(true);
        e.preventDefault();
        const form = e.currentTarget;
        console.log(e);
        console.log('formData: ', formData);
        const userID = '100-000008';
        if (form) {
            const data = new FormData(form);
            const formObj = {
                user_email_id: data.get('user_email_id'),
                user_phone_number: data.get('user_phone_number'),
                user_password_hash: data.get('password'),
            }
            // data.append('user_uid', '100-000008');
            
            data.delete('passwordConfirm');
            data.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            localStorage.setItem('user_email_id', data.get('user_email_id'));
            console.log('localStorage email 2: ', localStorage.getItem('user_email_id'));
            console.log('formObj: ', formObj);
            axios
            .post(
                `https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo`,
                data
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

    return (
        <div className='App'>
            <Box sx={{marginLeft:'15%', marginRight:'15%'}}>

                {/* <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                <Progress percent="20%" prev="/accountSetup1Login" />

                <Box component="form" ref={formRef} onSubmit={handleSubmit}>
                    <div className='pc-header-text'>
                        Account Details
                    </div>
                    <div className='pc-sub-header-text'>
                        We need some basic details to help verify your identity and account.
                    </div>
                    <Grid2 container
                        sx={{ '& > :not(style)': { marginTop: 1.5, width: 1 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='user_email_id' label='Email' type='email' variant='outlined'/>
                        <TextField onChange={handleChange} name='user_phone_number' label='Phone Number' type='tel' variant='outlined'/>
                    </Grid2>
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
                    <Grid2 container
                        sx={{ '& > :not(style)': { marginTop: 1.5, width: 1 } }}
                        autoComplete='off'
                    >
                        <TextField onChange={handleChange} name='user_password_hash' label='Create Password' type='password' variant='outlined'/>
                        <TextField onChange={handleChange} name='passwordConfirm' label='Confirm Password' type='password' variant='outlined'/>
                    </Grid2>
                    <HelperTextBox text='How do you need to make a secure password?'/>

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
                        {/* <NextButton></NextButton> */}
                </Box>
                <Grid2 container justifyContent="center">
                <FormGroup>
                        <FormControlLabel
                            required
                            control={<Checkbox/>}
                            label={
                                <span>
                                   I agree to the <Link to='/termsandconditions'><div className='red-text'>Terms and Conditions</div></Link>
                                   </span>
                            }
                        />
                        <FormControlLabel
                            required
                            control={<Checkbox/>}
                            label={
                                <span>
                                    I agree to the<Link to='/privacypolicy'> <div className='red-text'>Privacy Policy</div></Link>
                                </span>
                            }
                        />
                    </FormGroup>
                    </Grid2>
            </Box>
        </div>
    )
}
