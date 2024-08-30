import Grid from '@mui/material/Grid2';
import Progress from './Progress';
import { Button, Container, Typography } from '@mui/material';
import NextBtn from './NextBtn';

const Recording = () => {
    return (
        <Grid container>
            <Grid size={12}>
                <Progress percent="80%" prev="/interests" />
            </Grid>
            <Container>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>Your Profile Recording</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px"}}>This is a short 30 second to 5 minute video to tell us a bit about who you are and what you are like.
                <br /><br />Be as open and honest as you would like, matches love to hear about you.</Typography>
                <Grid container sx={{backgroundColor:"#F2F2F2", borderRadius:"5px", marginTop:"40px", height:"63px"}} alignItems="center">
                    <Grid size={1.5} container justifyContent="center">
                        <img src="question.png"></img>
                    </Grid>
                    <Grid size={9.5}>
                        <Typography>Why do we I need to make this video?</Typography>
                    </Grid>
                </Grid>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>Complimentary Images</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px"}}>Upload some complimentary images to help give a face to your personality.</Typography>
                <Grid container size={12} justifyContent="center" >
                    <Button sx={{width:"130px",backgroundColor:"black", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"40px", display:"flex", justifyContent:"center", textTransform:"none",fontSize:"18px", fontFamily:"Segoe UI", fontWeight:"Regular", gap:"10px"}}>Upload
                        <img src="upload.png" />
                    </Button>
                </Grid>
                <NextBtn next="/available" />
            </Container>
        </Grid>
    );
}
 
export default Recording;