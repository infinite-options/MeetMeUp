import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Info from "./Info";
import Type from "../Assets/Components/Type";
import profile from "../Assets/Images/profile.png";
import searchImg from "../Assets/Images/search.png";
import groupImg from "../Assets/Images/group.png";
import img1Img from "../Assets/Images/img1.png";
import img2Img from "../Assets/Images/img2.png";
import img3Img from "../Assets/Images/img3.png";
import heightImg from "../Assets/Images/height.png";
import genderImg from "../Assets/Images/gender.png";
import faithImg from "../Assets/Images/faith.png";
import starImg from "../Assets/Images/star.png";
import multiImg from "../Assets/Images/multi.png";
import hatImg from "../Assets/Images/hat.png";
import heartImg from "../Assets/Images/heart.png";
import jobImg from "../Assets/Images/job.png";
import drinkImg from "../Assets/Images/drink.png";
import smokeImg from "../Assets/Images/smoke.png";
import flagImg from "../Assets/Images/flag.png";
import redlike from "../Assets/Images/redlike.png"
import redliked from "../Assets/Images/redliked.png"
import MatchPopUp from "./MatchPopUp";
import { useRef } from "react";

const ViewProfile = ({ setIsFlipped, liked, onClick, isLiked, showPopup, user, AccountUser, userData, theyliked }) => {
    console.log("Data passed to ViewProfile:", userData);
    const name = userData.user_first_name + " " + userData.user_last_name;
    const dateInterests = userData.user_date_interests ? userData.user_date_interests.split(',') : [];
    const age = userData.user_age;
    const gender = userData.user_gender
    const where = userData.user_suburb
    const height = userData.user_height
    const religion = userData.user_religion;
    const sign = userData.user_star_sign;
    const status = userData.user_sexuality
    const openTo = userData.user_open_to ? JSON.parse(userData.user_open_to) : [];
    const education = userData.user_education;
    const heart = userData.user_body_composition;
    const job = userData.user_job;
    const drink = userData.user_drinking;
    const smoke = userData.user_smoking;
    const flag = userData.user_nationality;
    const popupRef = useRef(null);
    console.log('userData: ', userData);

    return (
        <Grid container sx={{ maxWidth: "414px", margin: "0 auto", position: "relative" }}>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-content' ref={popupRef}>
                        <MatchPopUp user={user} AccountUser={AccountUser} />
                    </div>
                </div>
            )}
            <Grid size={11} container justifyContent="flex-end" sx={{ margin: "20px" }}>
                {isLiked && <img src={redliked} style={{ position: "absolute", left: "5%", top: "1%" }}></img>}
                <img src={liked ? redliked : redlike} style={{ position: "absolute", right: "5%", top: "1%" }} onClick={onClick}></img>
                <img src={theyliked ? redliked : redlike} style={{ position: "absolute", left: "5%", top: "1%" }}></img>
            </Grid>
            <Grid size={6}>
                <Grid size={12}>
                    {userData.user_photo_url && JSON.parse(userData.user_photo_url)[0] && (
                        <img
                            src={JSON.parse(userData.user_photo_url)[0]}
                            alt="img1"
                            style={{ maxWidth: "200px" }}
                        />
                    )}
                </Grid>
                <Grid size={12}>
                    {userData.user_photo_url && JSON.parse(userData.user_photo_url)[1] && (
                        <img
                            src={JSON.parse(userData.user_photo_url)[1]}
                            alt="img2"
                            style={{ maxWidth: "200px" }}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid size={6}>
                <Grid size={12}>
                    {userData.user_photo_url && JSON.parse(userData.user_photo_url)[2] && (
                        <img
                            src={JSON.parse(userData.user_photo_url)[2]}
                            alt="img3"
                            style={{ maxWidth: "200px" }}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid size={12} container justifyContent="center">
                <Typography sx={{ fontFamily: "Lexend", fontSize: "30px" }}>{name}</Typography>
            </Grid>
            <Grid size={12} container justifyContent="center" sx={{ mb: "20px" }}>
                <Typography sx={{ fontSize: "20px" }}>{age} - {gender} - {where}</Typography>
            </Grid>
            <Container>
                <Grid item xs={12}>
                    <Typography sx={{ fontSize: '18px' }}>
                        Interests
                    </Typography>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {dateInterests.length > 0 ? (
                        dateInterests.map((interest, index) => (
                            <Grid item xs={4} key={index}>
                                <Type type={interest} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>No interests available.</Typography>
                        </Grid>
                    )}
                </Grid>
                <Grid size={12}>
                    <Typography sx={{ fontSize: "18px" }}> ...</Typography>
                </Grid>
                <Grid size={12} sx={{ mb: "20px" }}>
                    <Grid>
                        <Typography sx={{ fontSize: "14px" }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut. <br /><br />
                            Consetetur sadipscing elitr, sed diam nonumy eirmod
                            tempor invidunt ut.
                        </Typography>
                    </Grid>
                </Grid>
                <Info img={heightImg} info={height} />
                <Info img={genderImg} info={gender} />
                <Info img={faithImg} info={religion} />
                <Info img={starImg} info={sign} />
                <Info img={multiImg} info={status} />
                <Info img={multiImg} info={openTo.join(', ')} />
                <Info img={hatImg} info={education} />
                <Info img={heartImg} info={heart} />
                <Info img={jobImg} info={job} />
                <Info img={drinkImg} info={drink} />
                <Info img={smokeImg} info={smoke} />
                <Info img={flagImg} info={flag} />
                <hr style={{ width: "100%", marginTop: "30px" }} />
                <Grid container size={12} gap={0.5} sx={{ marginTop: "20px", mb: "20px" }}>
                    <Grid size={12} container justifyContent="center">
                        <Typography sx={{ fontSize: "18px", fontFamily: "Lexend", marginTop: "10px" }} onClick={() => { setIsFlipped(false) }}>
                            Tap To See Video
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
};


export default ViewProfile;
