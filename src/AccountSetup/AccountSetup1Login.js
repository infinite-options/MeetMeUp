import '../App.css';
import backgroundImage from '../Assets/Images/accountSetup1Login.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Checkbox, FormGroup, FormControlLabel, TextField } from '@mui/material';

export default function AccountSetup1Login() {
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataLogin({
            ...formDataLogin,
            [name]: value
        });
    };
    const handleSubmitLogin = (e) => {
        console.log(e)
        console.log(formDataLogin);
    };
    const handleSubmitCreate = (e) => {
        console.log(e)
    };
    return (
        <div className='big-container'>
            <div className='red-overlay'/>
            <img src={backgroundImage} alt='accountSetup1Login'/>
            <div className='rounded-box'>
                <div className='title-text'>
                    meet me up
                </div>
                <div className='header-text'>
                    Let’s get you out there
                </div>
                <Box
                    component='form'
                    onSubmit={handleSubmitLogin}
                    sx={{ '& > :not(style)': { m: 1, width: 0.9 } }}
                    autoComplete='off'
                >
                    <TextField required onChange={handleChange}
                        sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                        InputLabelProps={{style: { color: "#E4423F" }}}
                        name='email' label='Email' type='email' variant='outlined'
                    />
                    <TextField required onChange={handleChange}
                        sx={{'& .MuiOutlinedInput-root': {'&.Mui-focused fieldset': {borderColor: '#E4423F'}}}}
                        InputLabelProps={{style: { color: "#E4423F" }}}
                        name='password' label='Password' type='password' autoComplete='current-password'
                    />
                    <div className='sub-header-text'>Forgot password? <div className='red-text'>Retrieve here</div></div>
                    <Button
                        variant='contained'
                        type='submit'
                        sx={{
                            backgroundColor: '#E4423F',
                            maxWidth: '131px',
                            borderRadius: '41px',
                            boxShadow: 'none',
                            textTransform: 'none',
                        }}
                    >
                        Login
                    </Button>
                </Box>
                <div className='header-text'>
                    Not with us yet?
                </div>
                <div className='sub-header-text'>
                    Create a free account to try out Meet Me Up
                </div>
                <Box
                    component='form'
                    onSubmit={handleSubmitCreate}
                    action='/accountSetup2Create'
                    autoComplete='off'
                    sx={{ '& > :not(style)': { m: 2, width: 0.9 } }}
                >
                    <Button
                        variant='contained'
                        type='submit'
                        sx={{
                            backgroundColor: '#E4423F',
                            maxWidth: '202px',
                            borderRadius: '41px',
                            marginTop: '20px',
                            boxShadow: 'none',
                            textTransform: 'none',
                        }}
                    >
                        Create Account
                    </Button>
                    <FormGroup>
                        <FormControlLabel
                            required
                            control={<Checkbox/>}
                            label={
                                <>
                                    I agree to the <Link to='/termsandconditions'><div className='red-text'>Terms and Conditions</div></Link>
                                </>
                            }
                        />
                        <FormControlLabel
                            required
                            control={<Checkbox/>}
                            label={
                                <>
                                    I agree to the <Link to='/privacypolicy'><div className='red-text'>Privacy Policy</div></Link>
                                </>
                            }
                        />
                    </FormGroup>
                </Box>
            </div>
        </div>
    );
}