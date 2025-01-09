import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  Input,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../UserContext';
import ContinueButton from './ContinueButton';

const UploadPage = () => {
    const [video, setVideo] = useState(null);
    const [photos, setPhotos] = useState([null, null, null]);
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ref for file input
    const currentPhotoIndex = useRef(null); // Ref to track which photo index is being uploaded
    const { updateUserData } = useUserContext(); 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (currentPhotoIndex.current === "video") {
      // Handle video upload
      setVideo(file);
    } else if (currentPhotoIndex.current !== null) {
      // Handle photo upload
      const updatedPhotos = [...photos];
      updatedPhotos[currentPhotoIndex.current] = file; // Store file object
      setPhotos(updatedPhotos);
    }
    currentPhotoIndex.current = null; // Reset after use
  };

  const triggerFileUpload = (index) => {
    currentPhotoIndex.current = index; // Set the current index or "video"
    fileInputRef.current.click(); // Trigger file selection
  };

  // Cleanup URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo) {
          URL.revokeObjectURL(photo.preview);
        }
      });
    };
  }, [photos]);

  const saveMedia = () => {
    let count = 0; // Declare count as a local variable
    updateUserData('user_video', video);
  
    photos.forEach((photo) => {
      if (photo) {
        updateUserData('img_' + count, photo); // Make sure count is incremented with each valid photo
        count += 1;
      }
    });
  };

  const isFormValid = video || photos.some((photo) => photo !== null);

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
        <IconButton>
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
            width: "70%", // Adjust this percentage based on progress
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
          Add your video & photos
        </Typography>
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "12px",
          }}
        >
          Please upload a short video introducing yourself.
        </Typography>
      </Box>

      {/* Instructions */}
      <Box style={{ marginTop: "24px", marginBottom: "24px", textAlign: "left", width: "100%" }}>
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
            marginBottom: "18px",
          }}
        >
          For the testing phase, please keep your video <b>short</b>. Example:
          “Hi! I’m Hannah and I enjoy outdoor activities.”
        </Typography>
        <Typography
          style={{
            fontSize: "12px",
            fontFamily: "Lexend",
            color: "#757575",
          }}
        >
          We are also unable to crop your photos for the testing phase, so
          please use <b>centered photos</b>.
        </Typography>
      </Box>

      {/* Video Upload */}
      <Button
        component="label"
        variant="outlined"
        onClick={() => triggerFileUpload("video")}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
          textTransform: "none",
          border: "2px solid #E4423F",
          color: "#E4423F",
          fontFamily: "Lexend",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px 20px",
          marginBottom: "24px",
          width: "100%",
          marginTop: "24px",
        }}
      >
        <CloudUploadIcon style={{ marginRight: "8px" }} />
        Upload Video File
      </Button>

      {/* Photo Upload */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "24px",
          marginTop: "24px",
        }}
      >
        {photos.map((photo, index) => (
          <Button
            key={index}
            component="label"
            variant="outlined"
            onClick={() => triggerFileUpload(index)}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              backgroundColor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <AddIcon style={{ color: "#E4423F", fontSize: "32px" }} />
            )}
          </Button>
        ))}
      </Box>

       {/* Hidden Input */}
       <input
        type="file"
        accept="video/*,image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* Continue Button */}
      <Box style={{ width: '100%', marginTop: 'auto' }}> {/* Add marginTop:auto to push the button down */}
        <ContinueButton navigateTo="/locationpage" isEnabled={isFormValid}  handleClick={saveMedia} />
      </Box>
    </Container>
  );
};

export default UploadPage;