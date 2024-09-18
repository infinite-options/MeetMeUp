import { Typography, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import DisplayTime from './DisplayTime';
import checkIcon from "../Images/addcheck.png"
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import TimePicker from 'react-time-picker';
import dayjs from 'dayjs';

// import Grid  from "@mui/material/Grid2";

const CustomButton = styled(Button)({
    backgroundColor: 'black',
    color: '#fff',
    display: 'block', 
    padding: '10px',
    maxWidth: '202px',
    borderRadius: '41px',
    marginTop: '20px',
    boxShadow: 'none',
    marginTop: '8px',
    minWidth: '130px',
    textTransform: 'capitalize',

});
function DateAdd({ onAddTime, onRemoveTime, times }) {
  const [day, setDay] = useState("")
  const [start, setStart] = useState(dayjs())
  // const [end, setEnd] = useState("")
  const [end, setEnd] = useState(dayjs());
  const [endTimeString, setEndTimeString] = useState('');
  const [startTimeString, setStartTimeString] = useState('');
  console.log('times: ', times);
  // const [times, setTimes] = useState([]);
  
  // const handleRemoveTimes = (index) => {
  //   console.log(index)
  //   setTimes(times.filter((_, i) => i !== index)); 
  // };
  // const handleAddTime=()=> {
  //   setTimes([...times, {day, start, end}]);
  // }

  const handleAddTime = () => {
      if (day && startTimeString && endTimeString) {
        onAddTime(day, startTimeString, endTimeString);
        setDay("");
        setStart(dayjs());
        setEnd(dayjs());
      }
  };

  const handleChange=(event)=> {
      setDay(event.target.value)
  }
  const handleStart=(newValue)=> {
      setStart(newValue);
      const formattedTime = newValue.format('hh:mm A');
      setStartTimeString(formattedTime);
      console.log('Formatted Time:', formattedTime); 
  }
  const handleEnd=(newValue)=> {
      setEnd(newValue);
      const formattedTime = newValue.format('hh:mm A');
      setEndTimeString(formattedTime);
      console.log('Formatted Time:', formattedTime); 
  }
  const inputProps = {
    step: 300,
  };
  return (
    <div>
      {times.map((time, index) => (
          <DisplayTime
              index={index}
              day={time.day}
              start={time.start_time}
              end={time.end_time}
              key={index}
              // end={time.end ? dayjs(time.end).format('HH:mm') : 'No end time'}
              onClick={onRemoveTime}
          />
          ))}
        <Grid container size={12} justifyContent="center" gap={1} sx={{ marginTop: 5, }}>
          <Grid size={4}> 
              <FormControl fullWidth>
                  <InputLabel sx={{color:"black", fontFamily:"Lexend", fontSize:"12px"}}>Select Day</InputLabel>
                  <Select 
                      label="Select Day"
                      value={day}
                      onChange={handleChange}
                      sx={{fontSize:"12px", height:"50px", fontFamily:"Lexend"}}
                      >
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Sunday"}>Sunday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Monday"}>Monday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Tuesday"}>Tuesday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Wednesday"}>Wednesday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Thursday"}>Thursday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Friday"}>Friday</MenuItem>
                      <MenuItem sx={{fontSize:"12px" ,fontFamily:"Lexend"}} value={"Saturday"}>Saturday</MenuItem>
                  </Select>
              </FormControl>
          </Grid>
          <Grid size={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ width: '100%' }}>
                  <TimePicker
                    // value={start}
                    onChange={handleStart}
                    label="Start Time" 
                    sx={{
                      backgroundColor:"#CECECE",
                      '& .MuiInputBase-root': {
                        fontFamily:"Lexend",
                        fontSize:"12px"
                      },
                      '& .MuiFormLabel-root': {
                         fontFamily:"Lexend",
                         fontSize:"13px",
                         color:"black"
                      },
                    }}
                    />
              </Box>
              </LocalizationProvider>
          </Grid>
          <Grid size={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%' }}>
                <TimePicker
                  // value={end}
                  onChange={handleEnd}
                  label="End Time"
                  sx={{
                      backgroundColor:"#CECECE",
                      '& .MuiInputBase-root': {
                        fontFamily:"Lexend",
                        fontSize:"12px"
                      },
                      '& .MuiFormLabel-root': {
                         fontFamily:"Lexend",
                         fontSize:"13px",
                         color:"black"
                      },
                    }} />
            </Box>
          </LocalizationProvider>
          </Grid>
          
              
          
          
          <Grid size={1} container alignItems="center" >
            <IconButton>
              <img src={checkIcon} onClick={handleAddTime} />

            </IconButton>
          </Grid>
      </Grid>

        
     

      
    </div>
  );
}

export default DateAdd;