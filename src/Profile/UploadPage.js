import React, { useRef, useState } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import Webcam from "react-webcam";
import { useUserContext } from "../UserContext"; // Assuming `updateUserData` comes from this context
import ContinueButton from "./ContinueButton";

const UploadPage = () => {
  const [video, setVideo] = useState(null);
  const [photos, setPhotos] = useState([null, null, null]); // Three placeholders for photos
  const fileInputRef = useRef(null); // Ref for hidden file input
  const currentPhotoIndex = useRef(null); // Ref to track which photo index is being uploaded
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const { updateUserData } = useUserContext(); // Context function to update user data

  const isFormValid = video || photos.some((photo) => photo !== null);

  // Handle photo upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const updatedPhotos = [...photos];
    updatedPhotos[currentPhotoIndex.current] = file;
    setPhotos(updatedPhotos);

    // Save photo immediately
    //updateUserData(`img_${currentPhotoIndex.current}`, file);

    // Reset current photo index
    currentPhotoIndex.current = null;
  };

  const triggerPhotoUpload = (index) => {
    currentPhotoIndex.current = index;
    fileInputRef.current.click();
  };

  const handleStartCaptureClick = () => {
    setCapturing(true);
    setRecordedChunks([]);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    
  };

  const handleSaveVideo = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      setVideo(blob); // Save the video blob

      // Save video immediately
      //updateUserData("user_video", blob);

      alert("Video recorded and saved successfully!");
    } else {
      alert("No video recorded!");
    }
  };

  const saveMedia = () => {
    let count = 0; // Declare count as a local variable
    updateUserData("user_video", video);

    photos.forEach((photo) => {
      if (photo) {
        updateUserData("img_" + count, photo); // Make sure count is incremented with each valid photo
        count += 1;
      }
    });
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
      <Box style={{ position: "absolute", top: "20px", left: "20px" }}>
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

      {/* Webcam and Recording Buttons */}
      <div style={{ marginBottom: "20px", width: "100%" }}>
        <Webcam audio ref={webcamRef} style={{ width: "100%" }} />
      </div>
      {capturing ? (
        <Button
          variant="contained"
          onClick={handleStopCaptureClick}
          style={{
            backgroundColor: "#E4423F",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Stop Recording
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleStartCaptureClick}
          style={{
            backgroundColor: "#E4423F",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          Start Recording
        </Button>
      )}
      <Button
        variant="outlined"
        onClick={handleSaveVideo}
        disabled={recordedChunks.length === 0}
        style={{
          borderColor: "#E4423F",
          color: "#E4423F",
          marginBottom: "24px",
        }}
      >
        Save Video
      </Button>

      {/* Photo Upload Section */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "24px",
        }}
      >
        {photos.map((photo, index) => (
          <Button
            key={index}
            component="label"
            variant="outlined"
            onClick={() => triggerPhotoUpload(index)}
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

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* Continue Button */}
      <Box style={{ width: "100%", marginTop: "auto" }}>
        <ContinueButton
          navigateTo="/locationpage"
          isEnabled={isFormValid}
          handleClick={saveMedia}
        />
      </Box>
    </Container>
  );
};

export default UploadPage;
