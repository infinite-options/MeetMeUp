import Grid  from "@mui/material/Grid2";
import Progress from "../Assets/Components/Progress";
import { Button, Container, Typography } from "@mui/material";
import NextButton from "../Assets/Components/NextButton";
import DateAdd from "../Assets/Components/DateAdd";
import { useState } from "react";
import Dates from "../Assets/Components/Dates";

// victors code
const AccountSetup6Available = () => {
    const [formData, setFormData] = useState({
        lunch: false,
        dinner: false,
        coffee: false,
        movies: false,
        supriseMe: false,
    });
    const handleButtonBoolean = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: !formData[name]
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };
    return (  
        <Grid container sx={{margin: "0 auto" }}>
            <Grid size={12}>
                <Progress percent="100%" prev="/accountSetup7Summary" />
            </Grid>
            <Container>
                <form onSubmit={handleNext} action='/accountSetup5Create'>
                    <Typography sx={{fontSize:"18px", fontFamily:"Lexend"}}>What Types of Dates Interest You?</Typography>
                    <Typography sx={{fontSize:"14px", fontFamily:"Lexend"}}>Select any activities you would be open</Typography>
                    <Grid container spacing={1}>
                        <Grid >
                            <Dates date="Lunch" />
                        </Grid>
                        <Grid >
                            <Dates date="Dinner" />
                        </Grid>
                        <Grid >
                            <Dates date="Coffee" />
                        </Grid>
                        <Grid >
                            <Dates date="Movies" />
                        </Grid>
                        <Grid >
                            <Dates date="Surprise Me" />
                        </Grid>
                    </Grid>
                </form>
                <Typography sx={{fontSize:'18px', marginTop:"60px", fontFamily:"Lexend"}}>When Are You Available?</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px", fontFamily:"Lexend"}}>These availability slots are crucial to help you and potential matches make date faster.
                    <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                    <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                </Typography>
                    
                <Grid container size={12} justifyContent="center" alignItems="center" >
                    {/* <Grid size={4}>
                        <Typography sx={{fontSize:"18px"}}>Day</Typography>
                    </Grid>
                    <Grid size={8} container justifyContent="flex-start">
                        <Typography sx={{fontSize:"18px"}}>Times</Typography>
                    </Grid> */}
                    <DateAdd></DateAdd>
                    
                </Grid>
                <NextButton next={'/location'}/>
            </Container>
        </Grid>
    );
}
 
export default AccountSetup6Available;