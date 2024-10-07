import { Box, Button, Container, MenuItem, Modal, Select, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useNavigate, Link } from "react-router-dom";
import PreferenceSlider from "./PreferenceSlider";
import NextBtn from "../Assets/Components/NextButton";
import arrow from "../Assets/Images/arrow.png"
import arrow2 from "../Assets/Images/arrow2.png"
import { useEffect, useState } from "react";
import LogoutButton from "../Assets/Components/LogoutButton";
import TopTitle from "../Assets/Components/TopTitle";
import axios from "axios";

const MatchPreferences = ({ prev }) => {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const userId = localStorage.getItem('user_uid');
    const userEmail = localStorage.getItem("user_email_id");
    const [distance, setDistance] = useState(null);
    const [age, setAge] = useState(null);
    const [height, setHeight] = useState(null);
    const [gender, setGender] = useState(null);


    const handleChange = (event) => {
        setGender(event.target.value)
        const formData = new FormData();
        formData.append('user_uid', userId);
        formData.append('user_email_id', userEmail);
        formData.append('user_prefer_gender', event.target.value)
        axios.put("https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo", formData);
    }


    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
            .then(res => {
                const fetchedData = res.data.result[0];
                setUserData(fetchedData);
                console.log("Account user data (preferences):", fetchedData);

                if (fetchedData.user_prefer_distance) {
                    setDistance(fetchedData.user_prefer_distance);
                } else {
                    setDistance(80);
                }

                if (fetchedData.user_prefer_age_min && fetchedData.user_prefer_age_max) {
                    setAge([fetchedData.user_prefer_age_min, fetchedData.user_prefer_age_max]);
                } else {
                    setAge([20, 40]);
                }

                if (fetchedData.user_prefer_height_min) {
                    setHeight(fetchedData.user_prefer_height_min);
                } else {
                    setHeight(150);
                }

                if (fetchedData.user_prefer_gender) {
                    setGender(fetchedData.user_prefer_gender);
                } else {
                    setGender("Male");
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [userId]);

    const handleMatchMe = () => {
        navigate('/match', { state: { userData: userData } });
    };
    const handleMyMatchesClick = () => {
        navigate('/selectionResults', { state: { userData: userData } });
    };


    return (
        <Box sx={{ marginLeft: { xs: '5%', sm: '15%' }, marginRight: { xs: '5%', sm: '15%' } }}>
            <TopTitle title={'Match Preferences'} page={'/accountSetup7Summary'}></TopTitle>
            {/* <Grid container alignItems="center" size={12}>
                <Grid size={3}>
                    <Link to="/accountSetup7Summary">
                        <img src={arrow} style={{width:"40px", height:"40px"}} />
                    </Link>
                </Grid>
                <Grid size={12} container justifyContent="center">
                    <Typography sx={{ fontSize: '22px', fontFamily: "Lexend", textAlign: "center" }}>
                    Match Preferences
                    </Typography>
                </Grid>
            </Grid> */}
            <Typography sx={{ fontSize: "18px", fontFamily: "Lexend", marginTop: "10px", alignItems: "center" }}>Match Preferences</Typography>
            <Grid container size={12} alignItems="center">
                <Grid size={10.5}>
                    <Typography sx={{ marginTop: "20px", mb: "10px", fontSize: "18px" }}>Location</Typography>
                </Grid>

                <hr style={{ width: "100%" }} />
            </Grid>
            <Grid>
                {distance != null &&
                    <PreferenceSlider preference="Maximum distance" measurement="km." start={distance} min={1} max={160} />}
            </Grid>
            <hr style={{ width: "100%" }} />
            <Grid container sx={{ marginTop: "20px", mb: "20px" }}>
                <Grid size={9}>
                    <Typography sx={{ fontSize: "18px" }}>Looking for</Typography>
                </Grid>
                <Grid size={3} container justifyContent="flex-end">
                    <Select value={gender} onChange={handleChange}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Nonbinary">Nonbinary</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <hr style={{ width: "100%" }} />
            {age != null &&
                <PreferenceSlider preference="Age range" start={age} min={18} max={80} />}
            <hr style={{ width: "100%" }} />
            {height != null &&
                <PreferenceSlider preference="Height in centimetres" start={height} min={75} max={225} />}
            <hr style={{ width: "100%" }} />
            <Grid container size={12} justifyContent="center" >
                <Button
                    onClick={handleMatchMe}
                    sx={{
                        width: "150px",
                        backgroundColor: "#E4423F",
                        borderRadius: "25px",
                        height: "45px",
                        color: "white",
                        marginTop: "40px",
                        mb: "20px",
                        textTransform: "none",
                        fontFamily: "Segoe UI",
                        fontSize: "18px",
                        fontWeight: "regular"
                    }}
                >
                    Match Me
                </Button>
            </Grid>
            {/* <Grid container size={12} justifyContent="center" >
                    <Link to="/grid">
                        <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Grid</Button>
                    </Link>
                </Grid> */}
            <Grid container size={12} justifyContent="center" >
                    <Button onClick={handleMyMatchesClick} sx={{ width: "150px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>My Matches</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <LogoutButton></LogoutButton>
            </Grid>
        </Box>
    );
}

export default MatchPreferences;