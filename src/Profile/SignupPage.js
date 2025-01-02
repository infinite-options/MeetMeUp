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
  LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import googlesignupIcon from '../Assets/Images/googlesignupIcon.webp';
import AppleIcon from '@mui/icons-material/Apple';

const SignupPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleToggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Password strength calculation (example logic)
  const getPasswordStrength = (password) => {
    if (password.length > 10) return 'strong';
    if (password.length > 5) return 'medium';
    return 'weak';
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Progress Indicator */}
      <Box
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#f2f2f2',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <Box
          style={{
            width: '20%',
            height: '4px',
            backgroundColor: '#000',
            position: 'absolute',
          }}
        />
      </Box>

      {/* Welcome Text */}
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
            marginBottom: "20px"
          }}
        >
          Welcome to MeetMeUp!
        </Typography>
        <Typography
          variant="body2"
          style={{
            textAlign: 'left', // Align text to the left
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Please choose a signup option to continue.
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
                height: '50px', // Set explicit height for consistent alignment
                borderRadius: '8px',
                backgroundColor: '#f2f2f2',
                display: 'flex',
                alignItems: 'center', // Ensure vertical centering
                fontFamily: 'Lexend',
                fontSize: '16px', // Ensure appropriate font size
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
              borderRadius: '8px',
              backgroundColor: '#f2f2f2',
              fontFamily: 'Lexend',
            },
          }}
        />
        {/* Password Strength Indicator */}
        {password && (
          <Box style={{ marginTop: '8px', textAlign: 'left' }}>
            <LinearProgress
              variant="determinate"
              value={
                passwordStrength === 'strong'
                  ? 100
                  : passwordStrength === 'medium'
                  ? 60
                  : 30
              }
              style={{
                backgroundColor: '#e0e0e0',
                height: '8px',
                borderRadius: '4px',
              }}
            />
            <Typography
              variant="caption"
              style={{
                marginTop: '4px',
                display: 'block',
                color:
                  passwordStrength === 'strong'
                    ? 'green'
                    : passwordStrength === 'medium'
                    ? 'orange'
                    : 'red',
              }}
            >
              {passwordStrength === 'strong'
                ? 'Strong'
                : passwordStrength === 'medium'
                ? 'Medium'
                : 'Weak'}
            </Typography>
          </Box>
        )}
        <TextField
          fullWidth
          placeholder="Confirm Password"
          variant="filled"
          margin="normal"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              borderRadius: '8px',
              backgroundColor: '#f2f2f2',
              fontFamily: 'Lexend',
            },
          }}
        />
      </Box>

      {/* Continue Button */}
      <Button
        variant="contained"
        fullWidth
        disabled={!password || !confirmPassword || password !== confirmPassword}
        style={{
          backgroundColor: password && confirmPassword && password === confirmPassword ? '#E4423F' : '#e0e0e0',
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
          <AppleIcon
          />
        </Box>
      </Box>

      {/* Footer */}
      <Typography
        variant="body2"
        style={{
          marginTop: '20px',
          color: '#757575',
          textAlign: 'center',
          fontFamily: 'Lexend',
        }}
      >
        Already have an account?{' '}
        <span style={{ color: '#E4423F', fontWeight: 'bold', cursor: 'pointer' }}>
          Log In
        </span>
      </Typography>
    </Container>
  );
};

export default SignupPage;