import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import EducationAdd from './EducationAdd';
import BodyScroll from './BodyScroll';
import { TextField } from '@mui/material';

const drawerBleeding = 56;
const CustomRedButton = styled(Button)({
    backgroundColor: 'rgba(228, 66, 63, 1)',
    color: '#fff',
    display: 'block', 
    // '&:hover': {
    //   backgroundColor: 'rgba(200, 60, 60, 1)', 
    // },
    marginTop: '8px',
});
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

function DrawerOptions() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [option, setOption] = React.useState('education');

  // This is used only for the example

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
         anchor="bottom"
         open={open}
         onClose={toggleDrawer(false)}
         onOpen={toggleDrawer(true)}
         swipeAreaWidth={drawerBleeding}
         disableSwipeToOpen={false}
         ModalProps={{
           keepMounted: true,
         }}
         PaperProps={{
           sx: {
             height: 'auto',
             display: 'flex',
             flexDirection: 'column',
           },
         }}
      >
        
        {option=='education' && (
            <div>
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Your Education</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>List all of the educational achievements you are proud of below.</Typography>
                <Box 
                mt={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center the content horizontally
                }}>
                <EducationAdd></EducationAdd>
                <CustomRedButton onClick={() => {
                    setOption('body');
                }}>Complete</CustomRedButton>
                </Box>
            </div>
            )}
        {option=='body' && ( 
            <div>
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Your Body Composition</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>This helps us match you to a similar lifestyle.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <BodyScroll options={[
                    'Slim',
                    'Athlete',
                    'Curvy',
                    'Plus Size',
                    'Few Extra Pounds'
                ]}></BodyScroll>
                <CustomRedButton onClick={() => {
                    setOption('star')
                }}>Complete</CustomRedButton>
        </Box></div>)}

        {option=='star' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>What's Your Star Sign</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>Some of our users love to know what personality traits you have.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <BodyScroll options={[
                    'Leo',
                    'Virgo',
                    'Curvy',
                    'Libra',
                    'Scorpio'
                ]}></BodyScroll>
                <CustomRedButton onClick={() => {
                    setOption('drinking')
                }}>Complete</CustomRedButton>
        </Box></div>)}

        {option=='drinking' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Your Drinking Habits?</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>What are your current drinking habits? Please provide an accurate answer.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}>
                <BodyScroll options={[
                    "I don't drink",
                    'Socially',
                    'Casual Drinker',
                    'Regularly',
                ]}></BodyScroll>
                <CustomRedButton onClick={() => {
                    setOption('children')
                }}>Complete</CustomRedButton>
        </Box></div>)}
        {option=='children' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Do You Have Any Children</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>If you have any children please select an accurate amount.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <BodyScroll options={[
                    1,
                    2,
                    3,
                    4,
                ]}></BodyScroll>
                <CustomRedButton onClick={() => {
                    setOption('position')
                }}>Complete</CustomRedButton>
        </Box></div>)}
        {option=='position' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Your Current Position</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>What is your current line of work? Potentional matches love seeing what you get up in your day to day.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <TextField label={'Your Job'}></TextField>
                <CustomRedButton onClick={() => {
                    setOption('religion')
                }}>Add</CustomRedButton>
        </Box></div>)}
        {option=='religion' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Religion</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>If you follow any religions and religion is important to your relationship please tell us the faith you follow.</Typography>
            <Box 
                mt={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center the content horizontally
                }}>
                <TextField label={'Your Religion'}></TextField>
                <CustomRedButton onClick={() => {
                    setOption('gender')
                }}>Add</CustomRedButton>
        </Box></div>)}
        {option=='gender' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Gender Specific</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>To help potential matches understand who you are and how you identify, tell us your specific gender.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <TextField label={'Specific Gender'}></TextField>
                <CustomRedButton onClick={() => {
                    setOption('height')
                }}>Add</CustomRedButton>
        </Box></div>)}
        {option=='height' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>What's Your Height?</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>Some of our users like to match with people that are of similar stature.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center the content horizontally
            }}>
                <BodyScroll options={['170cm', '169cm', '168cm', '167cm', '166cm']}></BodyScroll>
                <CustomRedButton onClick={() => {
                    setOption('nationality')
                }}>Add</CustomRedButton>
        </Box></div>)}
        {option=='nationality' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Your Nationality</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.secondary' }}>To help potential matches understand who you are and how you identify, tell us your specific nationality.</Typography>
            <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}>
                <TextField label={'Nationality'}></TextField>
                <CustomRedButton onClick={() => {
                    setOption('security')
                }}>Add</CustomRedButton>
        </Box></div>)}
        {option=='security' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Our Security Standards</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('location')
                        }}>Done</CustomRedButton>
                    </Box>
            </div>)}
            {option=='location' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>What is Location For?</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('why')
                        }}>Done</CustomRedButton>
                    </Box>
            </div>)}
            {option=='why' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Why On Earth Do You Need This?</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('bio')
                        }}>Done</CustomRedButton>
                    </Box>
            </div>)}
            {option=='bio' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Building An Accurate Bio</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('profile')
                        }}>Done</CustomRedButton>
                    </Box>
            </div>)}
            {option=='profile' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Presenting An Accurate Profile</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('complete')
                        }}>Done</CustomRedButton>
                    </Box>
            </div>)}
            {option=='complete' && (<div>
            <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    >
                    <Puller /> 
                    {/* puller is necessary */}
                    <Typography sx={{ p: 2, color: 'text.primary' }}>You have confirmed your profile!</Typography>
                    
                    </StyledBox>
                    <Typography sx={{ p: 2, color: 'text.primary' }}>Select the button below to redo.</Typography>
                    <Box 
                    mt={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center the content horizontally
                    }}>
                        <CustomRedButton onClick={() => {
                            setOption('education')
                        }}>Redo</CustomRedButton>
                    </Box>
            </div>)}
      </SwipeableDrawer>
    </Root>
  );
}


export default DrawerOptions;