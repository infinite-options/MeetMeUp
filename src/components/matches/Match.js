import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";

const Match = () => {
    const name="Bob Hawk"
    const age="43"
    const gender="male"
    const where="Mandurah";
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(()=> {
        window.scroll({top:0, behavior:"smooth"});
    }, [isFlipped])
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Box>
                <Box sx={{backgroundColor:"#E4423F", paddingTop:"30px", paddingBottom:"50px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", maxWidth:"414px", margin:"0 auto"}}>
                    <img src="profileimg.png" style={{width:"100%", height:"90%"}}></img>
                    <Typography sx={{position:"absolute", top:"10%", color:"white", fontSize:'20px'}}>{name}</Typography>
                    <Typography sx={{position:"absolute", top:"14%", color:"white", fontSize:"10px"}}>{age} - {gender} - {where}</Typography>
                    <Typography sx={{position:"absolute", bottom:"2%", color:"white", fontSize:"10px"}} onClick={()=>setIsFlipped(true)}>Tap to See Profile</Typography>
                    <img src="like.png" style={{position:"absolute", right:"2%", top:"2%"}}></img>
                </Box>
                <Grid container size={12} justifyContent="center" >
                <Link to="/preferences">
                    <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", marginTop:"20px", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Back</Button>
                </Link>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"20px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Continue</Button>
            </Grid>
            <Grid container size={12} justifyContent="center" >
                <Button sx={{width:"130px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Logout</Button>   
            </Grid>
        </Box>
        <ViewProfile setIsFlipped={setIsFlipped}/>
    </ReactCardFlip>
    );
}
 
export default Match;