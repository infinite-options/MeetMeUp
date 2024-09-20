import { Box } from '@mui/material';
import '../App.css';
import TopTitle from '../Assets/Components/TopTitle';
import backButton from '../Assets/Images/BackButton.png';
import { Link } from 'react-router-dom';

export default function ShowTermsAndConditions() {
    return (
            <Box sx={{ marginLeft: {xs: '5%',sm: '15%'}, marginRight: { xs: '5%',sm: '15%'}}} height={'90vh'}>
                <TopTitle title={'Terms and Conditions'} page={'/accountSetup2Create'} weight={'600'}></TopTitle>
                {/* <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Terms and Conditions
                </div> */}
                <iframe title="toc" src="https://drive.google.com/file/d/1Xof_uMYxb2juZ81l8DkAn_r5wzxp0hzA/preview" width="100%" height="100%"></iframe>
        </Box>
    )
}