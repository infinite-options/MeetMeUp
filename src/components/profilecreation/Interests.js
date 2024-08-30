import Grid from "@mui/material/Grid2";
import Progress from "./Progress";
import { Container, Typography } from "@mui/material";
import InterestTypes from "./InterestTypes";
import Specifics from "./Specifics";
import NextBtn from "./NextBtn";

const Interests = () => {
    return (
        <Grid container>
            <Grid size={12}>
                <Progress percent="60%" prev="/about" />
            </Grid>
            <Container>
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>Your General Interests</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px"}}>These interests help match you to better people on meet me up. Select or add as many interests as you want.</Typography>
                <InterestTypes />
                <Typography sx={{fontSize:'18px', marginTop:"10px"}}>Some Specifics</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"20px"}}>These help give a better insight into who you are and will allow matches to better understand you as a person.</Typography>
                <Specifics info="Height" />
                <Specifics info="Education" />
                <Specifics info="Body Composition" />
                <Specifics info="Star Sign" />
                <Specifics info="Drinking" />
                <Specifics info="Smoking" />
                <Specifics info="Kids" />
                <Specifics info="Current Job" />
                <Specifics info="Religion" />
                <Specifics info="Gender Identification" />
                <Specifics info="Nationality" />
                <Grid container sx={{backgroundColor:"#F2F2F2", borderRadius:"5px", height:"50px", marginTop:"40px", height:"63px"}} alignItems="center">
                    <Grid size={1.5} container justifyContent="center">
                        <img src="question.png"></img>
                    </Grid>
                    <Grid size={9.5}>
                        <Typography>That's a lot of information...</Typography>
                    </Grid>
                </Grid>
                <NextBtn next="/recording" />
            </Container>
        </Grid>
    );
}
 
export default Interests;