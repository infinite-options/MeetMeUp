import Grid  from "@mui/material/Grid2";
import Progress from "../Assets/Components/Progress";
import { Box, Button, Grid2, Container, Typography } from "@mui/material";
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
        dates: [],
    });

    const dates = [
        'Lunch',
        'Dinner',
        'Coffee',
        'Movies',
        'Surprise Me',
    ]

    const handleButtonBoolean = (date, selected) => {
        setFormData({
            ...formData,
            [date]: selected
        });

        if(date in formData['dates']) {
            formData['dates'].push(date);
        }
        else {
            const index = formData['dates'].indexOf(date);
            formData['dates'].splice(index, 1);
        }
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };

    return (
        <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
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
                                <Dates date="Lunch" id="lunch" handleButtonBoolean={handleButtonBoolean} formData={formData}/>
                            </Grid>
                            <Grid >
                                <Dates date="Dinner" id="dinner" handleButtonBoolean={handleButtonBoolean} formData={formData}/>
                            </Grid>
                            <Grid >
                                <Dates date="Coffee" id="coffee" handleButtonBoolean={handleButtonBoolean} formData={formData}/>
                            </Grid>
                            <Grid >
                                <Dates date="Movies" id="movies" handleButtonBoolean={handleButtonBoolean} formData={formData}/>
                            </Grid>
                            <Grid >
                                <Dates date="Surprise Me" id="supriseMe" handleButtonBoolean={handleButtonBoolean} formData={formData}/>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography sx={{fontSize:'18px', marginTop:"60px", fontFamily:"Lexend"}}>When Are You Available?</Typography>
                    <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px", fontFamily:"Lexend"}}>These availability slots are crucial to help you and potential matches make date faster.
                        <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                        <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                    </Typography>
                    <Grid container size={12} justifyContent="center" textAlign={"left"}>
                        {/* TODO: fix formatting to be directly on top of the select day */}
                        <Grid size={6}>
                            <Typography sx={{fontSize:"18px"}}>Day</Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography sx={{fontSize:"18px"}}>Times</Typography>
                        </Grid>
                        <DateAdd></DateAdd>
                    </Grid>
                    <NextButton next={'/location'}/>
                </Container>
            </Grid>
        </Box>
    );
}
 
export default AccountSetup6Available;