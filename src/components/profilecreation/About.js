import Grid from '@mui/material/Grid2';
import Progress from './Progress';
import { Container, TextField, Typography } from '@mui/material';
import Types from './Types';
import NextBtn from './NextBtn';

const About = () => {
    return (
        <Grid Container>
            <Grid>
                <Progress percent="40%"/>
            </Grid>
            <Container>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>About You</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px"}}>These details are about you and will be public to potential matches on meet me up.</Typography>
                <Grid container size={12} >
                    <Grid size={12}>
                        <TextField id="name" label="Full Name" variant="filled" size="small" color="#E4423F" sx={{width:"100%"}}/>
                    </Grid>
                    <Grid container size={12} spacing={2}>
                        <Grid size={6} sx={{marginTop:"10px"}}>
                            <TextField id="age" label="Age" variant="filled" size="small" />
                        </Grid>
                        <Grid size={6} sx={{marginTop:"10px"}}>
                            <TextField id="gender" label="Gender" variant="filled" size="small" />
                        </Grid>
                    </Grid>
                    <Grid size={12} sx={{marginTop:"10px"}}>
                        <TextField id="bio" label="Profile Bio" variant="filled" size="small" sx={{width:"100%"}} multiline rows={4}/>
                    </Grid>
                </Grid>
                <Typography sx={{fontSize:'18px', marginTop:"30px"}}>Location</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px"}}>Your location helps us pin point where you are to provide better matches to you.</Typography>
                <Grid size={12} sx={{marginTop:"10px"}}>
                    <TextField id="location" label="Location" variant="filled" size="small" sx={{width:"100%", marginTop:"10px", mb:"10px"}}/>
                </Grid>
                <Grid container sx={{backgroundColor:"#F2F2F2", borderRadius:"5px", height:"63px"}} alignItems="center">
                    <Grid size={1.5} container justifyContent="center">
                        <img src="question.png"></img>
                    </Grid>
                    <Grid size={9.5}>
                        <Typography>Why do we need your location?</Typography>
                    </Grid>
                </Grid>
                <hr style={{borderColor:"#CECECE", marginTop:"40px", marginBottom:"40px"}} />
                <Typography sx={{fontSize:"18px"}}>Your Sexuality ..</Typography>
                <Typography sx={{fontSize:"14px"}}>Select the fields that describe your sexuality</Typography>
                <Types />
                <Typography sx={{fontSize:"18px", marginTop:"30px"}}>Open To ..</Typography>
                <Typography sx={{fontSize:"14px", lineHeight:"15px"}}>Select the fields that describe what you are open to in a partner</Typography>
                <Types />
                <Grid container sx={{backgroundColor:"#F2F2F2", borderRadius:"5px", height:"50px", marginTop:"40px", height:"63px"}} alignItems="center">
                    <Grid size={1.5} container justifyContent="center">
                        <img src="question.png"></img>
                    </Grid>
                    <Grid size={9.5}>
                        <Typography>Why do we need this information?</Typography>
                    </Grid>
                </Grid>
                <NextBtn next="/interests" />
            </Container>
        </Grid>
    );
}
 
export default About;