import React, { useState } from "react";
import {
	Box,
	Typography,
	Avatar,
	Grid,
	Button,
	Chip,
	AppBar,
	Toolbar,
	IconButton,
	Card,
	CardContent,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DiamondIcon from '@mui/icons-material/Diamond';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';

// Icons for the "About Me" section
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const ProfileSummary = () => {
  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

	return (
		<Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
			{/* Top Bar */}
			<AppBar position="static" color="inherit" elevation={0}>
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
						My Profile
					</Typography>
					<IconButton>
						<NotificationsNoneIcon />
					</IconButton>
					<IconButton onClick={handleMenuOpen}>
  <MoreVertIcon />
</IconButton>
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

			{/* Profile Content */}
			<Box
				sx={{
					width: '100%',
					maxWidth: 400,
					margin: 'auto',
					padding: 2,
					backgroundColor: 'white',
					borderRadius: 3,
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
					mt: 2,
				}}
			>
				{/* Media Placeholder */}
				<Box sx={{ textAlign: 'center', marginBottom: 2 }}>
					<Box
						sx={{
							width: '100%',
							aspectRatio: '1.5',
							backgroundColor: '#f0f0f0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 2,
							marginBottom: 1,
						}}
					>
						<Typography>Video/Image Placeholder</Typography>
					</Box>

					{/* Thumbnails */}
					<Grid container spacing={1} justifyContent="center">
						<Grid item>
							<Avatar sx={{ width: 60, height: 60, backgroundColor: '#f0f0f0' }} variant="rounded" />
						</Grid>
						<Grid item>
							<Avatar sx={{ width: 60, height: 60, backgroundColor: '#f0f0f0' }} variant="rounded" />
						</Grid>
						<Grid item>
							<Avatar
								sx={{
									width: 60,
									height: 60,
									backgroundColor: '#f0f0f0',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
								}}
								variant="rounded"
							>
								<AddIcon />
							</Avatar>
						</Grid>
					</Grid>
				</Box>

				{/* Name and Email */}
				<Typography
					variant="h5"
					textAlign="center"
					fontWeight="bold"
					style={{
						fontFamily: 'Lexend',
						fontWeight: 500,
						fontSize: '21px',
						lineHeight: '30px',
						color: '#1A1A1A',
						marginBottom: '8px',
					}}
				>
					Lachlan Collis
				</Typography>
				<Typography variant="body2" textAlign="center" color="text.secondary" sx={{ marginBottom: 2 }}>
					lachlan@konnectdigital.io
				</Typography>

				{/* Profile Content */}
				{/* Profile Progress */}
				<Card
					sx={{
						marginBottom: 2,
						borderRadius: '16px',
						padding: '16px',
						backgroundColor: '#fff',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
						fontFamily: 'Lexend',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography
							style={{
								fontFamily: 'Lexend',
								fontWeight: 500,
								fontSize: '16px',
								lineHeight: '20px',
								color: '#4B4B4B',
							}}
						>
							Profile: <span style={{ color: '#1A1A1A' }}>80% complete</span>
						</Typography>
					</Box>
					<Box
						style={{
							width: '100%',
							height: '4px',
							backgroundColor: '#f2f2f2',
							position: 'relative',
							marginBottom: '20px',
							marginTop: '20px',
						}}
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
					>
						<Box
							style={{
								width: '90%', // Adjust based on progress
								height: '4px',
								backgroundColor: '#000',
								position: 'absolute',
							}}
						/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
						<Typography
							style={{
								fontFamily: 'Lexend',
								fontWeight: 500,
								fontSize: '14px',
								lineHeight: '16px',
								color: '#E4423F',
								cursor: 'pointer',
							}}
						>
							Hide
						</Typography>
					</Box>
				</Card>

				{/* Additional Text Section */}
				<Typography
					style={{
						fontFamily: 'Lexend',
						fontWeight: 400,
						fontSize: '16px',
						lineHeight: '24px',
						color: '#4B4B4B',
						marginBottom: '24px',
					}}
				>
					Hi! I’m Lachlan and I enjoy outdoor activities. I have a pet dog named Cat. I hope we get to know
					each other!
				</Typography>

				{/* Interests */}
				<Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }}>
					My interests
				</Typography>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
					{['Cooking / Baking', 'Gaming', 'Sports', 'Music', 'Animals & Wildlife'].map((interest) => (
						<Chip
							key={interest}
							label={interest}
							variant="outlined"
							style={{
								marginBottom: '8px',
								borderRadius: '50px',
								textTransform: 'none',
								fontFamily: 'Lexend',
								color: '#1A1A1A',
								backgroundColor: '#fff',
								borderColor: '#1A1A1A',
							}}
						/>
					))}
				</Box>

				{/* Kinds of Dates I Enjoy */}
				<Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }}>
					Kinds of dates I enjoy
				</Typography>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
					{['Dinner', 'Playing video games'].map((date) => (
						<Chip
							key={date}
							label={date}
							variant="outlined"
							style={{
								marginBottom: '8px',
								borderRadius: '50px',
								textTransform: 'none',
								fontFamily: 'Lexend',
								color: '#1A1A1A',
								backgroundColor: '#fff',
								borderColor: '#1A1A1A',
							}}
						/>
					))}
				</Box>

				{/* About Me */}
				<Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }}>
					A little bit about me
				</Typography>
				<Box component="ul" sx={{ marginBottom: 2, paddingLeft: 2 }}>
					{[
						{ icon: <CakeOutlinedIcon />, text: 'Born on April 26, 2001' },
						{ icon: <HeightOutlinedIcon />, text: '5\'11"' },
						{ icon: <ChildCareOutlinedIcon />, text: '0 children' },
						{ icon: <MaleOutlinedIcon />, text: 'Sex assigned at birth was male' },
						{ icon: <FingerprintOutlinedIcon />, text: 'Identifies as male' },
						{ icon: <FavoriteBorderOutlinedIcon />, text: 'Bisexual' },
						{ icon: <EmojiPeopleOutlinedIcon />, text: 'Open to men & women' },
						{ icon: <FlagOutlinedIcon />, text: 'American' },
						{ icon: <Diversity1OutlinedIcon />, text: 'Half-German Half-Irish' },
						{ icon: <AccessibilityOutlinedIcon />, text: 'Curvy body type' },
						{ icon: <SchoolOutlinedIcon />, text: "Bachelor's Degree" },
						{ icon: <WorkOutlineOutlinedIcon />, text: 'UI/UX designer & Graphic designer' },
						{ icon: <SmokingRoomsOutlinedIcon />, text: 'Does not smoke' },
						{ icon: <LiquorOutlinedIcon />, text: 'Does not drink' },
						{ icon: <GavelOutlinedIcon />, text: 'Does not practice a religion' },
						{ icon: <StarBorderOutlinedIcon />, text: 'Taurus' },
					].map((item, index) => (
						<Typography
							key={index}
							component="li"
							variant="body2"
							color="text.secondary"
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								marginBottom: 1,
							}}
						>
							{item.icon}
							{item.text}
						</Typography>
					))}
				</Box>

				{/* Find Match Button */}
				<Button
					variant="contained"
					color="error"
					fullWidth
					style={{
						backgroundColor: '#E4423F',
						color: '#fff',
						borderRadius: '24px',
						padding: '12px 0',
						fontWeight: 'bold',
						textTransform: 'none',
						fontFamily: 'Lexend',
					}}
				>
					Find my match!
				</Button>
			</Box>
		</Box>
	);
};

export default ProfileSummary;
