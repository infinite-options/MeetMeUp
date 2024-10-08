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
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from "../Assets/Components/LogoutButton";
import axios from "axios";
import AccountContext from "../AccountSetup/AccountContext";
import { useContext } from "react";
import MatchPopUp from "./MatchPopUp";
import defaultImg from "../Assets/Images/default.jpg"
import profileUserIcon from "../Assets/Images/profileUserIcon.webp"

const Match = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [userSelections, setUserSelections] = useState([]);
    const { selections, setSelections } = useContext(AccountContext);
    const userId = localStorage.getItem('user_uid');

    const location = useLocation();
    const accountUserData = location.state?.userData;
    //console.log("account user data details in match:", accountUserData)

    const handleNavigate = () => {
        navigate(`/selectionResults`);
        // save the final data
        let selectArray = [];
        for (let i = 0; i < userStates.length; i++) { //user should the index
            console.log('userStates[i]: ', userStates[i]);
            if (userStates[i].liked == true) {
                console.log(i, ' is true');
                selectArray.push(userData[i]);
                // if this user is liked then add this user into userSelections
                // setSelections([...selections, userData[i]]);
            }
            setSelections(selectArray);

        }
        console.log('final userSelections: ', userSelections)
    };
    const [liked, setLiked] = useState([])




    //console.log('userSelections: ', userSelections);

    useEffect(() => {
        axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`)
            .then(res => {
                // Check if the required properties exist before accessing them
                const peopleLiked = (res.data.people_whom_you_selected?.map(user => user.user_uid) || [])
                    .concat(res.data.matched_results?.map(user => user.user_uid) || []);
                const peopleWhoLiked = (res.data.people_who_selected_you?.map(user => user.user_uid) || [])
                    .concat(res.data.matched_results?.map(user => user.user_uid) || []);
                return [peopleLiked, peopleWhoLiked];
            })
            .then(peopleLiked => {
                axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`)
                    .then(res => {
                        console.log("Match me user details", res.data.result);
                        if (res.data.result && res.data.result.length > 0) {
                            // Your existing code for logging image URLs
                        } else {
                            console.log("No matches found for this user");
                        }
    
                        // Ensure res.data.result is an array, even if empty
                        const userData = Array.isArray(res.data.result) ? res.data.result : [];
                        setUserData(userData);
    
                        const initialUserStates = userData.map((user) => ({
                            isFlipped: false,
                            liked: peopleLiked[0].includes(user.user_uid),
                            theyliked: peopleLiked[1].includes(user.user_uid),
                            showPopup: false
                        }));
                        setUserStates(initialUserStates);
                    })
                    .catch(error => {
                        console.log('Error fetching data', error);
                    });
            })
            .catch(error => {
                console.log('Error fetching likes data', error);
            });
    }, [userId]);

    const handleFlip = (index) => {
        const updatedStates = [...userStates];
        updatedStates[index].isFlipped = !updatedStates[index].isFlipped;
        if (!updatedStates[index].isFlipped) {
            window.scroll({ top: index * 700, behavior: "smooth" });
        }
        setUserStates(updatedStates);
    };

    const handleLike = (index, user) => {
        const updatedStates = [...userStates];
        updatedStates[index].liked = !updatedStates[index].liked;
        if (updatedStates[index].theyliked === true && updatedStates[index].liked === true) {
            updatedStates[index].showPopup = true
        }
        setUserStates(updatedStates);
        const fd = new FormData;
        fd.append('liker_user_id', userId)
        fd.append('liked_user_id', user.user_uid)
        console.log(user.user_uid)
        if (updatedStates[index].liked === true) {
            axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', fd)
                .then(res => {
                    console.log(res)
                })
        }
        else {
            console.log('deleting')
            axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', {
                data: fd
            })
                .then(res => {
                    console.log(res)
                })
        }
        console.log('updatedStates: ', updatedStates[index]);
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
                    {/*minHeight: '600px',
                    maxWidth: "414px"*/}

                        <Box sx={{ backgroundColor: "#E4423F", paddingTop: "30px", paddingBottom: "50px", borderRadius: "10px", display: "flex", justifyContent: "center", position: "relative", minHeight: '700px', maxWidth: "550px", maxHeight: "680px", margin: "0 auto", marginTop: "20px" }}>
                           <img src={user.user_photo_url ? JSON.parse(user.user_photo_url)[0] : defaultImg} style={{ width: "100%" }} alt="Profile" />
                            {/*<img
                                src={user.user_photo_url ? JSON.parse(user.user_photo_url)[0] : defaultImg}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    objectPosition: "center"
                                }}
                                alt="Profile"
                            />*/}
                            <Typography sx={{ position: "absolute", zIndex: '10', top: "10%", color: "white", fontSize: '2  0px' }}>
                                {user.user_first_name + " " + user.user_last_name}
                            </Typography>
                            <Typography sx={{ position: "absolute", zIndex: '10', top: "14%", color: "white", fontSize: "10px" }}>
                                {user.user_age} - {user.user_gender} - {user.user_suburb}
                            </Typography>
                            {userStates[index].theyliked && userStates[index].liked &&
                                <Box sx={{ position: "absolute", bottom: "10%", backgroundColor: "white", borderRadius: "30px", padding: "5px" }}>
                                    <MatchPopUp user={user} userStates={userStates} setUserStates={setUserStates} accountUserData={accountUserData} index={index} />
                                </Box>
                            }
                            <Typography sx={{ position: "absolute", zIndex: '10', bottom: "2%", color: "white", fontSize: "18px" }} onClick={() => handleFlip(index)}>
                                Tap to See Profile
                            </Typography>
                            <img src={userStates[index]?.liked ? likedImg : like} style={{ position: "absolute", right: "2%", top: "1%" }} onClick={() => handleLike(index, user)} alt="Like" />
                            <img src={userStates[index]?.theyliked ? likedImg : like} style={{ position: "absolute", left: "2%", top: "1%" }} alt="Liked" />
                        </Box>

                    </Box>

                    <ViewProfile
                        setIsFlipped={() => handleFlip(index)}
                        liked={userStates[index]?.liked}
                        theyliked={userStates[index]?.theyliked}
                        onClick={() => handleLike(index, user)}
                        userData={user}

                    />
                </ReactCardFlip>
            ))}
            <Grid container justifyContent="center">
                <Link to="/matching1PreferencesPage">
                    <Button sx={{ width: "150px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", marginTop: "20px", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>
                        Edit Preferences
                    </Button>
                </Link>
            </Grid>
            <Grid container justifyContent="center">
                <Button onClick={handleNavigate} sx={{ width: "150px", backgroundColor: "#E4423F", borderRadius: "25px", height: "45px", color: "white", mb: "20px", textTransform: "none", fontFamily: "Segoe UI", fontSize: "18px", fontWeight: "regular" }}>
                    My Matches
                </Button>
            </Grid>
            <Grid container justifyContent="center">
                <LogoutButton />
            </Grid>
        </Box>
    );
};

export default Match;
