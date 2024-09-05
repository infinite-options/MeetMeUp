import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Info from "./Info";
import Type from "../Assets/Components/Type";

const ViewProfile = ({setIsFlipped}) => {
    const name="Lachlan Collis"
    const age="21"
    const gender="Male"
    const where="Brisbane"
    const height="170cm Tall"
    const religion="Atheist"
    const sign="Cancer"
    const status="None Currently"
    const education="Associates Degree in UI & UX design"
    const heart="Plus Size"
    const job="UI + UX Designer"
    const drink="Socially"
    const smoke="I Dont Smoke"
    const flag="Australian"
    return (
        <Grid container sx={{maxWidth:"414px", margin:"0 auto"}}>
            <Grid size={4} container justifyContent="flex-end" alignItems="center">
                <img src="profile.png"></img>
            </Grid>
            <Grid size={4} container justifyContent="center" alignItems="center">
                <img src="search.png"></img>
            </Grid>
            <Grid size={4} container justifyContent="flex-start" alignItems="center">
                <img src="group.png"></img>
            </Grid>

            <Grid size={6}>
                <Grid size={12}>
                    <img src="img1.png"></img>
                </Grid>
                <Grid size={12}>
                    <img src="img3.png"></img>
                </Grid>
            </Grid>
            <Grid size={6}>
                <Grid size={12}>
                    <img src="img2.png"></img>
                </Grid>
            </Grid>
            <Grid size={12} container justifyContent="center">
                <Typography sx={{fontFamily:"Lexend", fontSize:"30px"}}>{name}</Typography>
            </Grid>
            <Grid size={12} container justifyContent="center" sx={{mb:"20px"}}>
                <Typography sx={{fontSize:"20px"}}>{age}-{gender}-{where}</Typography>
            </Grid>
            <Container>
                <Grid size={12}>
                    <Typography sx={{fontSize:'18px'}}>Interests</Typography>
                </Grid>
                <Grid container size={12}>
                    <Grid size={4}>
                        <Type type="Cooking"/>
                    </Grid>
                    <Grid size={4}>
                        <Type type="Eating Out" />
                    </Grid>
                    <Grid size={4}>
                        <Type type="Bike Rides" />
                    </Grid>
                    <Grid size={4}>
                        <Type type="Travelling" />
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <Typography sx={{fontSize:"18px"}}> ...</Typography>
                </Grid>
                <Grid size={12} sx={{mb:"20px"}}>
                    <Grid>
                        <Typography sx={{fontSize:"14px"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                            sed diam nonumy eirmod tempor invidunt ut. <br /><br />
                            Consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut.</Typography>
                    </Grid>
                </Grid>
                <Info img="height.png" info={height} />
                <Info img="gender.png" info={gender} />
                <Info img="faith.png" info={religion} />
                <Info img="star.png" info={sign} />
                <Info img="multi.png" info={status} />
                <Info img="hat.png" info={education} />
                <Info img="heart.png" info={heart} />
                <Info img="job.png" info={job} />
                <Info img="drink.png" info={drink} />
                <Info img="smoke.png" info={smoke} />
                <Info img="flag.png" info={flag} />
                <hr style={{width:"100%", marginTop:"30px"}} />
                <Grid container size={12} gap={.5} sx={{marginTop:"20px", mb:"20px"}}>
                    <Grid size={12} container justifyContent="center">
                        <Typography sx={{fontSize:"18px", fontFamily:"Lexend", marginTop:"10px"}} onClick={()=>{setIsFlipped(false)}}>Tap To See Video</Typography>
                    </Grid>
            </Grid>
            </Container>
        </Grid>
    );
}
 
export default ViewProfile;