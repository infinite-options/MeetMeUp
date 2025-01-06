import { StyleSheet, TouchableOpacity, View, Image, Text, Animated, PanResponder, Dimensions, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import React, { useRef, useState, useEffect } from 'react';
import { fetchUserInfo } from "../Api.js";
import GenderIdentity from '../AccountSetup/GenderIdentity.js';
import { isReadonlyKeywordOrPlusOrMinusToken } from 'typescript';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";


export default function App() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arrlength, setArrlength] = useState(0);
  const [arrposition, setArrposition] = useState(0);



  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scrollableHeight = useRef(new Animated.Value(Dimensions.get('window').height * 0.5)).current; // Initial height of the scrollable content

  const [videoPosition, setVideoPosition] = useState(0);  // Current video position
  const [videoDuration, setVideoDuration] = useState(0);  // Video duration


  // Import images
  const heightImg = require('../src/Assets/Images/height.png');
  const genderImg = require('../src/Assets/Images/gender.png'); 
  const redlikeEmpty = require('../src/Assets/Images/redlike.png');

  // Helper function to validate URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handlePlaybackStatusUpdate = (statusUpdate) => {
    setStatus(statusUpdate);
    if (statusUpdate.isLoaded) {
      setVideoPosition(statusUpdate.positionMillis);
      setVideoDuration(statusUpdate.durationMillis);
    }
  };

  const handleSeek = (value) => {
    if (video.current) {
      video.current.setPositionAsync(value);  // Seek to the new position
    }

    if (value >= videoDuration) {
      video.current.stopAsync();
    }
  };
  
  const handleLeftArrowPress = () => {

    let left =arrposition
    if (arrposition > 0){
      left = arrposition-1
      setArrposition(left);
      fetchData(arrposition);
    }  
    else{
      setArrposition(arrlength);
    }

  };

  const handleRightArrowPress = () => {

    if (arrlength > arrposition){
      let right =arrposition
      setArrposition(right+1);
      fetchData(arrposition);
    }  
    else{
      setArrposition(0);
    }

    

  };

  const handleClosePress = () => {

    handleRightArrowPress();

  };

  const fetchData = async (position) => {
    try {

      const response = await axios.get('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/100-000004');
      let arrsize = response.data.result.length;

      setArrlength(arrsize)
      const fetchedData = response.data.result[position];
    //  console.log(fetchedData);
      //const uid = '100-000199';
      const uid = fetchedData.user_uid;
      const data = await fetchUserInfo(uid);
     // if (isMounted) {
        setUserInfo(data);
      //}
    } catch (error) {
      // if (isMounted) {
      //   setError(error.message);
      // }
    } finally {
     // if (isMounted) {
        setLoading(false);
     // }
    }
  };


  useEffect(() => {
    fetchData(arrposition); // Use the current arrposition when component mounts

  }, [arrposition]); // Re-run the effect when arrposition changes



  useEffect(() => {
    if (userInfo) {
      console.log("Video URL:", userInfo.user_video_url);
    }
  }, [userInfo]);

  if (loading) {
    return (
      <View style={styles.container}> 
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Error: {error}</Text>
      </View>
    );
  }

  let videoUrl = userInfo?.user_video_url;
  if (videoUrl) {
    videoUrl = JSON.parse(videoUrl); // Remove escaped quotes from the URL string
  }

  return (
    <View style={styles.container}>
      {isValidUrl(videoUrl) ? (
        <>
          <Video
            ref={video}
            style={styles.backgroundVideo}
            source={{ uri: videoUrl }}
            shouldPlay={status.isPlaying || false}
            isLooping={false} 
            resizeMode="cover"
            // onPlaybackStatusUpdate={(statusUpdate) => {
            //   setStatus(statusUpdate);
            // }
            // }
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          {/* Play/Pause Button */}
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={() => {
              if (status.isPlaying) {
                video.current.pauseAsync(); // Pause the video
              } else {
                video.current.playAsync(); // Play the video
              }
            }}
          >
            <Text style={styles.playPauseText}>
              {status.isPlaying ? '❚❚' : '►'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.infoText}>Invalid or Missing Video URL</Text>
      )}

      {/* Static Layer with Arrows */}
      <View style={styles.staticLayer}>
        <TouchableOpacity style={styles.arrowContainer} onPress={handleLeftArrowPress}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={handleClosePress}>
          <Ionicons name="close" size={20} color="black" />
        </TouchableOpacity>
          <View style={styles.redCircle}>
            <Image source={require('../src/Assets/Images/like.png')} style={styles.centerImage} />
          </View>
        </View>
        <TouchableOpacity style={styles.arrowContainer} onPress={handleRightArrowPress}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.scrollableLayer, { transform: [{ translateY: pan.y }] }]}
      >
        <ScrollView contentContainerStyle={styles.overlay}>
          <View>
            <Text>
              <Text style={[styles.nameText, { fontWeight: 'bold' }]}>
                {userInfo.user_first_name}{' '}
              </Text>
              <Text style={styles.nameText}>, {userInfo.user_age} </Text>
              <Image source ={redlikeEmpty} style={styles.image}/>
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={heightImg} style={styles.image} />
            <Text style={styles.infoText}>
              {userInfo.user_height}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={heightImg} style={styles.image} />
            <Text style={styles.infoText}>
              {userInfo.user_kids !== null ? `${userInfo.user_kids} children` : '0 children'}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Image source={genderImg} style={styles.image} />
            <Text style={styles.infoText}>
              Sex assigned at birth was {userInfo.user_gender}
            </Text>
          </View>



          
          <View style={styles.infoContainer}>
            <Image source={heightImg} style={styles.image} />
            <Text style={styles.infoText}>
              User is open to {Array.isArray(userInfo.user_open_to)
                ? userInfo.user_open_to.join(', ')
                : JSON.parse(userInfo.user_open_to).join(', ')}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Image source={heightImg} style={styles.image} />
            <Text style={styles.infoText}>
              User sexuality {userInfo.user_sexuality}
            </Text>
          </View>
        </ScrollView>
        {/* <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={videoDuration}
            value={videoPosition}
            onValueChange={handleSeek}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FF6347"
            thumbStyle={styles.thumb} 
          />
        </View> */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Ensures visibility
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollableLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: "10%",  // Stretch to the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 1,
    height: '30%', // Make sure the layer takes up the full height of the screen
  },
  overlay: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent', // Fully transparent
    height: '100%', // Stretch the overlay to fill the screen
  },
  nameText: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row', // Align image and text horizontally in the same row
    alignItems: 'center', // Vertically align the items in the center
    padding: 10,
  },
  image: {
    width: 20,   // Smaller width of the image
    height: 20,  // Smaller height of the image
    marginRight: 5, // Space between the image and text
  },
  infoText: {
    fontSize: 14,  // Smaller font size
    color: 'white',
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }], // Centers the button
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent black background
    padding: 20,
    borderRadius: 40, // Rounded button
    zIndex: 10, // Ensure it stays above the video
    justifyContent: 'center',
    alignItems: 'center',

  },
  playPauseText: {
    color: '#fff',
    fontSize: 50, // Larger font size for better visibility
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumb: {
    width: 12,   // Smaller thumb width
    height: 12,  // Smaller thumb height
    borderRadius: 1,  // Make it circular
    backgroundColor: '#FF6347',  // Customize thumb color
  },

  staticLayer: {
    position: 'absolute',
    bottom: '3%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 20,
  },
  arrowContainer: {
    width: 50,            // Circle width
    height: 50,           // Circle height
    borderRadius: 25,     // Makes the container circular
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    justifyContent: 'center', // Center the icon
    alignItems: 'center',  // Center the icon
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircle: {
    left: 20,
    width: 45,             // Circle size
    height: 45,            // Circle size
    borderRadius: 45,      // Makes it circular
    backgroundColor: 'red', // Red background for the circle
    justifyContent: 'center', // Center the image inside
    alignItems: 'center',   // Center the image inside
  },
  centerImage: {
    width: 20,  // Image width
    height: 20, // Image height
    resizeMode: 'contain', // Keep aspect ratio
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,               // Position the close button above the image
    left: -40,
    alignSelf: 'center',    // Center it horizontally with the image
    width: 45,              // Circle size
    height: 45,             // Circle size
    borderRadius: 45,       // Makes it circular
    backgroundColor: 'white', // White background for the close button
    justifyContent: 'center', // Center the icon inside
    alignItems: 'center',    // Center the icon inside
  },
});
