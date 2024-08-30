import '../App.css';
import backButton from '../assets/BackButton.png';
import progressBar from '../assets/progressBar80.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
    });

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };

    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/accountSetup3Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'></img>
                <form className='form-container' onSubmit={handleNext} action='/accountSetup5Create'>
                    <div className='pc-header-text'>
                        Your Profile Recording
                    </div>
                    <div className='pc-sub-header-text'>
                        This is a short 30 second tom 5 minute video to tell us a bit about who you are and what you like.
                    </div>
                    <br/>
                    <div className='pc-sub-header-text'>
                        Be as open and honest as you would like, matches love to hear about you.
                    </div>
                </form>
            </div>
        </div>
    )
}