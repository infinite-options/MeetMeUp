import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import profileImg from "../Assets/Images/profileimg.png"
import like from "../Assets/Images/like.png"
import likedImg from "../Assets/Images/filledheart.png"
import { useNavigate } from 'react-router-dom'; 
import LogoutButton from "../Assets/Components/LogoutButton";

const Match = () => {
    const navigate = useNavigate(); 
    const handleNavigate = () => {
        navigate(`/grid`);
    };
    const name="Bob Hawk"
    const age="43"
    const gender="male"
    const where="Mandurah";
    const [isFlipped, setIsFlipped] = useState(false);
    const [liked, setLiked] = useState(like)

    const onClick = () => {
        setLiked(prevState=>!prevState)
    }
    useEffect(()=> {
        window.scroll({top:0, behavior:"smooth"});
    }, [isFlipped])
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Box>
                <Box sx={{backgroundColor:"#E4423F", paddingTop:"30px", paddingBottom:"50px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", maxWidth:"414px", margin:"0 auto", marginTop:"20px"}}>
                    <img src={profileImg} style={{width:"100%", height:"90%"}}></img>

                    {/* <img src="profileimg.png" style={{width:"100%", height:"90%"}}></img> */}
                    <Typography sx={{position:"absolute", zIndex: '10', top:"10%", color:"white", fontSize:'20px'}}>{name}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10',top:"14%", color:"white", fontSize:"10px"}}>{age} - {gender} - {where}</Typography>
                    <Typography sx={{position:"absolute", zIndex: '10', bottom:"2%", color:"white", fontSize:"18px"}} onClick={()=>setIsFlipped(true)}>Tap to See Profile</Typography>
                    {/* <img src="like.png" style={{position:"absolute", right:"2%", top:"2%"}}></img> */}
                    <img src={liked ? like : likedImg} style={{position:"absolute", right:"2%", top:"1%"}} onClick={onClick}></img>

                </Box>
                <Grid container size={12} justifyContent="center" >
                <Link to="/matching1PreferencesPage">
                    <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"20px", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
                </Link>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button onClick={handleNavigate} sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <LogoutButton></LogoutButton>
            </Grid>
        </Box>
        <ViewProfile setIsFlipped={setIsFlipped} liked={liked} onClick={onClick} />
    </ReactCardFlip>
    );
}
 
export default Match;