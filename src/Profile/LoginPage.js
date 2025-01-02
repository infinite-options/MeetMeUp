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

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to the /signup route
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
    >{/* Welcome Text */}
      <Box style={{ width: '100%', marginBottom: '24px' }}>
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            fontSize: '21px',
            lineHeight: '30px',
            letterSpacing: '-0.04em',
            textAlign: 'left',
            color: '#1A1A1A',
            marginBottom: "20px",
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
        disabled={!password}
        style={{
          backgroundColor: password ? '#E4423F' : '#e0e0e0',
          color: '#fff',
          borderRadius: '24px',
          padding: '12px 0',
          fontWeight: 'bold',
          textTransform: 'none',
          fontFamily: 'Lexend',
        }}
      >
        Continue
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
