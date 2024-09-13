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
import DrawerContext from './DrawerContext';
import { useState, useEffect } from 'react';
import AccountContext from '../../AccountSetup/AccountContext';
const drawerBleeding = 56;
const CustomRedButton = styled(Button)({
    backgroundColor: 'rgba(228, 66, 63, 1)',
    color: '#fff',
    display: 'block', 
    // '&:hover': {
    //   backgroundColor: 'rgba(200, 60, 60, 1)', 
    // },
    padding: '10px',
    maxWidth: '202px',
    borderRadius: '41px',
    marginTop: '20px',
    boxShadow: 'none',
    marginTop: '8px',
    minWidth: '130px',
    textTransform: 'capitalize',
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
  const {option, setOption} = React.useContext(DrawerContext);
  const {specifics, handleSetSpecifics} = React.useContext(DrawerContext);
  const {details, setDetails} = React.useContext(AccountContext);
  const {passData, complete, setComplete, setPassData} = React.useContext(DrawerContext);
  const TitleBox = ({title, subtitle}) => (
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
            <Typography sx={{ p: 2, color: 'text.primary' }}>{title}</Typography>
          </StyledBox>
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{subtitle}</Typography>
    </div>
    )
  const ContentBox = ({content}) => (
    <Box 
        mt={3}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
        {content}
        <CustomRedButton onClick={() => {
            setComplete(true);
            // handleSetSpecifics(option, passData);

            // TODO: complete is true and the drawer closes meaning the next time drawer opens then it takes that pickerValue
            console.log('complete: ', complete);
            console.log('passData: ', passData);
            
            setOption('');
            // when complete is selected set specifics
        }}>Complete</CustomRedButton>
    </Box>
    )
  const handleTextChange = (name) => (event) => {
    const { value } = event.target;
    handleSetSpecifics(name, value); 
  };
  

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  React.useEffect(() => {
    if (option) {
      setOpen(true);
    } else {
      setOpen(false);
      // console.log('closing via option');
      // if (complete) {
      //   handleSetSpecifics(option, passData);
      //   setComplete(false);
      // }
    }
  }, [option]);

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
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={() => toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
         anchor="bottom"
         open={open}
         onClose={() => {
            console.log('onClose option: ', option);
            setComplete(false);
            setOption('');
            toggleDrawer(false)
            setPassData(null);
          }}
         onOpen={() => {
            toggleDrawer(true);
            setComplete(false);
         }}
        //  swipeAreaWidth={drawerBleeding}
         disableSwipeToOpen={true}
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
                <TitleBox title={'Your Education'} subtitle={'List all of the educational achievements you are proud of below.'}></TitleBox>
                <ContentBox content={
                    // <EducationAdd></EducationAdd>
                    <BodyScroll options={[
                        'Did not finish High School',
                        'Finished High School',
                        'Did not finish College',
                        "Completed Associates Degree",
                        "Completed Bachelors Degree",
                        "Completed Graduate Degree",
                    ]}></BodyScroll>
                    }></ContentBox>
            </div>
            )}
        {option=='body' && ( 
            <div>
                <TitleBox title={'Your Body Composition'} subtitle={'This helps us match you to a similar lifestyle.'}></TitleBox>
                <ContentBox content={<BodyScroll options={[
                        'Slim',
                        'Athlete',
                        'Curvy',
                        'Plus Size',
                        'Few Extra Pounds'
                    ]}></BodyScroll>}></ContentBox>
            </div>)}

        {option=='star' && (
            <div>
                <TitleBox title={"What's Your Star Sign"} subtitle={'Some of our users love to know what personality traits you have.'}></TitleBox>
                <ContentBox content={<BodyScroll options={[
                    'Leo',
                    'Virgo',
                    'Libra',
                    'Scorpio'
                ]}></BodyScroll>}></ContentBox>
            </div>)}
        {option=='smoking' && (<div>
            <TitleBox title={"Your Smoking Habits"} subtitle={'What are your current smoking habits? Please provide an accurate answer.'}></TitleBox>
            <ContentBox content={<BodyScroll options={[
                    "I don't smoke",
                    'Socially',
                    'Casual Smoker',
                    'Regularly',
                ]}></BodyScroll>}></ContentBox>
        </div>)}
        {option=='drinking' && (<div>
            <TitleBox title={"Your Drinking Habits"} subtitle={'What are your current drinking habits? Please provide an accurate answer.'}></TitleBox>
            <ContentBox content={<BodyScroll options={[
                    "I don't drink",
                    'Socially',
                    'Casual Drinker',
                    'Regularly',
                ]}></BodyScroll>}></ContentBox>
        </div>)}
        {option=='children' && (<div>
            <TitleBox title={"Do You Have Any Children"} subtitle={'If you have any children please select an accurate amount.'}></TitleBox>
            <ContentBox content={<BodyScroll options={[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10
                ]}></BodyScroll>}></ContentBox>
           </div>)}
        {option=='position' && (<div>
            <TitleBox title={"Your Current Position"} subtitle={'What is your current line of work? Potentional matches love seeing what you get up in your day to day.'}></TitleBox>
            <ContentBox content={<TextField value={specifics.position || ''} onChange={handleTextChange('position')} label={'Your Job'}></TextField>}></ContentBox>
        </div>)}
        {option=='religion' && (<div>
            <TitleBox title={"Religion"} subtitle={'If you follow any religions and religion is important to your relationship please tell us the faith you follow.'}></TitleBox>
            <ContentBox content={<TextField value={specifics.religion || ''} onChange={handleTextChange('religion')} label={'Your Religion'}></TextField>}></ContentBox>
        </div>)}
        {option=='gender' && (<div>
            <TitleBox title={"Gender Specific"} subtitle={'To help potential matches understand who you are and how you identify, tell us your specific gender.'}></TitleBox>
            <ContentBox content={<TextField value={specifics.gender || ''} onChange={handleTextChange('gender')} label={'Specific Gender'}></TextField>}></ContentBox>
        </div>)}
        {option=='height' && (<div>
            <TitleBox title={"What's Your Height?"} subtitle={'Some of our users like to match with people that are of similar stature.'}></TitleBox>
            <ContentBox content={<BodyScroll options={['170cm', '169cm', '168cm', '167cm', '166cm']}></BodyScroll>}></ContentBox>
        </div>)}
        {option=='nationality' && (<div>
            <TitleBox title={"Your Nationality"} subtitle={'To help potential matches understand who you are and how you identify, tell us your specific nationality.'}></TitleBox>
            <ContentBox content={<TextField value={specifics.nationality || ''} onChange={handleTextChange('nationality')} label={'Nationality'}></TextField>}></ContentBox>
           </div>)}
      </SwipeableDrawer>
    </Root>
  );
}


export default DrawerOptions;