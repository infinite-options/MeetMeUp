import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import googlesignupIcon from '../Assets/Images/googlesignupIcon.webp';
import AppleIcon from '@mui/icons-material/Apple';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Please fill out all fields');
      window.alert('Please fill out all the fields');
      return;
    }

    const saltUrl = 'https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt/MMU';
    const loginUrl = 'https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login/MMU';

    try {
      setShowSpinner(true);
      const saltResponse = await axios.post(saltUrl, { email });
      const saltObject = saltResponse.data;

      if (saltObject.code === 200) {
        let hashAlg = saltObject.result[0].password_algorithm;
        const salt = saltObject.result[0].password_salt;

        if (hashAlg && salt) {
          switch (hashAlg) {
            case 'SHA256':
              hashAlg = 'SHA-256';
              break;
            default:
              break;
          }

          const saltedPassword = password + salt;
          const encoder = new TextEncoder();
          const data = encoder.encode(saltedPassword);
          const hashedBuffer = await crypto.subtle.digest(hashAlg, data);
          const hashArray = Array.from(new Uint8Array(hashedBuffer));
          const hashedPassword = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

          const loginResponse = await axios.post(
            loginUrl,
            { email, password: hashedPassword },
            { headers: { 'Content-Type': 'application/json' } }
          );

          localStorage.setItem('user_uid', loginResponse.data.result.user_uid);
          localStorage.setItem('user_email_id', loginResponse.data.result.user_email_id);

          navigate('/accountSetup7Summary');
        } else {
          throw new Error('Hash algorithm or salt is missing.');
        }
      } else {
        window.alert('User does not exist.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response && error.response.status === 401) {
        window.alert('Invalid credentials. Please try again.');
      } else {
        window.alert('An error occurred. Please try again later.');
      }
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
      </Box>
      {/* Welcome Text */}
      <Box style={{ width: '100%', marginBottom: '24px', marginTop: '24px' }}>
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            fontSize: '21px',
            lineHeight: '30px',
            letterSpacing: '-0.04em',
            textAlign: 'left',
            color: '#1A1A1A',
            marginBottom: '20px',
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Please choose a login option to continue.
        </Typography>
      </Box>

      {/* Input Fields */}
      <Box style={{ width: '100%', marginBottom: '20px' }}>
        <TextField
          fullWidth
          placeholder="Email"
          variant="filled"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            disableUnderline: true,
            style: {
              height: '50px',
              borderRadius: '8px',
              backgroundColor: '#f2f2f2',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Lexend',
              fontSize: '16px',
            },
          }}
        />
        <TextField
          fullWidth
          placeholder="Password"
          variant="filled"
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              height: '50px',
              borderRadius: '8px',
              backgroundColor: '#f2f2f2',
              fontFamily: 'Lexend',
              fontSize: '16px',
            },
          }}
        />
      </Box>

      {/* Continue Button */}
      <Button
        variant="contained"
        fullWidth
        disabled={!email || !password}
        onClick={handleSubmitLogin}
        style={{
          backgroundColor: email && password ? '#E4423F' : '#e0e0e0',
          color: '#fff',
          borderRadius: '24px',
          padding: '12px 0',
          fontWeight: 'bold',
          textTransform: 'none',
          fontFamily: 'Lexend',
        }}
      >
        {showSpinner ? 'Loading...' : 'Continue'}
      </Button>

      {/* Divider */}
      <Divider
        style={{
          width: '100%',
          margin: '20px 0',
          color: '#757575',
        }}
      >
        OR
      </Divider>

      {/* Social Login Icons */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <Box
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={googlesignupIcon}
            alt="Google"
            style={{ width: '24px', height: '24px' }}
          />
        </Box>
        <Box
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <AppleIcon />
        </Box>
      </Box>

      {/* Footer */}
      <Typography
        style={{
          marginTop: '20px',
          color: '#757575',
          textAlign: 'center',
          fontFamily: 'Lexend',
        }}
      >
        Don’t have an account yet?{' '}
        <span style={{ color: '#E4423F', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleSignupClick}>
          Sign Up
        </span>
      </Typography>
    </Container>
  );
};

export default LoginPage;
