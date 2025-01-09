import React, { useState, useEffect } from "react";
import { Box, Typography, Slider, Grid, Chip, Button, TextField, FormControlLabel, Switch, AppBar, Toolbar, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MyPreferences = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [distance, setDistance] = useState(100); // Maximum distance from you
  const [ageRange, setAgeRange] = useState([18, 99]); // Age range
  const [heightRange, setHeightRange] = useState([122, 213]); // Height range
  const [children, setChildren] = useState(0); // Maximum # of children
  const [bodyTypes, setBodyTypes] = useState([
    "Slim", "Athletic", "Curvy", "Plus Sized", "Few Extra Pounds"
  ]);
  const [smoking, setSmoking] = useState("No");
  const [drinking, setDrinking] = useState("No");
  const [religion, setReligion] = useState(""); // Religious Preference

  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSliderChange = (event, newValue, field) => {
    if (field === "distance") {
      setDistance(newValue);
    } else if (field === "ageRange") {
      setAgeRange(newValue);
    } else if (field === "heightRange") {
      setHeightRange(newValue);
    } else if (field === "children") {
      setChildren(newValue);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', padding: 2 }}>
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Typography style={{
            fontFamily: 'Lexend',
            fontWeight: 500,
            fontSize: '21px',
            lineHeight: '30px',
            textAlign: 'left',
            color: '#1A1A1A',
            marginBottom: '8px',
          }}>
            My Preferences
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 3, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Maximum distance from you (km)
        </Typography>
        <Slider
          value={distance}
          onChange={(e, newValue) => handleSliderChange(e, newValue, "distance")}
          min={0}
          max={500}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} km`}
          sx={{
            marginBottom: 3,
            '& .MuiSlider-thumb': { backgroundColor: 'red' }, // Matching thumb color to profile summary button color
          }}
        />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Age Range
        </Typography>
        <Slider
          value={ageRange}
          onChange={(e, newValue) => handleSliderChange(e, newValue, "ageRange")}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}`}
          min={18}
          max={99}
          valueLabelDisplay="auto"
          sx={{
            marginBottom: 3,
            '& .MuiSlider-thumb': { backgroundColor: '#E4423F' },
          }}
        />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Height Range (cm)
        </Typography>
        <Slider
          value={heightRange}
          onChange={(e, newValue) => handleSliderChange(e, newValue, "heightRange")}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} cm`}
          min={122}
          max={213}
          sx={{
            marginBottom: 3,
            '& .MuiSlider-thumb': { backgroundColor: '#E4423F' },
          }}
        />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Maximum # of children
        </Typography>
        <Slider
          value={children}
          onChange={(e, newValue) => handleSliderChange(e, newValue, "children")}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          valueLabelFormat={(value) => `${value}`}
          sx={{
            marginBottom: 3,
            '& .MuiSlider-thumb': { backgroundColor: '#E4423F' },
          }}
        />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Body Type
        </Typography>
        <Grid container spacing={1}>
          {bodyTypes.map((bodyType, index) => (
            <Grid item key={index}>
              <Chip label={bodyType} variant="outlined" color="primary" sx={{ borderColor: '#E4423F' }} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
          Smoking Habits
        </Typography>
        <Grid container spacing={1}>
          {["Yes", "No", "Either"].map((option, index) => (
            <Grid item key={index}>
              <Button variant={smoking === option ? "contained" : "outlined"} onClick={() => setSmoking(option)} sx={{
                borderColor: '#E4423F', backgroundColor: smoking === option ? '#E4423F' : 'transparent', color: smoking === option ? '#fff' : '#000'
              }}>
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
          Drinking Habits
        </Typography>
        <Grid container spacing={1}>
          {["Yes", "No", "Either"].map((option, index) => (
            <Grid item key={index}>
              <Button variant={drinking === option ? "contained" : "outlined"} onClick={() => setDrinking(option)} sx={{
                borderColor: '#E4423F', backgroundColor: drinking === option ? '#E4423F' : 'transparent', color: drinking === option ? '#fff' : '#000'
              }}>
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
          Religious Preference
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          placeholder="Any"
          sx={{ marginBottom: 3 }}
        />

        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            padding: '12px 0',
            fontWeight: 'bold',
            textTransform: 'none',
            fontFamily: 'Lexend',
            backgroundColor: '#E4423F',
          }}
        >
          Find my match!
        </Button>
      </Box>
    </Box>
  );
};

export default MyPreferences;
