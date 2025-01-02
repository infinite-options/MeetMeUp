import React, { useState } from 'react';
import { Container, Box, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import ContinueButton from './ContinueButton'; // Import the ContinueButton component

const BirthdayPage = () => {
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBirthdayChange = (e) => {
    let value = e.target.value;

    // Automatically add "/" to the date format
    if (value.length === 2 || value.length === 5) {
      if (value[value.length - 1] !== '/') {
        value += '/';
      }
    }

    // Validate input
    if (value.length > 10) return; // Limit input to 10 characters (dd/mm/yyyy)
    setBirthday(value);
    setError(''); // Clear error when input changes
  };

  const validateBirthday = () => {
    const [day, month, year] = birthday.split('/').map((part) => parseInt(part, 10)); // Parse parts as integers
  
    // Validate the format and ranges
    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      setError('Please enter a valid date in the format dd/mm/yyyy.');
      return false;
    }
  
    // Check if the month has the correct number of days
    const daysInMonth = new Date(year, month, 0).getDate(); // Last day of the month
    if (day > daysInMonth) {
      setError('Please enter a valid date in the format dd/mm/yyyy.');
      return false;
    }
  
    // Check if the user is 18+ years old
    const today = new Date();
    const userDate = new Date(year, month - 1, day); // Create a valid Date object
    const age = today.getFullYear() - userDate.getFullYear();
  
    if (
      age < 18 ||
      (age === 18 &&
        (today.getMonth() < userDate.getMonth() ||
          (today.getMonth() === userDate.getMonth() && today.getDate() < userDate.getDate())))
    ) {
      setError('You must be 18+ to use MeetMeUp.');
      return false;
    }
  
    // Clear error if everything is valid
    setError('');
    return true;
  };
  
  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        height: '100vh',
        padding: '20px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Back Button */}
      <Box
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon style={{ color: '#E4423F' }} />
        </IconButton>
      </Box>

      {/* Progress Indicator */}
      <Box
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#f2f2f2',
          position: 'relative',
          marginBottom: '20px',
          marginTop: '60px', // Adjust top margin to reduce space at the top
        }}
      >
        <Box
          style={{
            width: '30%',
            height: '4px',
            backgroundColor: '#000',
            position: 'absolute',
          }}
        />
      </Box>

      {/* Title and Subtitle */}
      <Box style={{ width: '100%', marginBottom: '16px' }}>
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            fontSize: '21px',
            lineHeight: '30px',
            textAlign: 'left',
            color: '#1A1A1A',
            marginBottom: '8px', // Reduced margin for better alignment
          }}
        >
          When is your birthday?
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Your age will be public.
        </Typography>
      </Box>

      {/* Input Field */}
      <Box style={{ width: '100%', marginBottom: '8px' }}>
        <TextField
          fullWidth
          placeholder="dd/mm/yyyy"
          value={birthday}
          onChange={handleBirthdayChange}
          onBlur={validateBirthday} // Validate on blur
          error={!!error}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            style: {
              height: '50px',
              borderRadius: '8px',
              backgroundColor: error ? '#ffe6e6' : '#f2f2f2', // Highlight error with background color
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Lexend',
              fontSize: '16px',
            },
          }}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#e4423f' }}>
          <ErrorOutlineIcon style={{ marginRight: '8px' }} />
          <Typography
            style={{
              fontFamily: 'Lexend',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Continue Button */}
      <Box style={{ width: '100%', marginTop: 'auto' }}>
        <ContinueButton
          navigateTo="/height"
          isEnabled={birthday.length === 10 && !error}
        />
      </Box>
    </Container>
  );
};

export default BirthdayPage;
