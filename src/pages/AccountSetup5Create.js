import '../App.css';
import backButton from '../assets/BackButton.png';
import progressBar from '../assets/progressBar80.png';
import videoCameraIcon from '../assets/videoCameraIcon.png';
import uploadImageIcon from '../assets/uploadImageIcon.png';
import removeImageIcon from '../assets/removeImage.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({
        video: '',
        image: '',
    });

    const handleVideoUpload = (e) => {
        const vid = e.target.files[0];
        if(!vid) {
            return;
        }

        setFormData({
            ...formData,
            'video': URL.createObjectURL(vid)
        });
    };

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        if(!img) {
            return;
        }

        setFormData({
            ...formData,
            'image': URL.createObjectURL(img) + "," + formData['image']
        });
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };

    return (
        <div className='App'>
            <div className='white-background'>
                <Link to='/accountSetup4Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/>
                <form className='form-container' onSubmit={handleNext} action='/accountSetup5Create'>
                    <div className='pc-header-text'>
                        Your Profile Recording
                    </div>
                    <div className='pc-sub-header-text'>
                        This is a short 30 second to 5 minute video to tell us a bit about who you are and what you like.
                    </div>
                    <br/>
                    <div className='pc-sub-header-text'>
                        Be as open and honest as you would like, matches love to hear about you.
                    </div>
                    {formData['video'] ? <div className='general-container'><video width='75%' height='100%' controls src={formData['video']}/></div> : null}
                    <div className='general-container'>
                        <Button component='label' variant='contained' sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                            borderRadius: '41px', textTransform: 'none' }}
                        >
                            <img src={videoCameraIcon} alt='video icon'/>
                            <VisuallyHiddenInput
                                type='file'
                                onChange={handleVideoUpload}
                                accept='.mov,.mp4'
                            />
                        </Button>
                    </div>
                    <div className='pc-header-text'>
                        Complimentary Images
                    </div>
                    <div className='pc-sub-header-text'>
                        Upload some complimentary images to help give a face to your personality.
                    </div>
                    <div className='general-container'>
                        <Button component='label' variant='contained' sx={{ backgroundColor: '#000000', color: '#FFFFFF', maxWidth: '202px',
                            borderRadius: '41px', textTransform: 'none' }}
                        >
                            Upload&nbsp;<img src={uploadImageIcon} alt='upload icon'/>
                            <VisuallyHiddenInput
                                type='file'
                                onChange={handleImageUpload}
                                accept='image/*'
                            />
                        </Button>
                    </div>
                    {formData['image'] ?
                        <div className='general-container'>
                            {formData['image'].split(",").slice(0, (formData['image'].split(",").length)-1).map((img) => (
                                <div className="complimentary-images" key={img}>
                                    <img src={img} alt='hello' style={{maxWidth: '175px', position: 'absolute'}}/>
                                    <div className="remove-image-icon">
                                        <img src={removeImageIcon} alt='remove'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : null}
                </form>
            </div>
        </div>
    )
}