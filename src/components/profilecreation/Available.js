import Grid  from "@mui/material/Grid2";
import Progress from "./Progress";
import { Button, Container, Typography } from "@mui/material";
import NextBtn from "./NextBtn";

const Available = () => {
    return (  
        <Grid container>
            <Grid size={12}>
                <Progress percent="80%" prev="/recording" />
            </Grid>
            <Container>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>When Are You Available?</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px"}}>These availability slots are crucial to help you and potential matches make date faster.
                    <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                    <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                </Typography>
                <Grid container>
                    <Grid size={4}>
                        <Typography sx={{fontSize:"18px"}}>Day</Typography>
                    </Grid>
                    <Grid size={8} container justifyContent="flex-start">
                        <Typography sx={{fontSize:"18px"}}>Times</Typography>
                    </Grid>
                </Grid>
                <Grid container size={12} justifyContent="center" >
                    <Button sx={{width:"80px",backgroundColor:"black", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"40px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}}>Add</Button>
                </Grid>
                <NextBtn />
            </Container>
        </Grid>
    );
}
 
export default Available;