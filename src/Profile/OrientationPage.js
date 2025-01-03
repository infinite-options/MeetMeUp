import React, { useState } from 'react';
import { Container, Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useListContext } from '../ListContext'; 

const OrientationPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
// Access data from context
const { data, loading, error } = useListContext();

// Extract "gender" category from data
const genderOptions = data.sexuality || []; // Default to an empty array if no gender data

const handleOptionSelect = (option) => {
  setSelectedOption(option);
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
            width: '70%',
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
          What’s your sexual orientation?
        </Typography>
        <Typography
          style={{
            textAlign: 'left',
            color: '#757575',
            fontFamily: 'Lexend',
            fontSize: '12px',
          }}
        >
          Your sexual orientation will be public.
        </Typography>
      </Box>

      {/* Options */}
      <Box style={{ width: '100%', marginBottom: '24px',  marginTop: '24px'  }}>
        {genderOptions.map((option) => (
          <Button
            key={option}
            fullWidth
            variant="outlined"
            onClick={() => handleOptionSelect(option)}
            style={{
              marginBottom: '8px',
              borderRadius: '50px',
              textTransform: 'none',
              fontFamily: 'Lexend',
              fontWeight: 'bold',
              color: selectedOption === option ? '#fff' : '#1A1A1A',
              backgroundColor: selectedOption === option ? '#000' : '#fff',
              borderColor: selectedOption === option ? '#000' : '#e0e0e0',
            }}
          >
            {option}
          </Button>
        ))}
      </Box>

      {/* Continue Button */}
      <Box style={{ marginTop: 'auto', width: '100%' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('/preference')}
          disabled={!selectedOption}
          style={{
            backgroundColor: selectedOption ? '#E4423F' : '#e0e0e0',
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
      </Box>
    </Container>
  );
};

export default OrientationPage;
