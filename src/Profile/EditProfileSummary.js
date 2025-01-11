import React, { useRef, useState, useEffect } from 'react';
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
	ImageList,
	ImageListItem,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DiamondIcon from '@mui/icons-material/Diamond';
import ReactPlayer from 'react-player';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const EditProfileSummary = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
    const [capturing, setCapturing] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
    const [video, setVideo] = useState(null);
  const [saveVideo, setSaveVideo] = useState(false);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Fetch user info from API using user_uid from localStorage
	useEffect(() => {
		const userUid = localStorage.getItem('user_uid');

		if (userUid) {
			fetch(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userUid}`)
				.then((response) => response.json())
				.then((data) => {
					const userData = data.result[0];

					// Convert the comma-separated string into an array of interests
					const interestsArray = userData.user_general_interests
						? userData.user_general_interests.split(',')
						: [];

					// Update userInfo with the modified interests
					setUserInfo({
						...userData,
						user_general_interests: interestsArray,
					});
				})
				.catch((error) => {
					console.error('Error fetching user info:', error);
				});
		}
	}, []);

	// Format user_open_to field
	const userOpenTo = userInfo?.user_open_to;

	const formattedOpenTo = () => {
		if (userOpenTo) {
			const openToArray = userOpenTo.split(','); // Split string by commas

			// If there are more than two items, join with commas and 'and' before the last item
			if (openToArray.length > 1) {
				return openToArray.slice(0, -1).join(', ') + ' & ' + openToArray[openToArray.length - 1];
			}
			return openToArray[0]; // If only one item, return it directly
		}

		return 'Not specified'; // Fallback if there's no value
	};

    const handleStartCaptureClick = () => {
        if (webcamRef.current && webcamRef.current.stream) {
          setCapturing(true);
          setRecordedChunks([]);
          mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
          });
          mediaRecorderRef.current.ondataavailable = handleDataAvailable;
          mediaRecorderRef.current.start();
        } else {
          alert("Webcam is not available or not initialized.");
        }
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

	const handleViewVideo = () => {
		if (recordedChunks.length > 0) {
			const blob = new Blob(recordedChunks, { type: 'video/webm' });
			setVideo(blob); // Save the video blob
		} else {
			alert('No video to view!');
		}
	};

  const handleSaveVideo = () => {
		if (recordedChunks.length > 0) {
			const blob = new Blob(recordedChunks, { type: 'video/webm' });
			setVideo(blob); // Save the video blob
      setSaveVideo(true);
			alert('Video recorded and saved successfully!');
		} else {
			alert('No video recorded!');
		}
	};

	return (
		<Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
			{/* Top Bar */}
			<AppBar position="static" color="inherit" elevation={0}>
				<Toolbar>
					<Typography style={{
             fontFamily: 'Lexend',
             fontWeight: 500,
             fontSize: '21px',
             lineHeight: '30px',
             letterSpacing: '-0.04em',
             textAlign: 'left',
             color: '#1A1A1A',
             marginBottom: '20px',
           }}>
						Editing My Profile
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
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						PaperProps={{
							style: {
								borderRadius: '12px',
								boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
								width: '200px',
								padding: '2px 0',
							},
						}}
					>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '0px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								color: '#1A1A1A',
							}}
						>
							<EditNoteIcon style={{ color: '#000' }} />
							My Profile
						</MenuItem>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '0px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								lineHeight: '10px',
								color: '#1A1A1A',
							}}
						>
							<SettingsIcon style={{ color: '#000' }} />
							Settings
						</MenuItem>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '10px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								lineHeight: '10px',
								color: '#1A1A1A',
							}}
						>
							<DiamondIcon style={{ color: '#000' }} />
							Manage Membership
						</MenuItem>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '10px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								lineHeight: '10px',
								color: '#1A1A1A',
							}}
						>
							<VisibilityOffIcon style={{ color: '#000' }} />
							Hide Profile
						</MenuItem>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '10px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								lineHeight: '10px',
								color: '#1A1A1A',
							}}
						>
							<DeleteIcon style={{ color: '#000' }} />
							Delete Account
						</MenuItem>
						<MenuItem
							onClick={handleMenuClose}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '10px 16px',
								fontFamily: 'Lexend',
								fontWeight: '400',
								fontSize: '14px',
								lineHeight: '20px',
								color: '#1A1A1A',
							}}
						>
							<LogoutIcon style={{ color: '#000' }} />
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
				{/* Media Placeholder - Replace with dynamic content */}
				<Box sx={{ textAlign: 'center', marginBottom: 2 }}>
					{/* Video */}
					<Box
						sx={{
							width: '100%',
							height: '100%',
							aspectRatio: '1',
							backgroundColor: '#f0f0f0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 2,
							marginBottom: 1,
						}}
					>
						{userInfo?.user_video_url ? (
							<ReactPlayer
								url={userInfo.user_video_url.replace(/"/g, '')}
								width="100%"
								height="100%"
								controls
							/>
						) : (
							<Typography>No video available</Typography>
						)}
					</Box>

                    {capturing ? (
				// Show "Stop Recording" button while recording
				<Button
					variant="contained"
					onClick={handleStopCaptureClick}
					style={{
						backgroundColor: '#E4423F',
						color: '#fff',
						marginBottom: '16px',
					}}
				>
					Stop Recording
				</Button>
			) : recordedChunks.length > 0 ? (
				// Show "Record Again" and "Save Video" buttons after recording stops
				<Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<Button
						variant="outlined"
						onClick={handleViewVideo}
						style={{
							borderColor: '#E4423F',
							color: '#E4423F',
							marginBottom: '16px',
							flex: 1,
							marginRight: '8px',
						}}
					>
						View Video
					</Button>
          <Button
						variant="outlined"
						onClick={handleStartCaptureClick}
						style={{
							borderColor: '#E4423F',
							color: '#E4423F',
							marginBottom: '16px',
							flex: 1,
							marginRight: '8px',
						}}
					>
						Record Again
					</Button>
					<Button
						variant="outlined"
						onClick={handleSaveVideo}
						style={{
							borderColor: '#E4423F',
							color: '#E4423F',
							marginBottom: '16px',
							flex: 1,
						}}
					>
						Save Video
					</Button>
				</Box>
			) : (
				// Show "Start Recording" button initially
				<Button
					variant="contained"
					onClick={handleStartCaptureClick}
					style={{
						backgroundColor: '#E4423F',
						color: '#fff',
						marginBottom: '16px',
					}}
				>
					Record New Video
				</Button>
			)}
					<Box
						sx={{
							width: '100%',
							height: '100%',
							backgroundColor: '#f0f0f0',
							borderRadius: 2,
							marginBottom: 1,
						}}
					>
						<ImageList sx={{ display: 'flex', flexWrap: 'wrap' }} cols={3}>
							{(() => {
								try {
									// Parse the JSON string into an array
									const images = JSON.parse(userInfo?.user_photo_url || '[]');

									// If there are no images, return avatars
									if (images.length === 0) {
										return Array.from({ length: 3 }).map((_, index) => (
											<ImageListItem key={`filler-${index}`}>
												<Avatar
													sx={{
														width: 120,
														height: 120,
														backgroundColor: '#f0f0f0',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
													}}
												></Avatar>
											</ImageListItem>
										));
									}

									// Otherwise, render the images
									return images.map((image, index) => (
										<ImageListItem key={index}>
											<img
												src={image} // The image URL
												alt={`user-photo-${index}`}
												style={{
													width: '120px', // Set fixed width
													height: '120px', // Set fixed height
													objectFit: 'cover',
													borderRadius: '8px',
													border: '5px solid #ccc',
												}}
											/>
										</ImageListItem>
									));
								} catch (e) {
									console.error('Error parsing user photo URL:', e);
									return null; // Return nothing if parsing fails
								}
							})()}
						</ImageList>
					</Box>
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
					{userInfo?.user_first_name} {userInfo?.user_last_name}
				</Typography>
				<Typography variant="body2" textAlign="center" color="text.secondary" sx={{ marginBottom: 2 }}>
					{userInfo?.user_email_id}
				</Typography>

				{/* Profile Content */}

				{/* Interests */}
				<Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }}>
					My interests
				</Typography>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
					{userInfo?.user_general_interests?.map((interest) => (
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

				{/* About Me */}
				<Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }}>
					A little bit about me
				</Typography>
				<Box component="ul" sx={{ marginBottom: 2, paddingLeft: 2 }}>
					{[
						{ icon: <CakeOutlinedIcon />, text: userInfo?.user_age },
						{ icon: <HeightOutlinedIcon />, text: userInfo?.user_height },
						{ icon: <ChildCareOutlinedIcon />, text: userInfo?.user_kids + ' children' },
						{ icon: <MaleOutlinedIcon />, text: 'Sex assigned at birth was ' + userInfo?.user_gender },
						{ icon: <FingerprintOutlinedIcon />, text: 'Identifies as ' + userInfo?.user_gender },
						{ icon: <FavoriteBorderOutlinedIcon />, text: userInfo?.user_sexuality },
						{ icon: <EmojiPeopleOutlinedIcon />, text: 'Open to ' + formattedOpenTo() },
						{ icon: <FlagOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <Diversity1OutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <AccessibilityOutlinedIcon />, text: 'Coming in Live Version ' },
						{ icon: <SchoolOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <WorkOutlineOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <SmokingRoomsOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <LiquorOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <GavelOutlinedIcon />, text: 'Coming in Live Version' },
						{ icon: <StarBorderOutlinedIcon />, text: 'Coming in Live Version' },
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
					onClick={(e) => navigate('/mypreferences')}
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
					Save My Changes
				</Button>
			</Box>
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
          <FavoriteBorderIcon sx={{ color: "#E4423F" }} />
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

export default EditProfileSummary;
