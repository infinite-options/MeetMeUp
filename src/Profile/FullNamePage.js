import React, { useState } from 'react';
import { Container, Box, TextField, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContinueButton from './ContinueButton'; // Import the ContinueButton component
import { useNavigate } from 'react-router-dom';

const FullNamePage = () => {
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

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
            width: '20%',
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
          What should we call you?
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Your full name will be public.
        </Typography>
      </Box>

      {/* Input Field */}
      <Box style={{ width: '100%', marginBottom: '24px' }}>
        <TextField
          fullWidth
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          variant="filled"
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
      </Box>

      {/* Continue Button */}
      <Box style={{ width: '100%', marginTop: 'auto' }}> {/* Add marginTop:auto to push the button down */}
        <ContinueButton navigateTo="/birthday" isEnabled={fullName.length > 0} />
      </Box>
    </Container>
  );
};

export default FullNamePage;
