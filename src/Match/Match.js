import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import profileImg from "../Assets/Images/profileimg.png";
import like from "../Assets/Images/like.png";
import likedImg from "../Assets/Images/filledheart.png";
import { useNavigate } from 'react-router-dom';         
import LogoutButton from "../Assets/Components/LogoutButton";
import axios from "axios";

const Match = () => {
    const navigate = useNavigate(); 
    const handleNavigate = () => {
        navigate(`/grid`);
    };

    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);

    useEffect(() => {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/100-000003`)
            .then(res => {
                console.log(res.data.result)
                setUserData(res.data.result);
                const initialUserStates = res.data.result.map(() => ({
                    isFlipped: false,
                    liked: false
                }));
                setUserStates(initialUserStates);
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    }, []);

    const handleFlip = (index) => {
        const updatedStates = [...userStates];
        updatedStates[index].isFlipped = !updatedStates[index].isFlipped;
        if (!updatedStates[index].isFlipped) {
            window.scroll({top:index * 700, behavior:"smooth"});
        }
        setUserStates(updatedStates);
    };

    const handleLike = (index) => {
        const updatedStates = [...userStates];
        updatedStates[index].liked = !updatedStates[index].liked;
        setUserStates(updatedStates);
    };


    return (
        <Box>
            {userData && userData.map((user, index) => (
                <ReactCardFlip
                    isFlipped={userStates[index]?.isFlipped}
                    flipDirection="horizontal"
                    key={user.user_id} // assuming user has a unique ID
                >
                    <Box>
                        <Box sx={{ backgroundColor: "#E4423F", paddingTop: "30px", paddingBottom: "50px", borderRadius: "10px", display: "flex", justifyContent: "center", position: "relative", maxWidth: "414px", margin: "0 auto", marginTop: "20px" }}>
                            <img src={profileImg} style={{ width: "100%", height: "90%" }} alt="Profile" />

                            <Typography sx={{ position: "absolute", zIndex: '10', top: "10%", color: "white", fontSize: '20px' }}>
                                {user.user_first_name + " " + user.user_last_name}
                            </Typography>
                            <Typography sx={{ position: "absolute", zIndex: '10', top: "14%", color: "white", fontSize: "10px" }}>
                                {user.user_age} - {user.user_gender} - {user.user_suburb}
                            </Typography>
                            <Typography sx={{ position: "absolute", zIndex: '10', bottom: "2%", color: "white", fontSize: "18px" }} onClick={() => handleFlip(index)}>
                                Tap to See Profile
                            </Typography>
                            <img src={userStates[index]?.liked ? likedImg : like} style={{ position: "absolute", right: "2%", top: "1%" }} onClick={() => handleLike(index)} alt="Like" />
                        </Box>

                    </Box>

                    <ViewProfile
                        setIsFlipped={() => handleFlip(index)}
                        liked={userStates[index]?.liked}
                        onClick={() => handleLike(index)}
                        userData={user}
                    />
                </ReactCardFlip>
            ))}
            <Grid container justifyContent="center">
                            <Link to="/matching1PreferencesPage">
                                <Button sx={{ width: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", marginTop: "20px", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>
                                    Back
                                </Button>
                            </Link>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Button onClick={handleNavigate} sx={{ width: "130px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>
                                Continue
                            </Button>
                        </Grid>
                        <Grid container justifyContent="center">
                            <LogoutButton />
                        </Grid>
        </Box>
    );
};

export default Match;
