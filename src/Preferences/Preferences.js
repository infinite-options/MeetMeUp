import { Box, Button, Container, Modal, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import PreferenceSlider from "./PreferenceSlider";
import NextBtn from "../Assets/Components/NextButton";
import arrow from "../Assets/Images/arrow.png"
import arrow2 from "../Assets/Images/arrow2.png"
import { useState } from "react";
import LogoutButton from "../Assets/Components/LogoutButton";
import TopTitle from "../Assets/Components/TopTitle";

const MatchPreferences = ({prev}) => {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
 
    return (
        <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
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
                <Typography sx={{fontSize:"18px", fontFamily:"Lexend", marginTop:"10px", alignItems:"center"}}>Match Preferences</Typography>
                <Grid container size={12} alignItems="center">
                    <Grid size={10.5}>
                        <Typography sx={{marginTop:"20px", mb:"10px"}}>Location</Typography>
                    </Grid>
                    <Grid size={1} container justifyContent="flex-end">
                        <img src={arrow2}></img>
                    </Grid>
                    <hr style={{width:"100%"}} />
                </Grid>
                <Grid>
                    <PreferenceSlider preference="Maximum distance" measurement="km." start={80} min={1} max={160} />
                </Grid>
                <hr style={{width:"100%"}} />
                <Grid container sx={{marginTop:"20px", mb:"20px"}}>
                    <Grid size={9}>
                        <Typography sx={{fontSize:"18px"}}>Looking for</Typography>
                    </Grid>
                    <Grid size={2}>
                        <Typography sx={{fontSize:'18px'}}>Men</Typography>
                    </Grid>
                    <Grid size={1}>
                        <img src={arrow2}></img>
                    </Grid>
                </Grid>
                <hr style={{width:"100%"}} />
                <PreferenceSlider preference="Age range" start={[20,40]} min={18} max={80} />
                <hr style={{width:"100%"}} />
                <PreferenceSlider preference="Height in centimetres" start={150} min={75} max={225} />
                <hr style={{width:"100%"}} />
                <Grid container size={12} justifyContent="center" >
                    <Link to="/match">
                        <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white",marginTop:"40px", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Match Me</Button>
                    </Link>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <Link to="/grid">
                        <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Grid</Button>
                    </Link>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <Link to="/selectionResults">
                        <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>My Matches</Button>
                    </Link>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <LogoutButton></LogoutButton>
                </Grid>
        </Box>
    );
}
 
export default MatchPreferences;