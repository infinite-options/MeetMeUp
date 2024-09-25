import { Button } from '@mui/material';
import '../../App.css';
import questionMark from '../Images/questionMarkBox.png';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
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
          <Typography sx={{ p: 2, color: 'text.primary' }}>{subtitle}</Typography>
    </div>
    )

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

export default function HelperTextBox({ text, title, subtitle, content }) {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
      };
      const ContentBox = ({content}) => (
        <Box 
            mt={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Box sx={{overflow:"auto", height:"150px"}}>
            {content}
            </Box>
            <CustomRedButton onClick={() => {
                setOpen(false);
            }}>Done</CustomRedButton>
        </Box>
        )
    const buttonStyle = {
        backgroundColor: '#F2F2F2',
        color: '#1A1A1A',
        fontFamily: 'Segoe UI',
        fontWeight: '400',
        fontSize:' 14px',
        borderRadius: '20px',
        marginTop: '25px',
        padding: '20px',
        width: '100%',
    }
    return (
        <div>
    <Button sx={buttonStyle} onClick={toggleDrawer(true)}>
        <img src={questionMark} alt="questionmark" />
        <Typography
            sx={{
                color: '#1A1A1A',
                fontFamily: 'Segoe UI',
                marginLeft: '35px',
                textTransform: 'none',
            }}
        >
            {text}
        </Typography>
    </Button>

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

        {/* Keep the drawer rendered, but control visibility */}
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={true}
            ModalProps={{
                keepMounted: true,
            }}
            PaperProps={{
                sx: {
                    height: 'auto',
                    display: open ? 'flex' : 'none', // Control display based on 'open'
                    flexDirection: 'column',
                },
            }}
            BackdropProps={{
                onClick: toggleDrawer(false),
            }}
        >
            <TitleBox title={title} subtitle={subtitle}></TitleBox>
            <ContentBox content={content}></ContentBox>
        </SwipeableDrawer>
    </Root>
</div>
    )
}