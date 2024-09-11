import '../App.css';
import HelperTextBox from '../Assets/Components/helperTextBox';
import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar80.png';
import videoCameraIcon from '../Assets/Images/videoCameraIcon.png';
import uploadImageIcon from '../Assets/Images/uploadImageIcon.png';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid2, ImageList, ImageListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user",
};

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({
        video: '',
        image: '',
        imgFav: '',
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
        if(webcamRef.current.stream !== undefined) {
            if(videoSrc !== null) {
                URL.revokeObjectURL(videoSrc);
            }
            setVideoSrc(null);
            setRecordedChunks([]);
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
            const blob = new Blob(recordedChunks, {type: "video/mp4"});
            const url = URL.createObjectURL(blob);
            console.log("recordedChunks:", recordedChunks);
            console.log("blob:", blob);
            console.log("url:", url);
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
    };

    const handleImageUpload = (e) => {
        const img = e.target.files[0];
        console.log("img:", img);
        if(!img) {
            return;
        }

        const imgURL = URL.createObjectURL(img);
        if(formData['image'].split(',').length > 3) {
            alert('Only 3 images allowed!');
        }
        else {
            setFormData({
                ...formData,
                'image': imgURL + ',' + formData['image']
            });
        }
    };

    const handleDelete = (e) => {
        var imageArray = formData['image'].split(',');
        var imageString = "";
        for(var i = imageArray.length - 2; i >= 0; i--) {
            if(imageArray[i] !== e) {
                imageString = imageArray[i] + ',' + imageString;
            }
        }

        setFormData({
            ...formData,
            'image': imageString
        });

        if(formData['imgFav'] === e) {
            formData['imgFav'] = '';
        }
    };

    const handleFavorite = (e) => {
        if(formData['imgFav'] === e) {
            setFormData({
                ...formData,
                ['imgFav']: '',
            });
        }
        else {
            setFormData({
                ...formData,
                ['imgFav']: e,
            });
        }
    };

    const handleVideoDownload = () => {
        console.log("videoSrc:", videoSrc);
        const link = document.createElement('a');
        console.log("link1:", link);
        link.href = videoSrc;
        console.log("link2:", link);
        link.download = 'video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleNext = (e) => {
        console.log(e);
        console.log(formData);
    };

    return (
        <Box sx={{marginLeft:'15%', marginRight:'15%'}}>
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
                    <Webcam ref={webcamRef} height={400} width={300} audio={false} mirrored={true} videoConstraints={videoConstraints}/>
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
                        <Grid2 container spacing={2}>
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
                            <Button component='label' variant='contained'
                                sx={{ backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                borderRadius: '41px', textTransform: 'none' }}
                                onClick={handleVideoDownload}
                            >
                                <div className='white-text-video'>
                                    Download&nbsp;
                                </div>
                                <img src={videoCameraIcon} alt='video icon'/>
                            </Button>
                        </Grid2>
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
                {formData['image'].split(',').length > 1 ?
                    <div className='general-container'>
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                            }}
                        >
                            <ImageList
                                sx={{ display: 'flex', flexWrap: 'nowrap' }} cols={5}>
                                {formData['image'].split(',').slice(0, formData['image'].split(',').length - 1).map((img) => (
                                    <ImageListItem
                                        key={img}
                                        sx={{
                                            width: 'auto',
                                            flex: '0 0 auto',
                                            border: '1px solid #ccc',
                                            margin: '0 2px',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`complimentary-${img}`}
                                            style={{
                                                height: '150px',
                                                width: '150px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                                            <IconButton
                                                onClick={() => handleDelete(img)}
                                                sx={{
                                                    color: 'black',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    },
                                                    margin: '5px',
                                                }}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
                                            <IconButton
                                                onClick={() => handleFavorite(img)}
                                                sx={{
                                                    color: formData['imgFav'] === img ? 'red' : 'black',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                    },
                                                    margin: '5px',
                                                }}
                                            >
                                                {formData['imgFav'] === img ? (
                                                    <FavoriteIcon />
                                                ) : (
                                                    <FavoriteBorderIcon />
                                                )}
                                            </IconButton>
                                        </Box>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </div>
                    : null}
                <div className='form-button-container'>
                    <NextButton onClick={handleNext} next={'/accountSetup6Availability'}></NextButton>
                </div>
            </form>
        </Box>
    )
}