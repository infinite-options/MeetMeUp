import '../App.css';
import backgroundImage from '../Assets/Images/accountSetup1Login.jpg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Checkbox, FormGroup, FormControlLabel, TextField, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'; 

export default function AccountSetup1Login() {
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleLogin= () => {
        navigate(`/accountSetup7Summary`);
    };
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
        handleLogin();
    };
    const handleSubmitCreate = (e) => {
        console.log(e)
    };
    return (

        <div className='App'>
            <div className='red-overlay' />
            <Box sx={{marginLeft:'15%', marginRight:'15%'}}>

            <Grid container size={12} sx={{textAlign:"center"}}>
                <Grid size={12} container justifyContent="center">
                     <img src={backgroundImage} alt='accountSetup1Login'/>
                </Grid>
                <div className='rounded-box'>
                    <div className='title-text' style={{fontFamily:"Inria Sans"}}>
                        meet me up
                    </div>
                    <div className='header-text' style={{fontFamily:"Lexend"}}>
                        Let’s get you out there
                    </div>
 

                <Box
                    component='form'
                    onSubmit={handleSubmitLogin}
                    sx={{ '& > :not(style)': { m: 2, width: 0.9 } }}
                    autoComplete='off'
                >
                    <TextField required onChange={handleChange} name='email' label='Email' type='email' variant='outlined'/>
                    <TextField required onChange={handleChange} name='password' label='Password' type='password' autoComplete='current-password'/>
                    <Button
                        variant='contained'
                        type='submit'
                        sx={{
                            backgroundColor: '#E4423F',
                            maxWidth: '131px',
                            borderRadius: '41px',
                            boxShadow: 'none',
                            textTransform:"none",
                            fontSize:"18px",
                            fontFamily:"Lexend",
                        }}
                    >
                        Login
                    </Button>
                    <div className='sub-header-text'>Forgot password? <div className='red-text'>Retrieve here</div></div>
                    <Grid container justifyContent="center" size={12}>
                        <hr style={{width:"90%", borderStyle:"solid", borderColor:"#CECECE"}} />
                    </Grid>
                </Box>
                <div className='header-text' style={{fontFamily:"Lexend", fontWeight:"semibold"}}>
                    Not with us yet?
                </div>
                <div className='sub-header-text' style={{marginLeft:"5%", marginRight:"5%", fontFamily:"DM Sans", fontSize:"14px"}}>
                    Diam pulvinar pharetra nulla dolor nullam. Neque aliquam est amet scelerisque. Massa aenean.
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
                        textTransform:"none",
                        fontSize:"18px",
                        fontFamily:"Lexend"
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
                
            </div>
            </Grid>
            </Box>
        </div>
    );
}