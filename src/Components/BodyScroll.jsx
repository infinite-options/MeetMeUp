import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Container } from '@mui/material';

const BodyScroll = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  return (
    <Container>

    <Box
      sx={{
        height: 200, 
        width: '100%', // Take up full width of the parent
        overflowY: 'scroll',
        border: '1px solid #ddd',
        padding: 2,
      }}
    >
      <List>
        {options.map((option, index) => (
          <React.Fragment key={option}>
            <ListItem
              button
              selected={selectedOption === option}
              onClick={() => handleSelect(option)}
              sx={{
                bgcolor: selectedOption === option ? 'lightgray' : 'inherit', // Light color for selected item
                '&:hover': {
                  bgcolor: 'lightgray', // Hover color
                },
              }}
            >
              <ListItemButton>
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
            {index < options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
    </Container>

  );
};

export default BodyScroll;