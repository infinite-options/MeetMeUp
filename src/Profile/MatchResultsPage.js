import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Divider,
  AppBar,
	Toolbar,
  Menu,
	MenuItem,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios from 'axios';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DiamondIcon from '@mui/icons-material/Diamond';

const MatchResultsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

  const renderMatchRow = (name, interests, imgSrc, buttonLabel) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar src={imgSrc} alt={name} sx={{ width: 56, height: 56, mr: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {interests} interests in common
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            color: buttonLabel === "Match" ? "#E4423F" : "#fff",
            borderColor: buttonLabel === "Match" ? "#E4423F" : "transparent",
            backgroundColor: buttonLabel === "Set up date" ? "#E4423F" : "transparent",
            "&:hover": {
              backgroundColor: buttonLabel === "Set up date" ? "#D63530" : "transparent",
            },
            mr: 1,
          }}
        >
          {buttonLabel}
        </Button>
        <IconButton>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>×</Typography>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={0}>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 16px",
    }}
  >
    {/* Title */}
    <Typography
      style={{
        fontFamily: "Lexend",
        fontWeight: 500,
        fontSize: "21px",
        lineHeight: "30px",
        letterSpacing: "-0.04em",
        textAlign: "left",
        color: "#1A1A1A",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      My Matching Results
    </Typography>

    {/* Icons */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <IconButton>
        <NotificationsNoneIcon />
      </IconButton>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
    </Box>

    {/* Menu */}
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        style: {
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "200px",
          padding: "2px 0",
        },
      }}
    >
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          color: "#1A1A1A",
        }}
      >
        <EditNoteIcon style={{ color: "#000" }} />
        Edit Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "10px",
          color: "#1A1A1A",
        }}
      >
        <SettingsIcon style={{ color: "#000" }} />
        Settings
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "10px",
          color: "#1A1A1A",
        }}
      >
        <DiamondIcon style={{ color: "#000" }} />
        Manage Membership
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "10px",
          color: "#1A1A1A",
        }}
      >
        <VisibilityOffIcon style={{ color: "#000" }} />
        Hide Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "10px",
          color: "#1A1A1A",
        }}
      >
        <DeleteIcon style={{ color: "#000" }} />
        Delete Account
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 16px",
          fontFamily: "Lexend",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
          color: "#1A1A1A",
        }}
      >
        <LogoutIcon style={{ color: "#000" }} />
        Logout
      </MenuItem>
    </Menu>
  </Toolbar>
</AppBar>


      {/* Sections */}
      <Box>
        {/* My Matches */}
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "14px",
            marginBottom: '20px'
          }}
        >
          My matches
        </Typography>
        {renderMatchRow("Gemma Jones", "2", "/path/to/gemma.jpg", "Set up date")}
        {renderMatchRow("Emma Carrick", "3", "/path/to/emma.jpg", "Set up date")}
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        {/* People Interested in Me */}
        <Typography
         style={{
          textAlign: "left",
          color: "#757575",
          fontFamily: "Lexend",
          fontSize: "14px",
          marginBottom: '20px'
        }}
        >
          People interested in me
        </Typography>
        {renderMatchRow("Kelsee Whyte", "1", "/path/to/kelsee.jpg", "Match")}
        {renderMatchRow(
          "Esmeralda Butterfly",
          "2",
          "/path/to/esmeralda.jpg",
          "Match"
        )}
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box>
        {/* People I'm Interested In */}
        <Typography
          style={{
            textAlign: "left",
            color: "#757575",
            fontFamily: "Lexend",
            fontSize: "14px",
            marginBottom: '20px'
          }}
        >
          People I’m interested in
        </Typography>
        {renderMatchRow("Stacy Smith", "4", "/path/to/stacy.jpg", "")}
        {renderMatchRow("Charlotte King", "2", "/path/to/charlotte.jpg", "")}
        {renderMatchRow(
          "Jessica Cherrywood",
          "3",
          "/path/to/jessica.jpg",
          ""
        )}
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "auto",
          borderTop: "1px solid #ddd",
          pt: 1,
        }}
      >
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <FavoriteIcon sx={{ color: "#E4423F" }} />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <PersonOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MatchResultsPage;
