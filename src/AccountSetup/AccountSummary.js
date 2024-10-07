import { Button, Container, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Type from "../Assets/Components/Type";
import AccountInfo from "../Assets/Components/AccountInfo";
import { Link } from "react-router-dom";
import NextBtn from "../Assets/Components/NextButton";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import AccountContext from "./AccountContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('user_uid');
  console.log(userId);
  const [loading, setLoading] = useState(true);
  const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
        const fetchedData = response.data.result[0];
        await setUserData(fetchedData);
        setLoading(false);
        const openToArray = fetchedData.user_open_to.split(',');
      } catch (error) {
        console.log("Error fetching data", error);
      };
    }
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
      setNoId(true);
    }
  }, [userId]);
  // useEffect(() => {
  //   axios
  //     .get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
  //     .then((res) => {
  //       setUserData(res.data.result[0]);
  //       console.log(res.data.result[0]);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching data", error);
  //     });
  // }, []);
  const navigate = useNavigate();
  const handleSettings = () => {
    navigate(`/settings`);
  };

  const handleUpdate = () => {
    navigate(`/accountSetup3Create`);
  };

  const handlePreferences = () => {
    navigate(`/matching1PreferencesPage`);
  };

  const handleSelections = () => {
    navigate(`/selectionResults`);
  };

  const handleUpload = () => {
    navigate(`/accountSetup5Create`) //CHANGED THIS
  }
  // default values
  console.log('saved Data: ', userData);
  // not needed
  // localStorage.setItem('user_email_id',userData.user_email_id); //Changed to keep email in local storage
  // localStorage.setItem('phone_number',userData.user_phone_number) // Changed to keep phone number in local storage
  const name = userData.user_first_name + " " + userData.user_last_name;
  const age = userData.user_age;
  const gender = userData.user_gender;
  useEffect(() => {
    console.log('useEffect gender: ', userData.user_gender);
  }, userData)
  console.log('saved gender: ', gender);
  const where = userData.user_suburb;
  const dateInterests = userData.user_date_interests ? userData.user_date_interests.split(',') : [];
  const height = userData.user_height;
  const religion = userData.user_religion;
  const sign = userData.user_star_sign;
  const status = userData.user_sexuality;
  const openTo = userData.user_open_to ? JSON.parse(userData.user_open_to) : [];
  const education = userData.user_education;
  const heart = userData.user_body_composition;
  const job = userData.user_job;
  const drink = userData.user_drinking;
  const smoke = userData.user_smoking;
  const flag = userData.user_nationality;
  const bio = userData.user_profile_bio;

  const int = userData.user_general_interests
  console.log('int: ', int);
  var images = userData.user_photo_url;
  const videoSource = userData.user_video_url;

  var imageList = [];
  if (images) {
    try {
      imageList = JSON.parse(images);
      images = imageList[0];
    }
    catch (err) {
      console.log("imageList = JSON.parse(images) err:", err);
    }
  }

  console.log("imageList:", imageList);
  if (loading) {
    return <div>Loading specifics</div>;
  }

  if (noId) {
    
    navigate('/accountSetup1Login')

  }

  return (
    <Grid container size={12} justifyContent='center'>
      <Grid size={4} container justifyContent='flex-end' alignItems='center'>
        <IconButton>
          <img src={profile} alt='profile' />
        </IconButton>
      </Grid>
      <Grid size={4} container justifyContent='center' alignItems='center'>
        <IconButton onClick={handlePreferences}>
          <img src={search} alt='search' />
        </IconButton>
      </Grid>
      <Grid size={4} container justifyContent='flex-start' alignItems='center'>
        <IconButton onClick={handleSelections}>
          <img src={group} alt='group' />
        </IconButton>
      </Grid>
      <Grid size={12}>
        <Typography sx={{ fontSize: "30px", textAlign: "center" }}>About You</Typography>
      </Grid>
      <Grid container justifyContent={'center'}>
        <Grid size={6}>
          {/* {imageList ? imageList.map((imgSrc) => {
            <Grid size={12} key={imgSrc}>
              {console.log(imgSrc)}
              {imgSrc ? <img src={imgSrc} height='200' width='200' alt={imgSrc} /> : null}
            </Grid>
          }) : null} */}
          <Grid size={12}>
            {imageList[0] ? <img src={imageList[0]} style={{ height: '220px', width: '100%', objectFit: 'cover' }} alt={imageList[0]} /> : null}
          </Grid>
          <Grid size={12}>
            {imageList[1] ? <img src={imageList[1]} style={{ height: '220px', width: '100%', objectFit: 'cover' }} alt={imageList[1]} /> : null}
          </Grid>
          <Grid size={12}>
            {imageList[2] ? <img src={imageList[2]} style={{ height: '220px', width: '100%', objectFit: 'cover' }} alt={imageList[2]} /> : null}
          </Grid>

          {/* <Grid size={12} container>
            <img src={img3} alt='img3' />
          </Grid> */}
        </Grid>
        <Grid size={6}>
          <Grid size={12}>
            {videoSource ? <video src={videoSource.replaceAll("\"", "")} height="400" width="200" controls autoPlay muted /> : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12} justifyContent='center'>
        <Button onClick={handleUpload}
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
            gap: "10px",
          }}
        >
          Upload
          <img src={upload} alt='upload' />
        </Button>
      </Grid>
      <Grid size={12} container justifyContent='center'>
        <Typography sx={{ fontFamily: "Lexend", fontSize: "30px" }}>{name}</Typography>
      </Grid>
      <Grid size={12} container justifyContent='center' sx={{ mb: "20px" }}>
        <Typography sx={{ fontSize: "20px" }}>
          {age ? age : "no data"}&nbsp;-&nbsp;{gender ? gender : "no data"}&nbsp;-&nbsp;{where ? where : "no data"}
        </Typography>
      </Grid>
      <Container sx={{ justifyContent: "center", marginLeft: "15%", marginRight: "15%" }}>
        <Grid size={12}>
          <Typography sx={{ fontSize: "18px" }}>Interests</Typography>
        </Grid>
        <Grid container size={12}>
          {dateInterests.length > 0 ? dateInterests.map((interest) => (
            <Grid item xs={4} key={interest}>
              <Type type={interest} />
            </Grid>
          )) : null}
        </Grid>
        <Grid size={12}>
          <Typography sx={{ fontSize: "18px" }}>A Little About Me ...</Typography>
        </Grid>
        <Grid size={12} sx={{ mb: "20px" }}>
          <Grid>
            <Typography sx={{ fontSize: "14px" }}>
              {bio}
            </Typography>
          </Grid>
        </Grid>
        <AccountInfo img={heightImg} info={height} />
        <AccountInfo img={genderImg} info={gender} />
        <AccountInfo img={faith} info={religion} />
        <AccountInfo img={star} info={sign} />
        <AccountInfo img={multi} info={status} />
        <AccountInfo img={multi} info={openTo.join(', ')} />
        <AccountInfo img={hat} info={education} />
        <AccountInfo img={heartImg} info={heart} />
        <AccountInfo img={jobImg} info={job} />
        <AccountInfo img={drinkImg} info={drink} />
        <AccountInfo img={smokeImg} info={smoke} />
        <AccountInfo img={flagImg} info={flag} />

        <hr style={{ width: "100%", marginTop: "30px" }} />
        {/* <Grid container size={12} gap={.5} sx={{ marginTop: "40px", mb: "50px" }}>
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
                    <NextBtn next={'/matching1PreferencesPage'}></NextBtn>
                </Grid> */}
        <Stack direction='row' spacing={2}>
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
              width: "160px",
            }}
            onClick={handleUpdate}
          >
            Update Profile
          </Button>

          <IconButton
            sx={{
              backgroundColor: "#CECECE",
              borderRadius: "25px",
              boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)",
            }}
            onClick={handleSettings}
          >
            <img src={setting} alt='setting' />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#CECECE",
              borderRadius: "25px",
              boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)",
            }}
          >
            <img src={card} alt='card' />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#CECECE",
              borderRadius: "25px",
              boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)",
            }}
          >
            <img src={diamond} alt='diamond' />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#CECECE",
              borderRadius: "25px",
              boxShadow: "2px 5px 5px 2px rgba(0,0,0,.1)",
            }}
          >
            <img src={time} alt='time' />
          </IconButton>
        </Stack>

        <NextBtn next={"/matching1PreferencesPage"}></NextBtn>
      </Container>
    </Grid>
  );
};

export default Profile;
