import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import male1 from "../Assets/Images/male1.jpg";
import Tiffany from "../Assets/Images/Tiffany.jpeg";

const MatchPageNew = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FC6767 40%, #EC008C 94%)", // chnage color here
        textAlign: "center",
        padding: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 1,
        }}
      >
        It's a Match!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "#fff",
          marginBottom: 4,
        }}
      >
        You and Gemma have liked each other.
      </Typography>

      {/* Heart Shapes */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 4,
        }}
      >
        {/* Left Heart */}
        <Box
          sx={{
            width: 140,
            height: 140,
            backgroundImage: `url(${male1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "polygon(50% 0%, 85% 25%, 100% 75%, 50% 100%, 0% 75%, 15% 25%)",
            marginRight: "-20px",
            zIndex: 2,
            border: "5px solid #fff",
          }}
        />
        {/* Right Heart */}
        <Box
          sx={{
            width: 140,
            height: 140,
            backgroundImage: `url(${Tiffany})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "polygon(50% 0%, 85% 25%, 100% 75%, 50% 100%, 0% 75%, 15% 25%)",
            marginLeft: "-20px",
            zIndex: 1,
            border: "5px solid #fff",
          }}
        />
      </Box>

      {/* Buttons */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "10px 20px",
          marginBottom: 2,
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        Set up our date
      </Button>
      <Link
        href="#"
        underline="hover"
        sx={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Keep exploring
      </Link>
    </Box>
  );
};

export default MatchPageNew;
