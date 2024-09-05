import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

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
  const [fields, setFields] = useState(['']); 

  const handleAddField = () => {
    setFields([...fields, '']); 
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index)); 
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };
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
    {fields.map((field, index) => (
        <Box key={index}
        sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 1,
            padding: 0.2 
        }}>
        <TextField
            label={`Date Field ${index}`}
            type="date"
            name="date"
            // onChange={handleChange}
            
            InputLabelProps={{
                shrink: true,
            }}
        />

        <TextField id="time" type="time" inputProps={inputProps} />
        <TextField id="time" type="time" inputProps={inputProps} />

        <IconButton
            onClick={() => handleRemoveField(index)}
            style={{
                backgroundColor: 'rgba(228, 66, 63, 1)', 
                color: 'white',
                borderRadius: '50%', 
                padding: '8px', 
            }}
            >
            <RemoveIcon></RemoveIcon>
        </IconButton>
        </Box>
    ))}
        
      
      <CustomButton onClick={handleAddField}>
        Add
    </CustomButton>
      
    </Box>
  );
}

export default DateAdd;