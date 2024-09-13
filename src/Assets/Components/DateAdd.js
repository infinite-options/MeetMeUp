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
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  // const [times, setTimes] = useState([]);
  
  // const handleRemoveTimes = (index) => {
  //   console.log(index)
  //   setTimes(times.filter((_, i) => i !== index)); 
  // };
  // const handleAddTime=()=> {
  //   setTimes([...times, {day, start, end}]);
  // }

  const handleAddTime = () => {
    onAddTime(day, start, end);
    setDay("");
    setStart("");
    setEnd("");
  };

  const handleTimeEndChange = (e) => {
    setEnd(e.target.value);
  };


  const handleChange=(event)=> {
      setDay(event.target.value)
  }
  const handleStart=(event)=> {
      setStart(event.target.value)
  }
  const handleEnd=(event)=> {
      setEnd(event.target.value)
  }
  const inputProps = {
    step: 300,
  };
  return (
    <div>
      {times.map((time, index) => (
          <DisplayTime
              index={index}
              day={time.Day}
              start={time.start_time}
              end={time.end_time}
              key={index}
              // end={time.end ? dayjs(time.end).format('HH:mm') : 'No end time'}
              onClick={onRemoveTime}
          />
          ))}
        <Grid container size={12} justifyContent="center" gap={1} sx={{ marginTop: 5 }}>
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
              <TextField
                  label="Start Time"
                  variant="outlined"
                  value={start}
                  onChange={handleStart}
                  sx={{
                    backgroundColor:"#CECECE",
                    '& .MuiInputBase-root': {
                      height: '50px', 
                    },
                    '& .MuiInputBase-input': {
                       fontFamily:"Lexend"
                    },
                    '& .MuiFormLabel-root': {
                       fontFamily:"Lexend",
                       fontSize:"13px",
                       color:"black"
                    },
                  }}
              />
          </Grid>
          <Grid size={3}>
              <TextField
                  label="End Time"
                  variant="outlined"
                  value={end}
                  onChange={handleEnd}
                  sx={{
                    backgroundColor:"#CECECE",
                    '& .MuiInputBase-root': {
                      height: '50px', 
                      fontFamily:"Lexend",
                    },
                    '& .MuiInputBase-input': {
                       fontFamily:"Lexend",
                    },
                    '& .MuiFormLabel-root': {
                       fontFamily:"Lexend",
                       fontSize:"13px",
                       color:"black"
                    },
                  }}
                  
              />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  value={end}
                  onChange={handleTimeEndChange}
                  label="Basic time picker" />
              </DemoContainer>
            </LocalizationProvider> */}

          </Grid>
          <Grid size={1} container alignItems="center" >
            <img src={checkIcon} onClick={handleAddTime} />
          </Grid>
      </Grid>

        
     

      
    </div>
  );
}

export default DateAdd;