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

const InterestsPage = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

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
              padding: "8px 16px",
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
                    // width: "40%", 
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
      <Box style={{ marginTop: "auto", width: "100%" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/uploadmedia")}
          disabled={selectedOptions.length === 0}
          style={{
            backgroundColor: selectedOptions.length > 0 ? "#E4423F" : "#e0e0e0",
            color: "#fff",
            borderRadius: "24px",
            padding: "12px 0",
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Lexend",
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default InterestsPage;
