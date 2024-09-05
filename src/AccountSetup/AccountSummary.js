import { Button, Container, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Type from "../Assets/Components/Type";
import AccountInfo from "../Assets/Components/AccountInfo"; 
import { Link } from 'react-router-dom';
import NextBtn from "../Assets/Components/NextBtn";
// victors code
// TODO: add props to pass as an object for the specifics
    // specific object
const Profile = () => {
    // const gender = {specifics.gender}
    // const height = {specifics.height}


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
            <Grid size={12}>
                <Typography sx={{fontSize:"30px"}}>About You</Typography>
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
            <Grid container size={12} justifyContent="center" >
                <Button sx={{width:"130px",backgroundColor:"black", borderRadius:"25px", height:"45px", color:"white", display:"flex", justifyContent:"center", textTransform:"none",fontSize:"18px", fontFamily:"Segoe UI", fontWeight:"Regular", gap:"10px"}}>Upload
                    <img src="upload.png" />
                </Button>
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
                    <Typography sx={{fontSize:"18px"}}>A Little About Me ...</Typography>
                </Grid>
                <Grid size={12} sx={{mb:"20px"}}>
                    <Grid>
                        <Typography sx={{fontSize:"14px"}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                            sed diam nonumy eirmod tempor invidunt ut. <br /><br />
                            Consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut.</Typography>
                    </Grid>
                </Grid>
                <AccountInfo img="height.png" info={height} />
                <AccountInfo img="gender.png" info={gender} />
                <AccountInfo img="faith.png" info={religion} />
                <AccountInfo img="star.png" info={sign} />
                <AccountInfo img="multi.png" info={status} />
                <AccountInfo img="hat.png" info={education} />
                <AccountInfo img="heart.png" info={heart} />
                <AccountInfo img="job.png" info={job} />
                <AccountInfo img="drink.png" info={drink} />
                <AccountInfo img="smoke.png" info={smoke} />
                <AccountInfo img="flag.png" info={flag} />
                <hr style={{width:"100%", marginTop:"30px"}} />
                <Grid container size={12} gap={.5} sx={{marginTop:"40px", mb:"50px"}}>
                    <Grid size={5}>
                        <Link to={'/accountSetup4Create'}>
                            <Button 
                            sx={{width:"130px",backgroundColor:"black", borderRadius:"25px", height:"45px", color:"white", display:"flex", justifyContent:"center", textTransform:"none",fontSize:"18px", fontWeight:"Regular", textWrap:"none", width:"160px"}}>Update Profile
                            </Button>
                        </Link>
                    </Grid>
                    <Grid size={1.5} sx={{backgroundColor:"#CECECE", borderRadius:"25px", marginLeft:"10px", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)", }} container justifyContent="center" alignItems="center">
                        <Link to={'/settings'}>
                            <IconButton>
                                <img src="setting.png"></img>
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid size={1.5} sx={{backgroundColor:"#CECECE", borderRadius:"25px", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)"}} container justifyContent="center" alignItems="center">
                        <img src="card.png"></img>
                    </Grid>
                    <Grid size={1.5} sx={{backgroundColor:"#CECECE", borderRadius:"25px", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)"}} container justifyContent="center" alignItems="center">
                        <img src="diamond.png"></img>
                    </Grid>
                    <Grid size={1.5} sx={{backgroundColor:"#CECECE", borderRadius:"25px", boxShadow:"2px 5px 5px 2px rgba(0,0,0,.1)"}} container justifyContent="center" alignItems="center">
                        <img src="time.png"></img>
                    </Grid>
                <NextBtn next={'/matching1PreferencesPage'}></NextBtn>
            </Grid>
            </Container>
        </Grid>
    );
}
 
export default Profile;