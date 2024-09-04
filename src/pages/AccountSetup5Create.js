import '../App.css';
import HelperTextBox from './helperTextBox';
import backButton from '../assets/BackButton.png';
import progressBar from '../assets/progressBar80.png';
import videoCameraIcon from '../assets/videoCameraIcon.png';
import uploadImageIcon from '../assets/uploadImageIcon.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
/* import { useReactMediaRecorder } from 'react-media-recorder';
import VideoRecorder from 'react-video-recorder-18';
import { useRecordWebcam } from 'react-record-webcam'; */

/* const options = {
    filename: 'test-filename',
    fileType: 'mp4',
    width: 1920,
    height: 1080
};

const RecordView = () => {
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl
    } = useReactMediaRecorder({
        video: true,
        facingMode: { exact: 'environment' }
    });

    return (
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
    );
}; */

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

/*     const recordWebcam = useRecordWebcam(options);
    const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
        console.log({ blob });
    };
    const getRecordingFileRenderProp = async (blob) => {
        console.log({ blob });
    }; */

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
            'image': URL.createObjectURL(img) + ',' + formData['image']
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
                <form className='form-container' onSubmit={handleNext} action='/accountSummary'>
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
{/*                         <div style={{ height: '100%' }}>
                            <h1>One minute</h1>
                            <VideoRecorder
                                isOnInitially
                                isFliped
                                showReplayControls
                                // mimeType={text('mimeType')}
                                countdownTime='3000'
                                timeLimit='60000'
                                onRecordingComplete={(videoBlob) => {
                                // Do something with the video...
                                console.log('videoBlob', videoBlob);
                                }}
                            />
                        </div> */}
                        <Button component='label' variant='contained' sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                            borderRadius: '41px', textTransform: 'none' }}
                        >
                            <div className='white-text-video'>
                                Record&nbsp;
                            </div>
                            <img src={videoCameraIcon} alt='video icon'/>
                        </Button>
                        <Button component='label' variant='contained' sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                            borderRadius: '41px', textTransform: 'none' }}
                        >
                            <div className='white-text-video'>
                                Upload&nbsp;
                            </div>
                            <img src={videoCameraIcon} alt='video icon'/>
                            <VisuallyHiddenInput
                                type='file'
                                onChange={handleVideoUpload}
                                accept='.mov,.mp4'
                            />
                        </Button>
                    </div>
                    <HelperTextBox text='Why do I need to make this video?'/>
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
                            {formData['image'].split(',').slice(0, (formData['image'].split(',').length)-1).map((img) => (
                                <div className='complimentary-images' key={img}>
                                    <img src={img} alt='hello' style={{maxWidth: '175px', position: 'absolute'}}/>
                                </div>
                            ))}
                        </div>
                        : null}
                    <div className='form-button-container'>
                        <Button
                            variant='contained'
                            type='submit'
                            sx={{
                                backgroundColor: '#E4423F',
                                maxWidth: '202px',
                                borderRadius: '41px',
                                marginTop: '20px',
                                boxShadow: 'none',
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}