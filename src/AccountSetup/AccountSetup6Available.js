import Grid  from "@mui/material/Grid2";
import Progress from "../Assets/Components/Progress";
import { Box, Button, Grid2, Container, Typography } from "@mui/material";
import NextButton from "../Assets/Components/NextButton";
import DateAdd from "../Assets/Components/DateAdd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dates from "../Assets/Components/Dates";
import axios from "axios";
// victors code
const AccountSetup6Available = () => {
    const [formData, setFormData] = useState({
        dates: [],
    });
    const userId = localStorage.getItem('user_uid');
    const [loading, setLoading] = useState(true); 
    const [userData, setUserData] = useState({});
    const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT
    const navigate = useNavigate(); 
    const dates = [
        'Lunch',
        'Dinner',
        'Coffee',
        'Movies',
        'Surprise Me',
    ]
    const [times, setTimes] = useState([]);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleAddTime = (day, start_time, end_time) => {
        console.log('day: ', day);
        console.log('start_time: ', )
        if (times) {
            setTimes((prevTimes) => {
                const updatedTimes = [...prevTimes, { day, start_time, end_time }];
                updatedTimes.sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day));
                return updatedTimes;
            });
            // setTimes((prevTimes) => [...prevTimes, { day, "start_time": start_time, "end_time": end_time }]);
        } else {
            setTimes([{ day, "start_time": start_time, "end_time": end_time }]);
        }
    };

    console.log('times (formatted): ', times);

    const handleRemoveTime = (index) => {
        setTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
    };
    const handleButton = (id, type) => {
        if(formData[type].includes(id)) {
            const index = formData[type].indexOf(id);
            formData[type].splice(index, 1);
        }
        else {
            console.log('id: ', id);
            formData[type].push(id);
        }

        console.log(formData[type]);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
                const fetchedData = response.data.result[0];
                if (!fetchedData) {
                    setLoading(false);
                }
                setUserData(fetchedData);
                console.log('userData: ', userData)
                setLoading(false);
                // const openToArray = fetchedData.user_open_to ? fetchedData.user_open_to.split(',') : [];
                const datesArray = fetchedData.user_date_interests ? fetchedData.user_date_interests.split(',') : [];
                console.log('datesArray: ', datesArray);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    dates: datesArray
                }));

                const newTimes = JSON.parse(fetchedData.user_available_time)

                setTimes(newTimes);

                } catch (error) {
                    console.log("Error fetching data", error);
                };
        }
        if (userId) {
            fetchUserData();
        } else {
            setLoading(false);
            setNoId(true);
        }
      }, [userId]);

    // call a get after the submission is properly imported


    const handleNext = async () => {
        console.log(formData);

        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        let fd = new FormData();
        console.log('user_uid local: ', localStorage.getItem('user_uid'));
        fd.append("user_uid", localStorage.getItem('user_uid'));
        fd.append("user_email_id", localStorage.getItem('user_email_id'));
        const dateType = formData['dates'];
        console.log('dateType: ', dateType);
        const typeString = dateType.join(', ');
        const timeString = JSON.stringify(times);
        const checkData = '[{"day": "Friday", "start_time": "11:15 AM", "end_time": "11:15 AM"},{"day": "Thursday", "start_time": "05:27 AM", "end_time": "05:24 AM"}]'
        console.log('typeString: ', typeString);
        fd.append("user_date_interests", dateType);   
        console.log('times (handleNext): ', times)
        fd.append("user_available_time", timeString);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });
            if(response.ok) {
                const result = await response.json();
                console.log(result.data);
                console.log(result);
            }
            else {
                console.error('Response Err:', response.statusText);
            }
        } catch (err) {
            console.log("Try Catch Err:", err);
        }
    };
    if (loading) {
        return <div>Loading specifics</div>; 
    }
    if (noId) {
        navigate('/accountSetup1Login');
        // return <div>No User Found</div>;
    }

    return (
        <Box sx={{ marginLeft: {xs: '5%',sm: '15%'}, marginRight: { xs: '5%',sm: '15%'}}}>
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
                        
                    </Grid>

                    <Grid size={12} container justifyContent={'center'}>
                            <DateAdd onAddTime={handleAddTime}
                            onRemoveTime={handleRemoveTime}
                            times={times}></DateAdd>
                        </Grid>
                </Box>
                <NextButton onClick={handleNext} next={'/location'}/>

            </Grid>
        </Box>
    );
}
 
export default AccountSetup6Available;