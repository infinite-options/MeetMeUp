// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
// import { Slider, Typography, Box } from '@material-ui/core';
import { Slider, Box, Container, Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import CustomRedButton from '../Components/CustomRedButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  const CustomSlider = styled(Slider)(({ theme }) => ({
    color: 'rgba(228, 66, 63, 1)', 
    height: 8,
    '& .MuiSlider-track': {
      borderRadius: 4,
      height: 8,
      backgroundColor: 'rgba(228, 66, 63, 1)', 
    },
    '& .MuiSlider-rail': {
      borderRadius: 4,
      height: 8,
      backgroundColor: 'gray', 
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: 'rgba(228, 66, 63, 1)', 
      borderRadius: '50%',
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    '& .MuiSlider-valueLabel': {
      top: -10, 
      backgroundColor: 'rgba(228, 66, 63, 1)', 
      color: '#fff', 
    },
  }));
const CustomButton = styled(Button)({
    backgroundColor: 'rgba(228, 66, 63, 1)',
    color: '#fff',
    display: 'block', 
    '&:hover': {
      backgroundColor: 'rgba(200, 60, 60, 1)', 
    },
    marginTop: '8px',
});

function PreferencesPage() {
  const [distance, setDistance] = useState(80); // Initial value for Maximum Distance
  const [ageRange, setAgeRange] = useState([18, 100]); // Initial values for Age Double Slider
  const [height, setHeight] = useState(66); // Initial value for Maximum Height
  const [kids, setKids] = useState(5); // Initial value for Maximum Number of Kids
  const [open, setOpen] = useState(false);

  const handleMatchMeClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };

  const handleKidsChange = (event, newValue) => {
    setKids(newValue);
  };

  return (
    <Container>
        
      <Box>
        <Box
        mt={3}
        sx={{
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
            padding: 2,
        }}
        >
        <IconButton style={{
                    backgroundColor: 'lightgray', 
                    color: 'black',
                    borderRadius: '50%', 
                    padding: '8px', 
                }}>
            <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
            Match Preferences
        </Typography>
        </Box>
            
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Match Preferences
        </Typography>

        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            width: '100%', 
            padding: 2, 
        }}
        >
        <Typography gutterBottom>
            Location
        </Typography>
        <IconButton>
            <ArrowForwardIcon />
        </IconButton>
        </Box>
        <Container>
            <Typography gutterBottom>Maximum Distance (km)</Typography>
            <Typography gutterBottom>{distance}</Typography>
        <CustomSlider
            value={distance}
            onChange={(e, val) => setDistance(val)}
            min={0}
            max={160}
            valueLabelDisplay="auto"
            ValueLabelComponent={ValueLabelComponent} 

        />
            </Container>
        
        

        <Typography gutterBottom>
            Looking For
        </Typography>
        <Container>
            <Typography gutterBottom>Age Double Slider</Typography>
            <Typography gutterBottom>{ageRange}</Typography>
            <CustomSlider
                value={ageRange}
                onChange={(e, val) => setAgeRange(val)}
                min={18}
                max={100}
                valueLabelDisplay="auto"
            />
        </Container>
        
            <Typography gutterBottom>Minimum Height in Inches</Typography>
            <Typography gutterBottom>{height}</Typography>
            <CustomSlider
                value={height}
                onChange={(e, val) => setHeight(val)}
                min={48}
                max={84}
                valueLabelDisplay="auto"
            />

            <Typography gutterBottom>Maximum Number of Kids</Typography>
            <Typography gutterBottom>{kids}</Typography>
            <CustomSlider
                value={kids}
                onChange={(e, val) => setKids(val)}
                min={0}
                max={10}
                valueLabelDisplay="auto"
            />
        

        <Box mt={3}
        sx={{
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
        }}>
            
            <CustomButton variant="contained" onClick={handleMatchMeClick}>Match Me</CustomButton>
            {/* <CustomRedButton text='Match Me' onClick={handleMatchMeClick}></CustomRedButton> */}
            <CustomButton variant="contained" sx={{ ml: 2 }}>Debug</CustomButton>
            <CustomButton variant="contained" sx={{ ml: 2 }}>Logout</CustomButton>

        </Box>
        
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>No Matches Found</DialogTitle>
            <DialogContent>
            <Typography>No matches found, please modify your preferences.</Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
    </Container>

  );
}

export default PreferencesPage;
