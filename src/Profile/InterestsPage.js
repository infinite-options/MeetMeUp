import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { useListContext } from "../ListContext";
import { useUserContext } from '../UserContext';
import ContinueButton from './ContinueButton';

const InterestsPage = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const { updateUserData } = useUserContext(); 
  // Example interests
//   const interests = [
//     "Cooking / Baking",
//     "Gaming",
//     "Reading",
//     "Health & Fitness",
//     "Sports",
//     "Travelling",
//     "DIY",
//     "Film & Movies",
//     "Drawing",
//     "Painting",
//     "Music",
//     "Dance",
//     "Technology",
//     "Cars / Vehicles",
//     "Shopping",
//     "Partying",
//     "Animals & Wildlife",
//     "Writing",
//   ];
const { data } = useListContext();
  const interests = data.interests || [];

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const calculateBoxWidth = (label) => {
    // Estimate width based on label length
    const charWidth = 8; // Approximate width per character in pixels
    const padding = 32; // Additional padding for the box
    return `${label.length * charWidth + padding}px`;
  };

  const saveInterests = () => {
    console.log('---selectedOptions---', selectedOptions);
  
    // Ensure selectedOptions is an array (if it is a string, split it into an array)
    const interestsArray = Array.isArray(selectedOptions)
      ? selectedOptions
      : selectedOptions.split(',');
  
    // Update the user data with the interests as an array
    updateUserData('user_general_interests', interestsArray);
  };
  

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Back Button */}
      <Box
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon style={{ color: "#E4423F" }} />
        </IconButton>
      </Box>

      {/* Progress Indicator */}
      <Box
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#f2f2f2",
          position: "relative",
          marginBottom: "20px",
          marginTop: "60px",
        }}
      >
        <Box
          style={{
            width: "70%",
            height: "4px",
            backgroundColor: "#000",
            position: "absolute",
          }}
        />
      </Box>

      {/* Title and Subtitle */}
      <Box style={{ width: "100%", marginBottom: "24px" }}>
        <Typography
          style={{
            fontFamily: "Lexend",
            fontWeight: 500,
            fontSize: "21px",
            lineHeight: "30px",
            textAlign: "left",
            color: "#1A1A1A",
            marginBottom: "8px",
          }}
        >
          What are your interests?
        </Typography>
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "12px",
          }}
        >
          Help us better match you with others of similar interests.
        </Typography>
      </Box>

      {/* Interests */}
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {interests.map((interest) => (
          <Box
            key={interest}
            style={{
              // width: calculateBoxWidth(interest), // Dynamically set width
              borderRadius: "40px",
              border: `2px solid ${
                selectedOptions.includes(interest) ? "#000" : "#e0e0e0"
              }`,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              transition: "border-color 0.3s",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  checked={selectedOptions.includes(interest)}
                  onChange={() => handleOptionSelect(interest)}
                  style={{
                    color: selectedOptions.includes(interest) ? "#000" : "#757575",
                    padding: "2px 2px",
                  }}
                />
              }
              label={interest}
              style={{
                marginLeft: "8px",
                fontWeight: "bold",
                fontFamily: "Lexend",
                color: "#1A1A1A",
                flex: 1,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Continue Button */}
    
      <Box style={{ width: '100%', marginTop: 'auto' }}> {/* Add marginTop:auto to push the button down */}
        <ContinueButton navigateTo="/uploadmedia" isEnabled={selectedOptions}  handleClick={saveInterests} />
      </Box>
    </Container>
  );
};

export default InterestsPage;
