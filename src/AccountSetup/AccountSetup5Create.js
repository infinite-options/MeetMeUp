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
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
    const userId = localStorage.getItem('user_uid');
    const userEmail = localStorage.getItem('user_email_id')
    const [formData, setFormData] = useState({
        video: '',
        image: '',
        imgFav: '',
    });
    const [loading, setLoading] = useState(true);
    const [noId, setNoId] = useState(false); // if any of the info has been changed then PUT
    const [userData, setUserData] = useState({});
    const [obtain, setObtain] = useState('false');
    const [prevVideo, setPrevVideo] = useState('');
    const [newRecord, setNewRecord] = useState(false);
    const [newImage, setNewImage] = useState(false);

    const navigate = useNavigate();

    console.log('formData: ', formData);

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const isInitialMount = useRef(true);
    const [videoSrc, setVideoSrc] = useState(null);
    const [viewRecording, setViewRecording] = useState(false);

    const handleDataAvailable = useCallback(({ data }) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, [setRecordedChunks]);
    console.log('formData: ', formData);
    console.log('videoSrc: ', videoSrc);


    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
    //             const fetchedData = res.data.result[0];
    //             setUserData(fetchedData);
    
    //             // Only update formData if it's empty (initial load)
    //             setFormData(prevFormData => {
    //                 if (!prevFormData.image) {
    //                     const imageArray = JSON.parse(fetchedData.user_photo_url)
    //                     const joinedImages = imageArray.join(',');
    //                     return {
    //                         ...prevFormData,
    //                         image: joinedImages
    //                     };
    //                 }
    //                 return prevFormData;
    //             });
    
    //             setVideoSrc(fetchedData.user_video_url.replaceAll("\"", ""));
    //             setObtain(true);
    //             setViewRecording(true);
    //         } catch (error) {
    //             console.log("Error fetching data", error);
    //         }
    //     };
    
    //     if (userId && !formData.image) {
    //         fetchUserData();
    //     } else {
    //         setLoading(false);
    //         setNoId(true);
    //     }
    // }, [userId, formData.image]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
                const fetchedData = res.data.result[0];
                setUserData(fetchedData);
    
                // Only update formData if it's empty (initial load)
                setFormData(prevFormData => {
                    if (!prevFormData.image) {
                        let joinedImages = '';
                        if (fetchedData.user_photo_url) {
                            try {
                                const imageArray = JSON.parse(fetchedData.user_photo_url);
                                if (Array.isArray(imageArray)) {
                                    joinedImages = imageArray.join(',');
                                }
                            } catch (error) {
                                console.log("Error parsing user_photo_url", error);
                            }
                        }
                        return {
                            ...prevFormData,
                            image: joinedImages
                        };
                    }
                    return prevFormData;
                });
    
                if (fetchedData.user_video_url) {
                    setVideoSrc(fetchedData.user_video_url.replaceAll("\"", ""));
                } else {
                    setVideoSrc(''); // or some default value
                }
                setObtain(true);
                setViewRecording(true);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
    
        fetchUserData();
    }, [userId]); // Add userId to the dependency array if it's not already there

    const handleStartCaptureClick = useCallback(() => {
        if (webcamRef.current.stream !== undefined) {
            if (videoSrc !== null) {
                URL.revokeObjectURL(videoSrc);
            }
            setVideoSrc(null);
            setRecordedChunks([]);
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/mp4"
            });
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, { type: "video/mp4" });
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
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            if (!capturing) {
                handleDownload();
            }
        }
    }, [setRecordedChunks, capturing, handleDownload]);

    const handleViewRecording = () => {
        setViewRecording(!viewRecording);
    };

    const [uploadedImages, setUploadedImages] = useState([]);

    const handleImageUpload = async (e) => {
        const img = e.target.files[0];
        console.log("img:", img);
        setNewImage(true);
        if(!img) {
            return;
        }
    
        const imgURL = URL.createObjectURL(img);
        const currentImages = formData.image.split(',').filter(img => img);
        if(currentImages.length >= 3) {
            alert('Only 3 images allowed!');
        } else {
            setFormData(prevData => ({
                ...prevData,
                image: imgURL + ',' + prevData.image
            }));
        }
    };

    const handleDelete = async (e) => {
        setNewImage(true);
        var imageArray = formData['image'].split(',').filter(img => img && img !== e);
        var imageString = imageArray.join(',') + ',';
    
        setFormData(prevData => ({
            ...prevData,
            'image': imageString,
            'imgFav': prevData['imgFav'] === e ? '' : prevData['imgFav']
        }));
    
        // Update the server with the new image data
        try {
            const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
            const fd = new FormData();
            fd.append("user_uid", localStorage.getItem('user_uid'));
            fd.append("user_email_id", localStorage.getItem('user_email_id'));
            fd.append("user_photo_url", JSON.stringify(imageArray));
    
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            console.log("Image deleted and server updated successfully");
        } catch (error) {
            console.error("Error updating server after image deletion:", error);
        }
    };

    const handleFavorite = (previewUrl) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            'imgFav': prevFormData['imgFav'] === previewUrl ? '' : previewUrl,
        }));
    };

    const handleVideoDownload = () => {
        const link = document.createElement('a');
        link.href = videoSrc;
        link.download = 'video.mp4';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleNext = async (e) => {
        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
        let fd = new FormData();

        // Append user information
        fd.append("user_uid", localStorage.getItem('user_uid'));
        fd.append("user_email_id", localStorage.getItem('user_email_id'));

        // Handle video upload
        if (newRecord && videoSrc) {
            try {
                let vidBlob = await fetch(videoSrc).then(r => r.blob());
                fd.append("user_video", vidBlob, "video_filename.mp4");
            } catch (error) {
                console.error("Error fetching video:", error);
            }
        }

        // Handle image uploads
        if (newImage) {
            const imageArray = formData['image'].split(',').filter(img => img);
            for (let i = 0; i < imageArray.length; i++) {
                try {
                    let imgBlob = await fetch(imageArray[i]).then(r => r.blob());
                    fd.append(`img_${i}`, imgBlob, `img_${i}_filename.jpg`);
                } catch (error) {
                    console.error(`Error fetching image ${i}:`, error);
                }
            }
        }

        // Append favorite image information if any
        // if (formData['imgFav']) {
        //     fd.append('favorite_image', formData['imgFav']);
        // }

        if (formData['imgFav']) {
            try {
                let imgBlob = await fetch(formData['imgFav']).then(r => r.blob());
                fd.append('favorite_image', imgBlob, 'favorite_image.jpg');
            } catch (error) {
                console.error("Error fetching favorite image:", error);
            }
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Server response:", result);

            // Handle successful upload
            alert("Profile updated successfully!");
            // Navigate to next page or update UI as needed
            // navigate('/next-page');
        } catch (err) {
            console.error("Fetch Error:", err.message);
            alert("There was an error updating your profile. Please try again.");
        }
    };

    // const handleNext = async (e) => {
    //     // const url = "http://127.0.0.1:4000/userinfo";
    //     const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
    //     let fd = new FormData();
    //     fd.append("user_uid", localStorage.getItem('user_uid'));
    //     fd.append("user_email_id", localStorage.getItem('user_email_id'));

    //     console.log("user_uid:", fd.user_uid);
    //     console.log("user_email_id:", fd.user_email_id);

    //     // fd.append("user_uid", "100-000058");
    //     // fd.append("user_email_id", "hello@gmail.com");

    //     // console.log("everything:", fd);
    //     fd.forEach((value, key) => {
    //         console.log(`${key}: ${value}`);
    //     });

    //     // TODO: error occurs right here not allowing fetch
    //     console.log('videoSrc before: ', videoSrc);
    //     if (newRecord) { // if there hasnt been a previous video
    //         let vidBlob = await fetch(videoSrc).then(r => r.blob());
    //         console.log('vidBlob: ', vidBlob);
    //         fd.append("user_video", vidBlob, "video_filename.mp4");
    //     }

    //     if (newImage) {

    //         var imageArray = formData['image'].split(',');
    //         for (var i = 0; i < imageArray.length - 1; i++) {
    //             let imgBlob = await fetch(imageArray[i]).then(r => r.blob());
    //             if (i === 0) {
    //                 fd.append("img_0", imgBlob, "img_0_filename");
    //             }
    //             else if (i === 1) {
    //                 fd.append("img_1", imgBlob, "img_1_filename");
    //             }
    //             else if (i === 2) {
    //                 fd.append("img_2", imgBlob, "img_2_filename");
    //             }
    //         }
    //         if (!formData['image']) {
    //             fd.append('user_photo_url', '');
    //         }
    //     }


    //     try {
    //         const response = await fetch(url, {
    //             method: 'PUT',
    //             body: fd,
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log(result);
    //         }
    //         else {
    //             console.error('Response Err:', response.statusText);
    //         }
    //     } catch (err) {
    //         console.log("Try Catch Err:", err);
    //     }


    //     if (loading) {
    //         return <div>Loading specifics</div>;
    //     }
    //     if (noId) {
    //         navigate('/accountSetup1Login')
    //         // return <div>No User Found</div>;
    //     }
    // };



    // useEffect(()=> {
    //     axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/100-000113', formData)
    //         .then(res => {
    //             console.log(res)
    //         })
    // },[formData])

    return (
        <Box sx={{ marginLeft: { xs: '5%', sm: '15%' }, marginRight: { xs: '5%', sm: '15%' } }}>
            <Progress percent="80%" prev="/accountSetup4Create" />
            <form className='form-container' onSubmit={handleNext} >
                <div className='pc-header-text'>
                    Your Profile Recording
                </div>
                <div className='pc-sub-header-text'>
                    This is a short 30 second to 5 minute video to tell us a bit about who you are and what you like.
                </div>
                <br />
                <div className='pc-sub-header-text'>
                    Be as open and honest as you would like, matches love to hear about you.
                </div>
                {formData['video'] ? <div className='general-container'><video width='75%' height='100%' controls src={formData['video']} /></div> : null}
                <div className='general-container'>
                    {viewRecording ? (
                        // prevVideo ? (
                        //     <video src={prevVideo} height="400" width="300" controls />
                        // ) : (
                        <video src={videoSrc} height="400" width="300" controls />
                        // )
                    ) : (
                        <Webcam
                            ref={webcamRef}
                            height={400}
                            width={300}
                            audio={true}
                            mirrored={true}
                            videoConstraints={videoConstraints}
                        />
                    )}
                </div>
                <div className='general-container'>
                    {capturing ?
                        (<Button component='label' variant='contained'
                            sx={{
                                backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                borderRadius: '41px', textTransform: 'none'
                            }}
                            onClick={handleStopCaptureClick}
                        >
                            <div className='white-text-video'>
                                Stop&nbsp;
                            </div>
                            <img src={videoCameraIcon} alt='video icon' />
                        </Button>)
                        :
                        <div className='general-container'>
                            {viewRecording ?
                                <Grid2 container spacing={2}>
                                    <Button component='label' variant='contained'
                                        sx={{
                                            backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                            borderRadius: '41px', textTransform: 'none'
                                        }}
                                        onClick={handleViewRecording}
                                    >
                                        <div className='white-text-video'>
                                            Record Again&nbsp;
                                        </div>
                                        <img src={videoCameraIcon} alt='video icon' />
                                    </Button>
                                    <Button component='label' variant='contained'
                                        sx={{
                                            backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                            borderRadius: '41px', textTransform: 'none'
                                        }}
                                        onClick={handleVideoDownload}
                                    >
                                        <div className='white-text-video'>
                                            Download&nbsp;
                                        </div>
                                        <img src={videoCameraIcon} alt='video icon' />
                                    </Button>
                                </Grid2>
                                :
                                <div className='general-container'>
                                    {videoSrc !== null ?
                                        (<Grid2 container spacing={2}>
                                            <Grid2 item>
                                                <Button component='label' variant='contained'
                                                    sx={{
                                                        backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                                        borderRadius: '41px', textTransform: 'none'
                                                    }}
                                                    onClick={() => {
                                                        handleStartCaptureClick()
                                                        setNewRecord(true);
                                                    }}
                                                >
                                                    <div className='white-text-video'>
                                                        Record&nbsp;
                                                    </div>
                                                    <img src={videoCameraIcon} alt='video icon' />
                                                </Button>
                                            </Grid2>
                                            <Grid2 item>
                                                <Button component='label' variant='contained'
                                                    sx={{
                                                        backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                                        borderRadius: '41px', textTransform: 'none'
                                                    }}
                                                    onClick={handleViewRecording}
                                                >
                                                    <div className='white-text-video'>
                                                        View&nbsp;
                                                    </div>
                                                    <img src={videoCameraIcon} alt='video icon' />
                                                </Button>
                                            </Grid2>
                                        </Grid2>)
                                        :
                                        (<Button component='label' variant='contained'
                                            sx={{
                                                backgroundColor: '#E4423F', color: '#000000', maxWidth: '202px',
                                                borderRadius: '41px', textTransform: 'none'
                                            }}
                                            onClick={() => {
                                                setNewRecord(true)
                                                handleStartCaptureClick()
                                            }}
                                        >
                                            <div className='white-text-video'>
                                                Record&nbsp;
                                            </div>
                                            <img src={videoCameraIcon} alt='video icon' />
                                        </Button>)
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
                <HelperTextBox text='Why do I need to make this video?' title={'Why video?'} subtitle={"The video recording is mandatory to use the app. If you have any concerns providing this information there is an option to delete it, if you don't wish to become a member or keep on site for use of a deactivated account"} />
                <div className='pc-header-text'>
                    Complimentary Images
                </div>
                <div className='pc-sub-header-text'>
                    Upload some complimentary images to help give a face to your personality.
                </div>
                <div className='general-container'>
                    <Button component='label' variant='contained' sx={{
                        backgroundColor: '#000000', color: '#FFFFFF', maxWidth: '202px',
                        borderRadius: '41px', textTransform: 'none'
                    }}
                    >
                        Upload&nbsp;<img src={uploadImageIcon} alt='upload icon' />
                        <VisuallyHiddenInput
                            type='file'
                            onChange={handleImageUpload}
                            accept='image/*'
                            multiple
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
                                sx={{ display: 'flex', flexWrap: 'nowrap' }} cols={3}>
                                {formData['image'].split(',').filter(img => img).map((img, index) => (
                                    <ImageListItem
                                        key={index}
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
                                            alt={`complimentary-${index}`}
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
                                                <DeleteIcon />
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