import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  IconButton,
  Grid,
  LinearProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const ProfileSummaryPage = () => {
  const interests = [
    "Cooking / Baking",
    "Gaming",
    "Sports",
    "Music",
    "Animals & Wildlife",
  ];

  const userDetails = [
    { icon: "📅", label: "Born on April 26, 2001" },
    { icon: "📏", label: "5'11\"" },
    { icon: "👶", label: "0 children" },
    { icon: "⚥", label: "Sex assigned at birth was male" },
    { icon: "♂️", label: "Identifies as male" },
    { icon: "🏳️‍🌈", label: "Bisexual" },
    { icon: "❤️", label: "Open to men & women" },
  ];

  const placeholderDetails = Array(8).fill("Coming in Live Version");

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        backgroundColor: "#ffffff",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      {/* Header */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          style={{
            fontFamily: "Lexend",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          My Profile
        </Typography>
        <Box>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

     {/* Profile Video/Image Section */}
<Box
  style={{
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "16px",
    backgroundColor: "#f5f5f5",
  }}
>
  {/* Video or Image Placeholder */}
  <img
    src="https://via.placeholder.com/300x200" // Replace with the user's video thumbnail or image
    alt="Main Profile"
    style={{ width: "100%", height: "auto" }}
  />
  {/* Play Icon for Video */}
  <Box
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      padding: "12px",
      cursor: "pointer",
    }}
  >
    <img
      src="https://via.placeholder.com/24/000000/FFFFFF?text=▶" // Placeholder Play Icon
      alt="Play"
      style={{ width: "24px", height: "24px" }}
    />
  </Box>
  <IconButton
    style={{
      position: "absolute",
      top: "8px",
      right: "8px",
      backgroundColor: "#fff",
    }}
  >
    <CloseIcon />
  </IconButton>
</Box>

{/* Additional Pictures Section */}
<Box
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "16px",
  }}
>
  {[...Array(2)].map((_, index) => (
    <Box
      key={index}
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
      }}
    >
      <img
        src="https://via.placeholder.com/80" // Replace with user images
        alt={`Thumbnail ${index + 1}`}
        style={{ width: "100%", height: "100%" }}
      />
      <IconButton
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          backgroundColor: "#fff",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ))}
  {/* Add Placeholder */}
  <Box
    style={{
      width: "80px",
      height: "80px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      border: "1px dashed #ccc",
    }}
  >
    <AddIcon style={{ color: "#757575" }} />
  </Box>
</Box>
{/* User Name */}
      <Typography
        style={{
          fontFamily: "Lexend",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Lachlan Collis
      </Typography>
      <Typography
        style={{
          fontFamily: "Lexend",
          fontSize: "14px",
          color: "#757575",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        lachlan@konnectdigital.io
      </Typography>

      {/* Profile Completion */}
      <Box style={{ marginBottom: "16px" }}>
        <Typography style={{ fontSize: "14px", marginBottom: "8px" }}>
          Profile: 80% complete
        </Typography>
        <LinearProgress variant="determinate" value={80} style={{ height: "8px", borderRadius: "4px" }} />
      </Box>

      {/* Links */}
      <Box style={{ marginBottom: "16px" }}>
        {["your date preferences (2)", "a few more details about you (8)", "profile bio (1)", "verify your account (2)"].map(
          (link, index) => (
            <Typography
              key={index}
              style={{
                fontFamily: "Lexend",
                fontSize: "14px",
                color: "#E4423F",
                textDecoration: "underline",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              {link}
            </Typography>
          )
        )}
      </Box>

      {/* Interests */}
      <Box style={{ marginBottom: "16px" }}>
        <Typography style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
          My interests
        </Typography>
        <Grid container spacing={1}>
          {interests.map((interest, index) => (
            <Grid item key={index}>
              <Box
                style={{
                  padding: "4px 12px",
                  borderRadius: "16px",
                  border: "1px solid #ccc",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                {interest}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* User Details */}
      <Box>
        <Typography style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
          A little bit about me
        </Typography>
        {userDetails.concat(placeholderDetails).map((detail, index) => (
          <Typography
            key={index}
            style={{
              fontSize: "14px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>{detail.icon || "➖"}</span>
            {detail.label || detail}
          </Typography>
        ))}
      </Box>

      {/* Call-to-Action Button */}
      <Box style={{ marginTop: "auto", marginBottom: "16px" }}>
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#E4423F",
            color: "#fff",
            borderRadius: "24px",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Find my match!
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileSummaryPage;
