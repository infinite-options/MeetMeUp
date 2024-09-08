import { Button, Container, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Type from "../Assets/Components/Type";
import AccountInfo from "../Assets/Components/AccountInfo"; 
import { Link } from 'react-router-dom';
import NextBtn from "../Assets/Components/NextButton";

// Import images
import profile from "../Assets/Images/profile.png";
import setting from "../Assets/Images/setting.png";
import card from "../Assets/Images/card.png";
import search from "../Assets/Images/search.png";
import group from "../Assets/Images/group.png";
import img1 from "../Assets/Images/img1.png";
import img2 from "../Assets/Images/img2.png";
import img3 from "../Assets/Images/img3.png";
import upload from "../Assets/Images/upload.png";
import heightImg from "../Assets/Images/height.png";
import genderImg from "../Assets/Images/gender.png";
import faith from "../Assets/Images/faith.png";
import star from "../Assets/Images/star.png";
import multi from "../Assets/Images/multi.png";
import hat from "../Assets/Images/hat.png";
import heartImg from "../Assets/Images/heart.png";
import jobImg from "../Assets/Images/job.png";
import drinkImg from "../Assets/Images/drink.png";
import smokeImg from "../Assets/Images/smoke.png";
import flagImg from "../Assets/Images/flag.png";
import diamond from "../Assets/Images/diamond.png";
import time from "../Assets/Images/time.png";

// victors code
// TODO: add props to pass as an object for the specifics
// specific object
const Profile = () => {
    const name = "Lachlan Collis";
    const age = "21";
    const gender = "Male";
    const where = "Brisbane";
    const height = "170cm Tall";
    const religion = "Atheist";
    const sign = "Cancer";
    const status = "None Currently";
    const education = "Associates Degree in UI & UX design";
    const heart = "Plus Size";
    const job = "UI + UX Designer";
    const drink = "Socially";
    const smoke = "I Dont Smoke";
    const flag = "Australian";

    return (
        <Grid container sx={{margin: "0 auto" }}>
            <Grid size={4} container justifyContent="flex-end" alignItems="center">
                <img src={profile} alt="profile" />
            </Grid>
            <Grid size={4} container justifyContent="center" alignItems="center">
                <img src={search} alt="search" />
            </Grid>
            <Grid size={4} container justifyContent="flex-start" alignItems="center">
                <img src={group} alt="group" />
            </Grid>
            <Grid size={12}>
                <Typography sx={{ fontSize: "30px" }}>About You</Typography>
            </Grid>
            <Grid size={6}>
                <Grid size={12}>
                    <img src={img1} alt="img1" />
                </Grid>
                <Grid size={12}>
                    <img src={img3} alt="img3" />
                </Grid>
            </Grid>
            <Grid size={6}>
                <Grid size={12}>
                    <img src={img2} alt="img2" />
                </Grid>
            </Grid>
            <Grid container size={12} justifyContent="center">
                <Button
                    sx={{
                        width: "130px",
                        backgroundColor: "black",
                        borderRadius: "25px",
                        height: "45px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        textTransform: "none",
                        fontSize: "18px",
                        fontFamily: "Segoe UI",
                        fontWeight: "Regular",
                        gap: "10px"
                    }}>
                    Upload
                    <img src={upload} alt="upload" />
                </Button>
            </Grid>
            <Grid size={12} container justifyContent="center">
                <Typography sx={{ fontFamily: "Lexend", fontSize: "30px" }}>{name}</Typography>
            </Grid>
            <Grid size={12} container justifyContent="center" sx={{ mb: "20px" }}>
                <Typography sx={{ fontSize: "20px" }}>{age}-{gender}-{where}</Typography>
            </Grid>
            <Container>
                <Grid size={12}>
                    <Typography sx={{ fontSize: '18px' }}>Interests</Typography>
                </Grid>
                <Grid container size={12}>
                    <Grid size={4}>
                        <Type type="Cooking" />
                    </Grid>
                    <Grid size={4}>
                        <Type type="Eating Out" />
                    </Grid>
                    <Grid size={4}>
                        <Type type="Bike Rides" />
                    </Grid>
                    <Grid size={4}>
                        <Type type="Travelling" />
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Typography sx={{ fontSize: "18px" }}>A Little About Me ...</Typography>
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
                <AccountInfo img={heightImg} info={height} />
                <AccountInfo img={genderImg} info={gender} />
                <AccountInfo img={faith} info={religion} />
                <AccountInfo img={star} info={sign} />
                <AccountInfo img={multi} info={status} />
                <AccountInfo img={hat} info={education} />
                <AccountInfo img={heartImg} info={heart} />
                <AccountInfo img={jobImg} info={job} />
                <AccountInfo img={drinkImg} info={drink} />
                <AccountInfo img={smokeImg} info={smoke} />
                <AccountInfo img={flagImg} info={flag} />
                <hr style={{ width: "100%", marginTop: "30px" }} />
                <Grid container size={12} gap={.5} sx={{ marginTop: "40px", mb: "50px" }}>
                    <Grid size={5}>
                        <Link to={'/accountSetup4Create'}>
                            <Button
                                sx={{
                                    width: "130px",
                                    backgroundColor: "black",
                                    borderRadius: "25px",
                                    height: "45px",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    textTransform: "none",
                                    fontSize: "18px",
                                    fontWeight: "Regular",
                                    textWrap: "none",
                                    width: "160px"
                                }}>
                                Update Profile
                            </Button>
                        </Link>
                    </Grid>
                    <Grid size={1.5} sx={{
                        backgroundColor: "#CECECE", borderRadius: "25px",
                        marginLeft: "10px", boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)",
                    }} container justifyContent="center" alignItems="center">
                        <Link to={'/settings'}>
                            <IconButton>
                                <img src={setting} alt="setting" />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid size={1.5} sx={{
                        backgroundColor: "#CECECE", borderRadius: "25px",
                        boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)"
                    }} container justifyContent="center" alignItems="center">
                        <img src={card} alt="card" />
                    </Grid>
                    <Grid size={1.5} sx={{
                        backgroundColor: "#CECECE", borderRadius: "25px",
                        boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)"
                    }} container justifyContent="center" alignItems="center">
                        <img src={diamond} alt="diamond" />
                    </Grid>
                    <Grid size={1.5} sx={{
                        backgroundColor: "#CECECE", borderRadius: "25px",
                        boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)"
                    }} container justifyContent="center" alignItems="center">
                        <img src={time} alt="time" />
                    </Grid>
                    <NextBtn next={'/accountSetup6Availability'}></NextBtn>
                </Grid>
            </Container>
        </Grid>
    );
}

export default Profile;
