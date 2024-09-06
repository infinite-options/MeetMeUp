import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';
import DisplayTime from './DisplayTime';

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
function DateAdd() {
  const [day, setDay] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [times, setTimes] = useState([]);

  const handleRemoveTimes = (index) => {
    console.log(index)
    setTimes(times.filter((_, i) => i !== index)); 
  };


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
  const inputProps = {
    step: 300,
  };
  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    }}>
      {times.map((time, index) => (
                    <DisplayTime
                        index={index}
                        day={time.day}
                        start={time.start}
                        end={time.end}
                        onClick={handleRemoveTimes}
                    />
                    ))}

      <CustomButton onClick={handleAddTime}>
        Add
    </CustomButton>
        {/* // NOTE: whoever works on this make into listitem 
        // with list icons from MUI so it formats nicer */}
        <Grid size={12} container justifyContent="center">
          <Grid size={1.5}>
              <hr />
          </Grid>
      </Grid>
        <Grid container size={12} justifyContent="center" gap={1}>
          <Grid size={4}> 
              <FormControl fullWidth>
                  <InputLabel sx={{color:"black"}}>Select Day</InputLabel>
                  <Select 
                      label="Select Day"
                      value={day}
                      onChange={handleChange}
                      sx={{fontSize:"14px", height:"50px"}}
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
          <Grid size={3.5}>
              <TextField
                  label="Start Time"
                  variant="outlined"
                  value={start}
                  onChange={handleStart}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '50px', 
                    },
                  }}
              />
          </Grid>
          <Grid size={3.5}>
              <TextField
                  label="End Time"
                  variant="outlined"
                  value={end}
                  onChange={handleEnd}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '50px', 
                    },
                  }}
              />
          </Grid>
      </Grid>

        
     

      
    </Box>
  );
}

export default DateAdd;