import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddressAutocompleteInput from "./AdressAutocompleteInput";
import StaticMap from "./StaticMap";
import { getLatLongFromAddress } from "../utils/geocode";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import axios from "axios";

const LocationFormPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState('');
	const [unit, setUnit] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
  const navigate = useNavigate();
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const { userData, updateUserData } = useUserContext(); 

  const handleAddressSelect = async (address) => {
    await setSelectedAddress(address);
    await setIsLocationSelected(true);

    if (address) {
      setAddress(address.street ? address.street : "");
		  setCity(address.city ? address.city : "");
		  setState(address.state ? address.state : "");
		  setZip(address.zip ? address.zip : "");
      // geocoding API call to fetch coordinates
      const geocode_coordinates = await getLatLongFromAddress(address);
      setCoordinates({
        latitude: geocode_coordinates.latitude,
        longitude: geocode_coordinates.longitude,
      });


    updateUserData('user_latitude', geocode_coordinates.latitude);
    updateUserData('user_longitude', geocode_coordinates.longitude);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  const saveUserInfo = async () => {
    console.log('---userData---', userData);
    try {
      const createAccountUrl = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CreateAccount/MMU";
  
      let createAccountData = new FormData();
      createAccountData.append("email", userData.user_email_id);
      createAccountData.append("password", userData.password);
  
      // First API call
      const createAccountResponse = await axios.post(createAccountUrl, createAccountData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (createAccountResponse.data.message === "User already exists") {
        window.alert("User Already Exists");
        return;
      }
      localStorage.setItem('user_uid', createAccountResponse.data.result[0].user_uid);
      localStorage.setItem('user_email_id', userData.user_email_id);
  
      const user_uid = createAccountResponse.data.result[0].user_uid;
  
      // Prepare data for the second API call
      const updateUserInfoData = {
        ...userData, // Include all user data
        user_uid: user_uid, // Add user_uid
      };
      const formData = new FormData();
      // Loop through the object and append each key-value pair to the FormData
for (const [key, value] of Object.entries(updateUserInfoData)) {
  
  if (key !== "password" && key !== "user_video") { // Skip appending the "password" key
  formData.append(key, value);
}
else if (key == "user_video"){
  formData.append(key,value,"user_video.webm");
}
}

// Log the FormData to ensure everything was appended
for (let pair of formData.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
  
      // Second API call
      const updateUserInfoUrl = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
      const updateUserInfoResponse = await axios.put(updateUserInfoUrl, formData);
  
      console.log("Update User Info Response:", updateUserInfoResponse.data);
  
      // Navigate to the next step
      navigate("/summary");
    } catch (error) {
      console.error("Error occurred during API calls:", error);
      if (error.response) {
        console.error("API Response Error:", error.response);
      }
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
        <IconButton onClick={handleBack}>
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
            width: "90%", // Adjust based on progress
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
          Add your location
        </Typography>
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "12px",
          }}
        >
          Discover matches within your preferred distance.
        </Typography>
      </Box>

      {/* Instructions */}
      <Box style={{ marginTop: "24px", marginBottom: "16px", textAlign: "left", width: "100%" }}>
        <Typography
          style={{
            fontSize: "12px",
            fontFamily: "Lexend",
            fontWeight: "bold",
            color: "#1A1A1A",
            marginBottom: "8px",
          }}
        >
          TRIAL VERSION
        </Typography>
        <Typography
          style={{
            fontSize: "12px",
            fontFamily: "Lexend",
            color: "#757575",
          }}
        >
          For the testing phase, the location function is only available{" "}
          <b>here</b> and the <b>map setting</b> in your profile.
        </Typography>
      </Box>

      {/* Location Search Bar */}
      <Box style={{ width: "100%", marginBottom: "100px", marginTop: "24px" }}>
        <AddressAutocompleteInput
          onAddressSelect={handleAddressSelect}
          defaultValue={selectedAddress}
          gray={false}
          isRequired
        />
      </Box>

      {/* Map Display */}
      <Box
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          marginTop: "24px" ,
          marginBottom: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
          <StaticMap
            latitude={coordinates?.latitude}
            longitude={coordinates?.longitude}
						size="400x400"
						zoom={15}
						defaultCenter={{ lat: 37.3382, lng: -121.8863 }}
          />
      </Box>

      {/* Continue Button */}
      <Box style={{ width: "100%", marginTop: "auto" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={saveUserInfo}
          disabled={!isLocationSelected}
          style={{
            backgroundColor: isLocationSelected ? "#E4423F" : "#e0e0e0",
            color: "#fff",
            borderRadius: "24px",
            padding: "12px 0",
            fontWeight: "bold",
            fontFamily: "Lexend",
            textTransform: "none",
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
};

export default LocationFormPage;