import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar80.png';
import videoCameraIcon from '../Assets/Images/videoCameraIcon.png';
import uploadImageIcon from '../Assets/Images/uploadImageIcon.png';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';
import Progress from '../Assets/Components/Progress';
import NextButton from '../Assets/Components/NextButton';
import Webcam from 'react-webcam';

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

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const isInitialMount = useRef(true);
    const [videoSrc, setVideoSrc] = useState(null);
    const [viewRecording, setViewRecording] = useState(false);

    const handleDataAvailable = useCallback(({data}) => {
        if(data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, [setRecordedChunks]);

    const handleStartCaptureClick = useCallback(() => {
        console.log(webcamRef);
        if(webcamRef.current.stream !== undefined) {
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {type: "video/webm"});
            const url = URL.createObjectURL(blob);
            setVideoSrc(url);
        }
    }, [recordedChunks]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
        handleDownload();
    }, [mediaRecorderRef, setCapturing, handleDownload]);

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            if(!capturing) {
                handleDownload();
            }
        }
    }, [setRecordedChunks, capturing, handleDownload]);

    const handleViewRecording = () => {
        setViewRecording(!viewRecording);
    }

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
                {/* <Link to='/accountSetup4Create'><img src={backButton} alt='back button' className='back-button'/></Link>
                <div className='pc-title-back-button-text'>
                    Profile Creation
                </div>
                <img src={progressBar} alt='progress bar'/> */}
                <Progress percent="80%" prev="/accountSetup4Create" />

                <form className='form-container' onSubmit={handleNext} >
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
                    {viewRecording ?
                        <video src={videoSrc} height="400" width="300" controls/>
                        :
                        <Webcam ref={webcamRef} height={400} width={300} audio={false}/>
                    }
                    </div>
                    <div className='general-container'>
                    {capturing ?
                        (<Button component='label' variant='contained'
                            sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                            borderRadius: '41px', textTransform: 'none' }}
                            onClick={handleStopCaptureClick}
                        >
                            <div className='white-text-video'>
                                Stop&nbsp;
                            </div>
                            <img src={videoCameraIcon} alt='video icon'/>
                        </Button>)
                        :
                        <div className='general-container'>
                        {viewRecording ?
                            <Button component='label' variant='contained'
                                sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                borderRadius: '41px', textTransform: 'none' }}
                                onClick={handleViewRecording}
                            >
                                <div className='white-text-video'>
                                    Record Again&nbsp;
                                </div>
                                <img src={videoCameraIcon} alt='video icon'/>
                            </Button>
                            :
                            <div className='general-container'>
                            {videoSrc !== null ?
                                (<Grid2 container spacing={2}>
                                    <Grid2 item>
                                        <Button component='label' variant='contained'
                                            sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                            borderRadius: '41px', textTransform: 'none' }}
                                            onClick={handleStartCaptureClick}
                                        >
                                            <div className='white-text-video'>
                                                Record&nbsp;
                                            </div>
                                            <img src={videoCameraIcon} alt='video icon'/>
                                        </Button>
                                    </Grid2>
                                    <Grid2 item>
                                        <Button component='label' variant='contained'
                                            sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                            borderRadius: '41px', textTransform: 'none' }}
                                            onClick={handleViewRecording}
                                        >
                                            <div className='white-text-video'>
                                                View&nbsp;
                                            </div>
                                            <img src={videoCameraIcon} alt='video icon'/>
                                        </Button>
                                    </Grid2>
                                </Grid2>)
                                :
                                (<Button component='label' variant='contained'
                                    sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                    borderRadius: '41px', textTransform: 'none' }}
                                    onClick={handleStartCaptureClick}
                                >
                                    <div className='white-text-video'>
                                        Record&nbsp;
                                    </div>
                                    <img src={videoCameraIcon} alt='video icon'/>
                                </Button>)
                            }
                            </div>
                        }
                        </div>
                    }
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
                        <NextButton onClick={handleNext} next={'/accountSetup6Availability'}></NextButton>
                    </div>
                </form>
            </div>
        </div>
    )
}