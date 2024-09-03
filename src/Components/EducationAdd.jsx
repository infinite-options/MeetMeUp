import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
    backgroundColor: 'black',
    color: '#fff',
    display: 'block', 
    // '&:hover': {
    //   backgroundColor: 'rgba(200, 60, 60, 1)', 
    // },
    marginTop: '8px',
});
function EducationAdd() {
  const [fields, setFields] = useState(['']); 

  const handleAddField = () => {
    setFields([...fields, '']); 
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index)); 
  };

  // Handle updating a specific text field
  const handleFieldChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    }}>
      {/* <h3>Dynamic Text Fields</h3> */}
      <Box>
        {/* <TextField
                label={`Education Field 1`}
                type="text"
                // value={field}
                onChange={(e) => handleFieldChange(1, e.target.value)}
            /> */}
        {fields.map((field, index) => (
            <div key={index}>
            <Box key={index}
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
                padding: 0.2 // Padding around each text field
            }}>

            <TextField
                label={`Education Field ${index}`}
                type="text"
                value={field}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                fullwidth
            />
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
            </div>
        ))}
        
      </Box>
      
      <CustomButton onClick={handleAddField}>
            Add
        </CustomButton>
      
    </Box>
  );
}

export default EducationAdd;