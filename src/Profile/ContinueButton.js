import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ContinueButton = ({ navigateTo, isEnabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleClick}
      disabled={!isEnabled}
      style={{
        backgroundColor: isEnabled ? '#E4423F' : '#e0e0e0',
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
  );
};

export default ContinueButton;
