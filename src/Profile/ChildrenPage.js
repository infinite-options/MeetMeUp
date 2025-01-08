import React, { useState } from 'react';
import { Container, Box, Typography, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContinueButton from './ContinueButton'; // Import your reusable ContinueButton component
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const ChildrenPage = () => {
  const [childrenCount, setChildrenCount] = useState(0);
  const { updateUserData } = useUserContext();
  const navigate = useNavigate();

  const handleIncrease = () => {
    setChildrenCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    if (childrenCount > 0) {
      setChildrenCount((prevCount) => prevCount - 1);
    }
  };

  const saveChildrenCount = () => {
    updateUserData('user_kids', childrenCount);};

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
            width: '60%',
            height: '4px',
            backgroundColor: '#000',
            position: 'absolute',
          }}
        />
      </Box>

      {/* Title and Subtitle */}
      <Box style={{ width: '100%', marginBottom: '24px' }}>
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
          How many children do you have?
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          The number of children you have will be public.
        </Typography>
      </Box>

      {/* Input Field with Decrease and Increase Buttons */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          borderRadius: '24px',
          padding: '0 8px',
          height: '50px',
          marginBottom: '24px',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          style={{
            fontFamily: 'Lexend',
            fontSize: '16px',
            fontWeight: 'bold',
            marginLeft: '16px',
          }}
        >
          {childrenCount}
        </Typography>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton onClick={handleDecrease} disabled={childrenCount <= 0}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>-</Typography>
          </IconButton>
          <Box
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: '#dcdcdc',
              margin: '0 8px',
            }}
          />
          <IconButton onClick={handleIncrease}>
            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>+</Typography>
          </IconButton>
        </Box>
      </Box>

      {/* Continue Button */}
      <Box style={{ marginTop: 'auto', width: '100%' }}>
        <ContinueButton navigateTo="/sexassigned" isEnabled={true} handleClick={saveChildrenCount} />
      </Box>
    </Container>
  );
};

export default ChildrenPage;
