import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import arrow from '../Assets/Images/arrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountDetails4 = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  const handleUpdate = async () => {
    console.log('Updating password');
    
    // Get the user_uid from localStorage
    const user_uid = localStorage.getItem('user_uid');
  
    if (!user_uid) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    try {
      const response = await axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/resetpassword', {
        user_uid: user_uid,
        current_password: currentPassword,
        new_password: newPassword
      });
  
      console.log('Password update response:', response.data);
  
      if (response.data.code === 200) {
        alert('Password updated successfully!');
        // Optionally, you can navigate to another page or clear the form here
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert('Failed to update password. Please try again.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Error: ${error.response.data.message || 'Failed to update password'}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          marginTop: '2rem',
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Box
            component="button"
            sx={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => window.history.back()}
          >
            <img
              src={arrow}
              alt="Back"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Segoe UI',
              fontSize: '18px',
              fontWeight: 400,
              textAlign: 'center',
              flex: 1,
            }}
          >
            Update Password
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Segoe UI',
            fontSize: '18px',
            fontWeight: 400,
            marginBottom: '1rem',
          }}
        >
          Security
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: '2rem',
            fontFamily: 'Segoe UI',
            fontSize: '14px',
            fontWeight: 400,
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
          }}
        >
          Please enter your current password and the new password you'd like to use for your Meet Me Up account.
        </Typography>

        <TextField
          variant="filled"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{
            disableUnderline: true, 
          }}
          sx={{
            fontFamily: 'Segoe UI',
            width:"100%",
            fontSize: '14px',
            fontWeight: 500,
            color: '#E4423F',
            marginBottom: '1rem',
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiInputLabel-root': {
              color: '#E4423F',
              fontWeight:"bold",
              fontSize:'14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#E4423F', 
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(226,226,226,.5)', 
              borderRadius:"10px",
              borderStyle:"solid",
              borderWidth:"1px",
              borderColor:"#CECECE",
            },
          }}
        />

        <TextField
          variant="filled"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            disableUnderline: true, 
          }}
          sx={{
            fontFamily: 'Segoe UI',
            width:"100%",
            fontSize: '14px',
            fontWeight: 500,
            color: '#E4423F',
            marginBottom: '0.5rem',
            '@media (max-width: 600px)': {
              fontSize: '12px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiInputLabel-root': {
              color: '#E4423F',
              fontWeight:"bold",
              fontSize:'14px',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#E4423F', 
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(226,226,226,.5)', 
              borderRadius:"10px",
              borderStyle:"solid",
              borderWidth:"1px",
              borderColor:"#CECECE",
            },
          }}
        />
      </Container>

      <Button
        variant="contained"
        color="error"
        onClick={handleUpdate}
        sx={{
          marginTop: '16px',
          width: '80%',
          maxWidth: '384px',
          height: '44px',
          borderRadius: '30px',
          backgroundColor: '#E4423F',
          textTransform:'none',
          fontFamily: 'Segoe UI', 
          fontSize: '18px',
          fontWeight: 'normal',
        }}
      >
        Update
      </Button>
    </Box>
  );
};

export default AccountDetails4;