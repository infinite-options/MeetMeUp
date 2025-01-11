import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Slider, Box, IconButton } from '@mui/material';
import { IoChevronBack, IoChevronForward, IoClose, IoPlay, IoPause } from 'react-icons/io5';
import heightImage from '../Assets/Images/heightIcon.png';
import kidIcon from '../Assets/Images/kidIcon.png';
import sexAssigned from '../Assets/Images/sexAssigned.png';
import identifyIcon from '../Assets/Images/identifyIcon.png';
import opentoIcon from '../Assets/Images/opentoIcon.png';
import sexualityIcon from '../Assets/Images/sexualityIcon.png';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import twohearts from '../Assets/Images/twohearts.png';

export default function MatchProfileDisplay() {
	const location = useLocation();
	const video = useRef(null);
	const [status, setStatus] = useState({ isPlaying: false });
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { fetchdata } = location.state || {};
	const [arrlength, setArrlength] = useState(fetchdata?.length);
	const [arrposition, setArrposition] = useState(0);
	const [videoPosition, setVideoPosition] = useState(0);
	const [videoDuration, setVideoDuration] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [theyLikedMe, settheyLikedMe] = useState(false);
	const navigate = useNavigate();

	// Helper function to validate URLs
	const isValidUrl = (string) => {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;
		}
	};

	const handleClick = () => {
        setIsLiked((prevState) => !prevState); // Toggle the like state
      };

	const handlePlaybackStatusUpdate = (event) => {
		const videoElement = event.target;
		setStatus((prev) => ({
			...prev,
			isPlaying: !videoElement.paused,
		}));
		setVideoPosition(videoElement.currentTime * 1000);
		setVideoDuration(videoElement.duration * 1000);
	};

	const handleSeek = (_, value) => {
		if (video.current) {
			video.current.currentTime = value / 1000;
		}
	};

	const handleLeftArrowPress = () => {
		if (arrposition > 0) {
			setArrposition((prev) => prev - 1);
		} else {
			alert('You are at the first match!');
		}
	};

	const handleRightArrowPress = () => {
		if (arrposition < arrlength - 1) {
			// Check if the position is less than the last index
			setArrposition((prev) => prev + 1);
		} else {
			alert('You are at the last match!');
		}
	};

	const handleClosePress = () => {
		handleRightArrowPress();
	};

	const fetchData = async (position) => {
		try {
			const uid = fetchdata[position].user_uid;
			const userData = fetchdata[position];
			// Convert the comma-separated string into an array of interests
			const interestsArray = userData.user_general_interests ? userData.user_general_interests.split(',') : [];

			// Update userInfo with the modified interests
			setUserInfo({
				...userData,
				user_general_interests: interestsArray,
			});

			// Set default values for theyLikedMe and isLiked
			settheyLikedMe(userData.Likes === 'YES');
			setIsLiked(userData['Liked by'] === 'YES');

			// setUserInfo(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(arrposition);
	}, [arrposition]);

	const handleClickofhearts = () => {
		navigate('/matchresults'); // Navigate to /testpage on click
	};

    useEffect(() => {
        if (isLiked) {
          // Call handleMatchClick when isLiked is set to true
          handleMatchClick(userInfo?.user_uid);
        }
      }, [isLiked, userInfo]);

	const handleMatchClick = async () => {
		try {
			// Construct the API URL
			const apiUrl = `https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes`; // Replace with your actual API URL

			// Prepare the data for the POST request (you can pass relevant match data here)
			const data = {
				liker_user_id: localStorage.getItem('user_uid'),
				liked_user_id: userInfo.user_uid, // You can include other data from the match object
			};

			// Send the POST request
			const response = await axios.post(apiUrl, data);

			// Handle success
			if (response.status === 200) {
				console.log('Match success:', response.data);
				alert('Matched successfully!');
			}
		} catch (error) {
			// Handle error
			console.error('Error calling the match API:', error);
			alert('An error occurred while matching.');
		}
	};

	if (loading) {
		return (
			<div style={styles.container}>
				<p style={styles.infoText}>Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div style={styles.container}>
				<p style={styles.infoText}>Error: {error}</p>
			</div>
		);
	}

	let videoUrl = userInfo?.user_video_url;
	if (videoUrl) {
		videoUrl = JSON.parse(videoUrl);
	}

	return (
		<div style={styles.container}>
			{isValidUrl(videoUrl) ? (
				<>
					<video
						ref={video}
						style={styles.backgroundVideo}
						src={videoUrl}
						onTimeUpdate={handlePlaybackStatusUpdate}
					/>
					<button
						style={styles.playPauseButton}
						onClick={() => {
							if (status.isPlaying) {
								video.current.pause();
							} else {
								video.current.play();
							}
						}}
					>
						{status.isPlaying ? <IoPause size={50} color="white" /> : <IoPlay size={50} color="white" />}
					</button>
				</>
			) : (
				<p style={styles.infoText}>Invalid or Missing Video URL</p>
			)}
			{/* Static Layer with Arrows */}
			<div style={styles.staticLayer}>
				<button style={styles.arrowContainer} onClick={handleLeftArrowPress}>
					<IoChevronBack size={24} color="white" />
				</button>

				<div style={styles.imageContainer}>
					<button style={styles.closeButtonContainer} onClick={handleClosePress}>
						<IoClose size={20} color="black" />
					</button>
					<div style={styles.redCircle} onClick={handleClick}>
						{isLiked ? (
							<FavoriteIcon style={styles.icon} /> // Filled heart
						) : (
							<FavoriteBorderIcon style={styles.icon} /> // Outlined heart
						)}
					</div>
				</div>

				<button style={styles.arrowContainer} onClick={handleRightArrowPress}>
					<IoChevronForward size={24} color="white" />
				</button>
			</div>
			<div style={styles.scrollableLayer}>
				<div style={styles.overlay}>
					<div>
						<span style={styles.nameText}>
							<strong>{userInfo?.user_first_name}</strong>
							{`, ${userInfo?.user_age} `}
							{theyLikedMe ? (
								<FavoriteIcon style={styles.icon} /> // Filled heart
							) : (
								<FavoriteBorderIcon style={styles.icon} /> // Outlined heart
							)}
						</span>
					</div>

					<div style={styles.infoContainer}>
						<img src={heightImage} style={styles.image} alt="Height" />
						<span style={styles.infoText}>{userInfo?.user_height}</span>
					</div>

					<div style={styles.infoContainer}>
						<img src={kidIcon} style={styles.image} alt="Kids" />
						<span style={styles.infoText}>
							{userInfo?.user_kids !== null ? `${userInfo?.user_kids} children` : '0 children'}
						</span>
					</div>

					<div style={styles.infoContainer}>
						<img src={sexAssigned} style={styles.image} alt="Gender" />
						<span style={styles.infoText}>Sex assigned at birth was {userInfo?.user_gender}</span>
					</div>

					<div style={styles.infoContainer}>
						<img src={opentoIcon} style={styles.image} alt="Preferences" />
						<span style={styles.infoText}>
							Open to{' '}
							{(() => {
								try {
									const openToArray = JSON.parse(userInfo?.user_open_to || '[]'); // Parse JSON string
									return Array.isArray(openToArray) ? openToArray.join(', ') : '';
								} catch (error) {
									console.error('Failed to parse user_open_to:', error);
									return '';
								}
							})()}
						</span>
					</div>

					<div style={styles.infoContainer}>
						<img src={sexualityIcon} style={styles.image} alt="Sexuality" />
						<span style={styles.infoText}>{userInfo?.user_sexuality}</span>
					</div>
				</div>

				<div style={styles.progressContainer}>
					<Slider
						style={styles.slider}
						min={0}
						max={videoDuration}
						value={videoPosition}
						onChange={handleSeek}
						sx={{
							color: '#FF6347',
							'& .MuiSlider-thumb': {
								width: 12,
								height: 12,
							},
							'& .MuiSlider-track': {
								color: '#FFFFFF',
							},
							'& .MuiSlider-rail': {
								color: '#000000',
							},
						}}
					/>
				</div>
			</div>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-around', // Space out icons evenly
					alignItems: 'center',
					position: 'absolute',
					bottom: 0, // Fix it to the bottom of the screen
					width: '100%',
					backgroundColor: '#000', // Match the background color of the page
					padding: '10px 0', // Add some padding for spacing
					borderTop: '1px solid #444', // Subtle border on top
				}}
			>
				<IconButton>
					<SearchIcon sx={{ color: '#FFF', fontSize: 28 }} />
				</IconButton>
				<IconButton onClick={handleClickofhearts}>
					<img
						src={twohearts}
						alt="Two Hearts"
						style={{
							width: '28px', // Adjust size to match your design
							height: '28px',
						}}
					/>
				</IconButton>
				<IconButton>
					<ChatBubbleOutlineIcon sx={{ color: '#FFF', fontSize: 28 }} />
				</IconButton>
				<IconButton>
					<PersonOutlineIcon sx={{ color: '#FFF', fontSize: 28 }} />
				</IconButton>
			</Box>{' '}
		</div>
	);
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
		height: '100vh',
		width: '100%',
		position: 'relative',
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	scrollableLayer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: '10%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderTopLeftRadius: '30px',
		borderTopRightRadius: '30px',
		zIndex: 1,
		height: '30%',
		overflowY: 'auto',
		marginBottom: '30px',
	},
	overlay: {
		padding: '20px',
		backgroundColor: 'transparent',
		height: '100%',
	},
	nameText: {
		fontSize: '30px',
		color: '#fff',
		marginBottom: '10px',
		display: 'block',
	},
	infoContainer: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px',
	},
	image: {
		width: '20px',
		height: '20px',
		marginRight: '5px',
	},
	infoText: {
		fontSize: '14px',
		color: 'white',
	},
	playPauseButton: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		border: 'none',
		cursor: 'pointer',
		padding: '20px',
		zIndex: 10,
	},
	staticLayer: {
		position: 'absolute',
		bottom: '8%', // Move the whole layer upwards
		left: 0,
		right: 0,
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 20px',
		zIndex: 20,
	},
	arrowContainer: {
		width: '50px',
		height: '50px',
		borderRadius: '25px',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: 'none',
		cursor: 'pointer',
	},
	imageContainer: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	redCircle: {
		marginLeft: '20px',
		width: '45px',
		height: '45px',
		borderRadius: '45px',
		border: '2px solid red',
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		position: 'relative', // Keep it positioned relative to the container
		bottom: '0px', // Move it slightly upwards
	},
	icon: {
		color: 'red', // Red color for the icon
	},
	centerImage: {
		width: '20px',
		height: '20px',
		objectFit: 'contain',
	},
	closeButtonContainer: {
		position: 'absolute',
		top: 0,
		left: '-40px',
		width: '45px',
		height: '45px',
		borderRadius: '45px',
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: 'none',
		cursor: 'pointer',
	},
	progressContainer: {
		padding: '0 20px',
		position: 'absolute', // Ensure it stays positioned
		bottom: '15%', // Adjust the distance from the bottom of the container
	},
};
