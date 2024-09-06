import '../App.css';
import backButton from '../Assets/Images/BackButton.png';
import { Link } from 'react-router-dom';

export default function ShowPrivacyPolicy() {
    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Privacy Policy
                </div>
                <iframe title="pp" src="https://drive.google.com/file/d/1SH3jynb3Gc8dyDPhwTdiU1oo2AA-Y5Ij/preview" width="400" height="500"></iframe>
            </div>
        </div>
    )
}