import { Box, Typography } from "@mui/material";

const Match = () => {
    const name="Bob Hawk"
    const age="43"
    const gender="male"
    const where="Mandurah"
    return (
        <Box sx={{backgroundColor:"#E4423F", paddingTop:"30px", paddingBottom:"50px", borderRadius:"10px", display:"flex",justifyContent:"center", position:"relative", maxWidth:"414px", margin:"0 auto"}}>
            <img src="profileimg.png" style={{width:"100%", height:"90%"}}></img>
            <Typography sx={{position:"absolute", top:"10%", color:"white", fontSize:'20px'}}>{name}</Typography>
            <Typography sx={{position:"absolute", top:"14%", color:"white", fontSize:"10px"}}>{age} - {gender} - {where}</Typography>
            <Typography sx={{position:"absolute", bottom:"2%", color:"white", fontSize:"10px"}}>Tap to See Profile</Typography>
        </Box>
    );
}
 
export default Match;