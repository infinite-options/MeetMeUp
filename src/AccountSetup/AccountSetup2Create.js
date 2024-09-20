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
    localStorage.clear() // NOTE: do not put this outside of a function!!!
    const navigate = useNavigate(); 
    const [existing, setExisting] = useState(false);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        password: '',
        passwordConfirm: '',
    });
    console.log('existing: ', existing);
    const [submit, setSubmit] = useState(false);
    const [check, setCheck] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNext = async () => {
        const url = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CreateAccount/MMU"; //Changed Endpoing
        
        let data = new FormData();
        /*data.append("user_uid", formData['profileBio']);*/
        data.append("email", formData['email']);  
        data.append("password", formData['password']);
        data.append("phone_number", formData['phone_number']);
        data.forEach((value, key) => {  
            console.log(`${key}: ${value}`);
        });
        setCheck(false);  

        try {
            const response = await axios.post(url, data,{
                headers: { 'Content-Type': 'application/json'}
            });
            console.log("RESPONSE: ", response.data);
            if (response.data.message == "User already exists") {
                await setExisting(true);
                window.alert('User Already Exists');
                // navigate('/accountSetup2Create')
            }
            localStorage.setItem('user_uid', response.data.result[0].user_uid);
            localStorage.setItem('user_email_id', formData['email']);
            localStorage.setItem('phone_number',formData["phone_number"]);
            console.log('localStorage items: ', localStorage.getItem('user_uid'), localStorage.getItem('user_email_id'));
            console.log("U_ID ",response.data.result[0].user_uid)
            

        } catch (error) {
            // setSubmit(false); 
            setCheck(true);
            console.error("Error occurred:", error);
            console.error(error.response);

            // if (error.response && error.response.status === 409) {
            // }
        }
    };
    const handleNavigate = () => {
        navigate(`/accountSetup3Create`);
    };
    return (
        <div className='App'>
            <Box sx={{ marginLeft: {xs: '5%',sm: '15%'}, marginRight: { xs: '5%',sm: '15%'}}}>
                <Progress percent="20%" prev="/accountSetup1Login" />
                <Box component="form" ref={formRef}>
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
                        <TextField onChange={handleChange} name='email' label='Email' type='email' variant='outlined'/>
                        <TextField onChange={handleChange} name='phone_number' label='Phone Number' type='tel' variant='outlined'/>
                    </Grid2>
                    <div className='pc-sub-header-text'>
                        Already have an account? <span onClick={() => {
                            navigate('/accountSetup1Login');
                        }}> <div className='red-text'>Click here</div></span>
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
                        <TextField onChange={handleChange} name='password' label='Create Password' type='password' variant='outlined'/>
                        <TextField onChange={handleChange} name='passwordConfirm' label='Confirm Password' type='password' variant='outlined'/>
                    </Grid2>
                    <HelperTextBox text='How do you need to make a secure password?' title={'Our Security Standards'}/>
                    <NextButton onClick={handleNext} next={existing ? '/accountSetup2Create' :'/accountSetup3Create'} notallowed={false}></NextButton>
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