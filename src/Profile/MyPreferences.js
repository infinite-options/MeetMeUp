import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Slider,
	Menu,
	MenuItem,
	Grid,
	Chip,
	Button,
	Checkbox,
	TextField,
	FormControlLabel,
	Switch,
	AppBar,
	Toolbar,
	IconButton,
} from '@mui/material';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DiamondIcon from '@mui/icons-material/Diamond';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';

const MyPreferences = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [distance, setDistance] = useState(100); // Maximum distance from you
	const [ageRange, setAgeRange] = useState([18, 99]); // Age range
	const [heightRange, setHeightRange] = useState([122, 213]); // Height range
	const [children, setChildren] = useState(0); // Maximum # of children
	const [bodyTypes, setBodyTypes] = useState(['Slim', 'Athletic', 'Curvy', 'Plus Sized', 'Few Extra Pounds']);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [smoking, setSmoking] = useState('No');
	const [drinking, setDrinking] = useState('No');
	const [religion, setReligion] = useState(''); // Religious Preference
	const navigate = useNavigate();
	const open = Boolean(anchorEl);
	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleSliderChange = (event, newValue, field) => {
		if (field === 'distance') {
			setDistance(newValue);
		} else if (field === 'ageRange') {
			setAgeRange(newValue);
		} else if (field === 'heightRange') {
			setHeightRange(newValue);
		} else if (field === 'children') {
			setChildren(newValue);
		}
	};

	const handleOptionSelect = (option) => {
		if (selectedOptions.includes(option)) {
			setSelectedOptions(selectedOptions.filter((item) => item !== option));
		} else {
			setSelectedOptions([...selectedOptions, option]);
		}
	};

	const updateUserInfo = async () => {
		try {
			const user_uid = localStorage.getItem('user_uid');
			const user_email_id = localStorage.getItem('user_email_id');

			const formData = new FormData();
			formData.append('user_uid', user_uid);
			formData.append('user_email_id', user_email_id);
			formData.append('user_prefer_distance', parseInt(distance));
			formData.append('user_prefer_age_min', parseInt(ageRange[0]));
			formData.append('user_prefer_age_max', parseInt(ageRange[1]));
			formData.append('user_prefer_height_min', heightRange[0]);
			formData.append('user_prefer_kids', children);

			// Log the FormData to ensure everything was appended
			for (let pair of formData.entries()) {
				console.log(`${pair[0]}: ${pair[1]}`);
			}

			// API call
			const updateUserInfoUrl = 'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo';
			const updateUserInfoResponse = await axios.put(updateUserInfoUrl, formData);

			console.log('Update User Info Response:', updateUserInfoResponse.data);

			// // Navigate to the next step
			// navigate("/summary");
		} catch (error) {
			console.error('Error occurred during API calls:', error);
			if (error.response) {
				console.error('API Response Error:', error.response);
			}
		}
	};

	const findMyMatches = async () => {
		try {
			// Call updateUserInfo first
			await updateUserInfo();

			const userId = localStorage.getItem('user_uid'); // Assign `user_uid` dynamically or hard-code for now if needed
			const apiUrl = `https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`;

			// Fetch data from the API
			const response = await fetch(apiUrl);
			const data = await response.json();

			// Display the "message" from the response
			if (data.message) {
				const fetchdata = data.result; // Extract the result
				navigate('/matchprofile', { state: { fetchdata } }); // Pass `fetchdata` to the route
			} else {
				alert('No message found in the response.');
			}
		} catch (error) {
			console.error('Error fetching matches:', error);
			alert('An error occurred while finding matches.');
		}
	};

	return (
		<Box sx={{ backgroundColor: 'white', minHeight: '100vh', padding: 2 }}>
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
      My Preferences
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
{/* Main Content */}
			<Box
				sx={{
					padding: 3,
					backgroundColor: 'white',
					borderRadius: 3,
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography
						style={{
							textAlign: 'left',
							color: '#757575',
							fontFamily: 'Lexend',
							fontSize: '14px',
						}}
					>
						Maximum distance from you (km)
					</Typography>

					<Typography
						style={{
							marginLeft: '8px',
							fontFamily: 'Lexend',
							fontSize: '14px',
							fontWeight: 'bold',
							color: '#000',
						}}
					>
						{distance} km
					</Typography>
				</Box>
				<Slider
					value={distance}
					onChange={(e, newValue) => handleSliderChange(e, newValue, 'distance')}
					min={0}
					max={500}
					valueLabelDisplay="off"
					sx={{
						flex: 1, // Makes the slider occupy remaining space
						color: 'red', // Red color for the slider
						'& .MuiSlider-thumb': {
							backgroundColor: 'red', // Thumb color
						},
						'& .MuiSlider-track': {
							backgroundColor: 'red', // Track color
						},
						'& .MuiSlider-rail': {
							backgroundColor: 'lightcoral', // Rail color (lighter shade for contrast)
						},
            marginBottom: '10px'
					}}
				/>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography
						style={{
							textAlign: 'left',
							color: '#757575',
							fontFamily: 'Lexend',
							fontSize: '14px',
						}}
					>
						Age Range
					</Typography>

					<Typography
						style={{
							marginLeft: '8px',
							fontFamily: 'Lexend',
							fontSize: '14px',
							fontWeight: 'bold',
							color: '#000',
						}}
					>
						{ageRange[0]} - {ageRange[1]}
					</Typography>
				</Box>
				<Slider
					value={ageRange}
					onChange={(e, newValue) => handleSliderChange(e, newValue, 'ageRange')}
					min={18}
					max={99}
					valueLabelDisplay="off"
					sx={{
						flex: 1, // Makes the slider occupy remaining space
						color: 'red',
						'& .MuiSlider-thumb': {
							backgroundColor: 'red', // Thumb color
						},
						'& .MuiSlider-track': {
							backgroundColor: 'red', // Track color
						},
						'& .MuiSlider-rail': {
							backgroundColor: 'lightcoral', // Rail color (lighter shade for contrast)
						},
            marginBottom: '10px'
					}}
				/>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography
						style={{
							textAlign: 'left',
							color: '#757575',
							fontFamily: 'Lexend',
							fontSize: '14px',
						}}
					>
						Height Range (cm)
					</Typography>

					<Typography
						style={{
							marginLeft: '8px',
							fontFamily: 'Lexend',
							fontSize: '14px',
							fontWeight: 'bold',
							color: '#000',
						}}
					>
						{heightRange[0]} cm - {heightRange[1]} cm
					</Typography>
				</Box>
				<Slider
					value={heightRange}
					onChange={(e, newValue) => handleSliderChange(e, newValue, 'heightRange')}
					min={122}
					max={213}
					valueLabelDisplay="off"
					sx={{
						flex: 1, // Makes the slider occupy remaining space
						color: 'red',
						'& .MuiSlider-thumb': {
							backgroundColor: 'red', // Thumb color
						},
						'& .MuiSlider-track': {
							backgroundColor: 'red', // Track color
						},
						'& .MuiSlider-rail': {
							backgroundColor: 'lightcoral', // Rail color (lighter shade for contrast)
						},
            marginBottom: '10px'
					}}
				/>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography
						style={{
							textAlign: 'left',
							color: '#757575',
							fontFamily: 'Lexend',
							fontSize: '14px',
						}}
					>
						Maximum # of children
					</Typography>

					<Typography
						style={{
							marginLeft: '8px',
							fontFamily: 'Lexend',
							fontSize: '14px',
							fontWeight: 'bold',
							color: '#000',
						}}
					>
						{children}
					</Typography>
				</Box>
				<Slider
					value={children}
					onChange={(e, newValue) => handleSliderChange(e, newValue, 'children')}
					min={0}
					max={10}
					valueLabelDisplay="off"
					sx={{
						flex: 1, // Makes the slider occupy remaining space
						color: 'red',
						'& .MuiSlider-thumb': {
							backgroundColor: 'red', // Thumb color
						},
						'& .MuiSlider-track': {
							backgroundColor: 'red', // Track color
						},
						'& .MuiSlider-rail': {
							backgroundColor: 'lightcoral', // Rail color (lighter shade for contrast)
						},
            marginBottom: '10px'
					}}
				/>

				<Typography
					style={{
						textAlign: 'left',
						color: '#757575',
						fontFamily: 'Lexend',
						fontSize: '14px',
						marginBottom: '14px',
					}}
				>
					Body Type
				</Typography>
				<Grid container spacing={1}>
					{bodyTypes.map((bodyType, index) => (
						<Grid item key={index}>
							<Box
								style={{
									borderRadius: '40px',
									border: `2px solid ${selectedOptions.includes(bodyType) ? '#000' : '#e0e0e0'}`,
									display: 'flex',
									alignItems: 'center',
									backgroundColor: '#fff',
									transition: 'border-color 0.3s',
									// padding: "2px 2px", // Adjust padding for better appearance
									cursor: 'pointer',
								}}
							>
								<FormControlLabel
									control={
										<Checkbox
											icon={<RadioButtonUncheckedIcon />}
											checkedIcon={<CheckCircleIcon />}
											checked={selectedOptions.includes(bodyType)}
											onChange={() => handleOptionSelect(bodyType)}
											style={{
												color: selectedOptions.includes(bodyType) ? '#000' : '#757575',
												padding: '2px 2px',
											}}
										/>
									}
									label={
										<span
											style={{
												fontWeight: 'bold',
												fontFamily: 'Lexend',
												color: '#1A1A1A',
											}}
										>
											{bodyType}
										</span>
									}
									style={{
										marginLeft: '8px',
										flex: 1,
									}}
								/>
							</Box>
						</Grid>
					))}
				</Grid>

				<Typography
					style={{
						textAlign: 'left',
						color: '#757575',
						fontFamily: 'Lexend',
						fontSize: '14px',
						marginBottom: '14px',

						marginTop: '14px',
					}}
				>
					Smoking Habits
				</Typography>
				<Grid container spacing={1}>
					{['Yes', 'No', 'Either'].map((option, index) => (
						<Grid item key={index}>
							<Button
								variant={smoking === option ? 'contained' : 'outlined'}
								onClick={() => setSmoking(option)}
								sx={{
									borderRadius: '40px',
									borderColor: 'black',
									backgroundColor: smoking === option ? 'black' : 'transparent',
									color: smoking === option ? '#fff' : '#000',
								}}
							>
								{option}
							</Button>
						</Grid>
					))}
				</Grid>

				<Typography
					style={{
						textAlign: 'left',
						color: '#757575',
						fontFamily: 'Lexend',
						fontSize: '14px',
						marginBottom: '14px',
						marginTop: '14px',
					}}
				>
					Drinking Habits
				</Typography>
				<Grid container spacing={1}>
					{['Yes', 'No', 'Either'].map((option, index) => (
						<Grid item key={index}>
							<Button
								variant={drinking === option ? 'contained' : 'outlined'}
								onClick={() => setDrinking(option)}
								sx={{
									borderRadius: '40px',
									borderColor: 'black',
									backgroundColor: drinking === option ? 'black' : 'transparent',
									color: drinking === option ? '#fff' : '#000',
								}}
							>
								{option}
							</Button>
						</Grid>
					))}
				</Grid>

				<Typography
					style={{
						textAlign: 'left',
						color: '#757575',
						fontFamily: 'Lexend',
						fontSize: '14px',
						marginTop: '14px',
						marginBottom: '14px',
					}}
				>
					Religious Preference
				</Typography>

				<Box style={{ width: '100%', marginBottom: '24px' }}>
					<TextField
						fullWidth
						placeholder=""
						value={religion}
						onChange={(e) => setReligion(e.target.value)}
						variant="filled"
						InputProps={{
							disableUnderline: true,
							style: {
								height: '50px',
								borderRadius: '8px',
								backgroundColor: '#f2f2f2',
								display: 'flex',
								alignItems: 'center',
								fontFamily: 'Lexend',
								fontSize: '16px',
							},
						}}
					/>
				</Box>

				<Button
					variant="contained"
					color="error"
					onClick={findMyMatches}
					fullWidth
					sx={{
						padding: '12px 0',
						fontWeight: 'bold',
						textTransform: 'none',
						fontFamily: 'Lexend',
						backgroundColor: '#E4423F',
					}}
				>
					Find my match!
				</Button>
			</Box>
		</Box>
	);
};

export default MyPreferences;
