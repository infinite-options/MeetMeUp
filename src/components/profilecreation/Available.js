import Grid  from "@mui/material/Grid2";
import Progress from "./Progress";
import { Button, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import NextBtn from "./NextBtn";
import Dates from "./Dates";
import { useState } from "react";
import DisplayTime from "./DisplayTime";

const Available = () => {
    const [day, setDay] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [times, setTimes] = useState([]);

    const handleAddTime=()=> {
        setTimes([...times, {day, start, end}]);
    }

    const handleChange=(event)=> {
        setDay(event.target.value)
    }
    const handleStart=(event)=> {
        setStart(event.target.value)
    }
    const handleEnd=(event)=> {
        setEnd(event.target.value)
    }

    return (  
        <Grid container sx={{maxWidth:"414px", margin:"0 auto"}}>
            <Grid size={12}>
                <Progress percent="100%" prev="/recording" />
            </Grid>
            <Container>
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
                <Typography sx={{fontSize:'18px', marginTop:"10px", fontFamily:"Lexend"}}>When Are You Available?</Typography>
                <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px", fontFamily:"Lexend"}}>These availability slots are crucial to help you and potential matches make date faster.
                    <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                    <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                </Typography>
                <Grid container justifyContent="center">
                    <Grid size={4}>
                        <Typography sx={{fontSize:"18px"}}>Day</Typography>
                    </Grid>
                    <Grid size={8} container justifyContent="flex-start">
                        <Typography sx={{fontSize:"18px"}}>Times</Typography>
                    </Grid>
                </Grid>
                {times.map((time, index) => (
                    <DisplayTime
                        key={index}
                        day={time.day}
                        start={time.start}
                        end={time.end}
                    />
                    ))}
                <Grid container size={12} justifyContent="center" >
                    <Button sx={{width:"80px",backgroundColor:"black", borderRadius:"25px", height:"45px", color:"white", marginTop:"40px", mb:"40px", textTransform:"none", fontFamily:"Segoe UI", fontSize:"18px", fontWeight:"regular"}} onClick={handleAddTime}>Add</Button>
                </Grid>
                <Grid size={12} container justifyContent="center">
                    <Grid size={1.5}>
                        <hr />
                    </Grid>
                </Grid>
                <Grid container size={12}>
                    <Grid size={4}> 
                        <FormControl fullWidth>
                            <InputLabel sx={{color:"black"}}>Select Day</InputLabel>
                            <Select 
                                label="Select Day"
                                value={day}
                                onChange={handleChange}
                                sx={{fontSize:"14px"}}
                                >
                                <MenuItem value={"Sunday"}>Sunday</MenuItem>
                                <MenuItem value={"Monday"}>Monday</MenuItem>
                                <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                                <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                                <MenuItem value={"Thursday"}>Thursday</MenuItem>
                                <MenuItem value={"Friday"}>Friday</MenuItem>
                                <MenuItem value={"Saturday"}>Saturday</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            label="Start Time"
                            variant="outlined"
                            value={start}
                            onChange={handleStart}
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            label="End Time"
                            variant="outlined"
                            value={end}
                            onChange={handleEnd}
                        />
                    </Grid>
                </Grid>
                <NextBtn />
            </Container>
        </Grid>
    );
}
 
export default Available;