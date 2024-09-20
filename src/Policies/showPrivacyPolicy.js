import { Box } from '@mui/material';
import '../App.css';
import backButton from '../Assets/Images/BackButton.png';
import { Link } from 'react-router-dom';
import TopTitle from '../Assets/Components/TopTitle';

export default function ShowPrivacyPolicy() {
    return (
        <Box sx={{ marginLeft: {xs: '5%',sm: '15%'}, marginRight: { xs: '5%',sm: '15%'}}} height={'90vh'}>
            <div className='white-background'>
                {/* <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Privacy Policy
                </div> */}
                <TopTitle title={'Privacy Policy'} page={'/accountSetup2Create'} weight={'600'}></TopTitle>
                <iframe title="pp" src="https://drive.google.com/file/d/1SH3jynb3Gc8dyDPhwTdiU1oo2AA-Y5Ij/preview" width="100%" height="100%"></iframe>
            </div>
        </Box>
    )
}