import React, { useState } from 'react';
import { Container, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContinueButton from './ContinueButton';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const HeightPage = () => {
  const [unit, setUnit] = useState('ft-in'); // 'cm' or 'ft-in'
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(11);
  const [heightCm, setHeightCm] = useState(175);
  const navigate = useNavigate();
  const { updateUserData } = useUserContext(); 

  const handleIncrease = (setter, value, max) => {
    if (value < max) setter(value + 1);
  };

  const handleDecrease = (setter, value, min) => {
    if (value > min) setter(value - 1);
  };

  const isContinueEnabled =
    unit === 'cm' ? heightCm > 0 : heightFt > 0 || heightIn > 0;

  const saveHeight = () => {
      let height;
    
      if (unit === 'ft-in') {
        // Format height in feet and inches
        height = `${heightFt}'${heightIn}"`; // Example: 5'11"
      } else if (unit === 'cm') {
        // Use height in centimeters
        height = `${heightCm} cm`;
      }
    
      // Save the formatted height to UserContext
      updateUserData('user_height', height);
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
          marginTop: '60px',
        }}
      >
        <Box
          style={{
            width: '50%',
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
            marginBottom: '8px',
          }}
        >
          How tall are you?
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Your height will be public.
        </Typography>
      </Box>

      {/* Unit Toggle */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
          marginBottom: '24px',
        }}
      >
        <Typography
          onClick={() => setUnit('cm')}
          style={{
            fontFamily: 'Lexend',
            fontSize: '14px',
            cursor: 'pointer',
            color: unit === 'cm' ? '#E4423F' : '#757575',
            textDecoration: unit === 'cm' ? 'underline' : 'none',
          }}
        >
          cm
        </Typography>
        <Typography
          onClick={() => setUnit('ft-in')}
          style={{
            fontFamily: 'Lexend',
            fontSize: '14px',
            cursor: 'pointer',
            color: unit === 'ft-in' ? '#E4423F' : '#757575',
            textDecoration: unit === 'ft-in' ? 'underline' : 'none',
          }}
        >
          ft & in
        </Typography>
      </Box>

      {/* Height Selection */}
      {unit === 'cm' ? (
      <Box
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack items vertically
        alignItems: 'center',
        marginBottom: '24px',
      }}
    >
      {/* Increase Button */}
      <IconButton onClick={() => handleIncrease(setHeightCm, heightCm, 250)}>
        <Typography style={{ fontSize: '16px' }}>▲</Typography>
      </IconButton>
    
      {/* Number with Unit */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'baseline',
          fontFamily: 'Lexend',
          fontSize: '48px',
          fontWeight: 'bold',
        }}
      >
        <Typography style={{ fontSize: '48px', fontWeight: 'bold' }}>
          {heightCm}
        </Typography>
        <Typography
          style={{
            fontSize: '16px',
            marginLeft: '4px',
            color: '#757575',
          }}
        >
          cm
        </Typography>
      </Box>
    
      {/* Decrease Button */}
      <IconButton onClick={() => handleDecrease(setHeightCm, heightCm, 0)}>
        <Typography style={{ fontSize: '16px' }}>▼</Typography>
      </IconButton>
    </Box>
    ) : (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Box style={{ marginRight: '16px', textAlign: 'center' }}>
            <IconButton
              onClick={() => handleIncrease(setHeightFt, heightFt, 8)}
              style={{ marginBottom: '-8px' }}
            >
              <Typography style={{ fontSize: '16px' }}>▲</Typography>
            </IconButton>
            <Box style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography
                style={{
                  fontFamily: 'Lexend',
                  fontSize: '48px',
                  fontWeight: 'bold',
                }}
              >
                {heightFt}
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Lexend',
                  fontSize: '16px',
                  marginLeft: '4px',
                  color: '#757575',
                }}
              >
                ft
              </Typography>
            </Box>
            <IconButton
              onClick={() => handleDecrease(setHeightFt, heightFt, 0)}
              style={{ marginTop: '-8px' }}
            >
              <Typography style={{ fontSize: '16px' }}>▼</Typography>
            </IconButton>
          </Box>
          <Box style={{ textAlign: 'center' }}>
            <IconButton
              onClick={() => handleIncrease(setHeightIn, heightIn, 11)}
              style={{ marginBottom: '-8px' }}
            >
              <Typography style={{ fontSize: '16px' }}>▲</Typography>
            </IconButton>
            <Box style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography
                style={{
                  fontFamily: 'Lexend',
                  fontSize: '48px',
                  fontWeight: 'bold',
                }}
              >
                {heightIn}
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Lexend',
                  fontSize: '16px',
                  marginLeft: '4px',
                  color: '#757575',
                }}
              >
                in
              </Typography>
            </Box>
            <IconButton
              onClick={() => handleDecrease(setHeightIn, heightIn, 0)}
              style={{ marginTop: '-8px' }}
            >
              <Typography style={{ fontSize: '16px' }}>▼</Typography>
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Continue Button */}
      <Box style={{ marginTop: 'auto', width: '100%' }}>
        <ContinueButton navigateTo="/children" isEnabled={isContinueEnabled} handleClick={saveHeight} />
      </Box>
    </Container>
  );
};

export default HeightPage;
