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
        dates: [],
    });

    const dates = [
        'Lunch',
        'Dinner',
        'Coffee',
        'Movies',
        'Surprise Me',
    ]
    const [times, setTimes] = useState([]);

    const handleAddTime = (Day, start_time, end_time) => {
        setTimes((prevTimes) => [...prevTimes, { Day, start_time, end_time }]);
    };

    const handleRemoveTime = (index) => {
        setTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
    };
    const handleButton = (id, type) => {
        if(formData[type].includes(id)) {
            const index = formData[type].indexOf(id);
            formData[type].splice(index, 1);
        }
        else {
            formData[type].push(id);
        }

        console.log(formData[type]);
    };

    const handleNext = async () => {
        console.log(formData);

        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        let fd = new FormData();
        console.log('user_uid local: ', localStorage.getItem('user_uid'));
        fd.append("user_uid", localStorage.getItem('user_uid'));
        fd.append("user_email_id", localStorage.getItem('user_email_id'));
        const dateType = formData['dates'];
        const typeString = dateType.join(', ');

        console.log('typeString: ', typeString);
        fd.append("user_date_interests", typeString);   
        console.log('times: ', times)
        // fd.append("user_available_time", times);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });
            if(response.ok) {
                const result = await response.json();
                console.log(result.data);
            }
            else {
                console.error('Response Err:', response.statusText);
            }
        } catch (err) {
            console.log("Try Catch Err:", err);
        }
        // console.log('dateType: ', dateType);
        // times.forEach((time) => {
        //     const value = {
        //         Day: time.Day,
        //         start_time: time.start_time,
        //         end_time: time.end_time,
        //     }
        //     console.log('value: ', value)
        // })
    };

    console.log('times: ', times);

    return (
        <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
            <Progress percent="100%" prev="/accountSetup7Summary" />

            <Grid container sx={{margin: "0 auto", width: '100% '}}>
                <Grid size={12}>
                </Grid>
                    <form onSubmit={handleNext} action='/accountSetup5Create'>
                        <Typography sx={{fontSize:"18px", fontFamily:"Lexend"}}>What Types of Dates Interest You?</Typography>
                        <Typography sx={{fontSize:"14px", fontFamily:"Lexend"}}>Select any activities you would be open</Typography>
                        <Grid container spacing={1}>
                            {dates.map((date) => 
                                <Grid>
                                    <Dates id={date} handleButton={handleButton} array={formData['dates']} type={'dates'}/>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                <Box sx={{marginTop: '10px', width:' 100%'}}>
                    <Typography sx={{fontSize:'18px', fontFamily:"Lexend"}}>When Are You Available?</Typography>
                    <Typography sx={{fontSize:'14px', lineHeight:"15px", mb:"10px", fontFamily:"Lexend"}}>These availability slots are crucial to help you and potential matches make date faster.
                        <br /><br />These slots will directly correspond to other users slots, and will allow you both to plan a date within time frames that you both are available for.
                        <br /><br />If you leave the below section blank, meet me up will assume you are always available.
                    </Typography>
                    <Grid container size={12} justifyContent="center" textAlign={"left"}>
                        {/* TODO: fix formatting to be directly on top of the select day */}
                        <Grid size={6}>
                            <Typography sx={{fontSize:"18px", display: 'flex', justifyContent: 'center'}}>Day</Typography>
                        </Grid>
                        <Grid size={6} justifyContent={'center'}>
                            <Typography sx={{fontSize:"18px", display: 'flex', justifyContent: 'center'}}>Times</Typography>
                        </Grid>
                        <Grid size={12} container justifyContent={'center'}>
                            <DateAdd onAddTime={handleAddTime}
                            onRemoveTime={handleRemoveTime}
                            times={times}></DateAdd>
                        </Grid>
                    </Grid>
                </Box>
                <NextButton onClick={handleNext} next={'/location'}/>

            </Grid>
        </Box>
    );
}
 
export default AccountSetup6Available;