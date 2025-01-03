import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { useListContext } from "../ListContext";

const PreferencePage = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const { data } = useListContext();

  const genderOptions = data.identity || []; // Default to an empty array if no gender data

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Container
      maxWidth="xs"
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
      <Box style={{ width: "100%", marginBottom: "16px" }}>
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
          Who are you open to?
        </Typography>
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "12px",
          }}
        >
          We’ll only show your preferences to you.
        </Typography>
      </Box>

      {/* Options */}
      <Box style={{ width: "100%", marginBottom: "24px", marginTop: "24px" }}>
        {genderOptions.map((option) => (
          <Box
            key={option}
            style={{
              marginBottom: "8px",
              borderRadius: "50px",
              border: `2px solid ${
                selectedOptions.includes(option) ? "#000" : "#e0e0e0"
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
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionSelect(option)}
                  style={{
                    color: selectedOptions.includes(option) ? "#000" : "#757575",
                  }}
                />
              }
              label={option}
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
          onClick={() => navigate("/interests")}
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

export default PreferencePage;
