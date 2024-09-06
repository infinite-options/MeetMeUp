import '../App.css';
import backButton from '../Assets/Images/BackButton.png';
import { Link } from 'react-router-dom';

export default function ShowTermsAndConditions() {
    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Terms and Conditions
                </div>
                <iframe title="toc" src="https://drive.google.com/file/d/1Xof_uMYxb2juZ81l8DkAn_r5wzxp0hzA/preview" width="400" height="500"></iframe>
            </div>
        </div>
    )
}