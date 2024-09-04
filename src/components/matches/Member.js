import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

const Member = () => {
    return (
        <Box sx={{backgroundImage:"url('hatbackground.png')", width:"414px", margin:"0 auto", height:"800px", position:"relative", display:"flex", justifyContent:"center", marginTop:"-9px"}}>
            <Container sx={{backgroundColor:"white", position:"absolute", bottom:"5%", textAlign:"center", width:"90%", borderRadius:"20px"}}>
                <Typography sx={{color:"#E4423F", fontSize:"36px", fontWeight:"bold", fontFamily:"Inria Sans"}}>meet me up</Typography>
                <Typography sx={{fontFamily:"Lexend", fontWeight:"medium", fontSize:"20px"}}>Start matching and create your first date with meet me up</Typography>
                <Typography sx={{fontSize:"14px", fontFamily:"DM Sans"}}>Become a member and gain access to creating unlimited dates with anyone you match with. Free early bird subscription offers for three months
                    for you or a friend/family members when the app is created.
                </Typography>
                <Grid container size={12} justifyContent="center" >
                    <Button sx={{marginTop:"10px",width:"208px",backgroundColor:"#E4423F", borderRadius:"25px", height:"45px", color:"white", mb:"5px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Become a member</Button>   
                </Grid>
                <Grid container size={12} justifyContent="center">
                    <Typography sx={{fontFamily:"Lexend",color:"#E4423F", fontSize:"14px", mb:"10px", marginTop:"10px"}}>Maybe later</Typography>
                </Grid>
            </Container>
        </Box>
    );
}
 
export default Member;