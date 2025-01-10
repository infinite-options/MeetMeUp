import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

import { fetchUserInfo } from '../Api.js';

const heightImg = require('../src/Assets/Images/height.png');
const genderImg = require('../src/Assets/Images/gender.png');
const redlikeEmpty = require('../src/Assets/Images/redlike.png');
const likeImg = require('../src/Assets/Images/like.png');

export default function MatchProfileDisplay() {
  const screenHeight = Dimensions.get('window').height;
  const sheetOpenY = screenHeight * 0.15;   // how far from top when "open"
  const sheetClosedY = screenHeight * 0.55; // how far from top when "closed"

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arrlength, setArrlength] = useState(0);
  const [arrposition, setArrposition] = useState(0);
  const [userUid, setUserUid] = useState(null);

  // For video slider (optional)
  const [videoPosition, setVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  // Animated value controlling bottom sheet’s vertical position
  const sheetAnim = useRef(new Animated.Value(sheetClosedY)).current;

  // PanResponder to handle dragging of bottom sheet
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Start capturing if we have a significant vertical move
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: Animated.event(
        [null, { dy: sheetAnim }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const newPosition = gestureState.moveY || 0;
        // If the drag ended in the upper half of the screen, open; else close
        if (newPosition < screenHeight / 2) {
          // snap to open
          Animated.spring(sheetAnim, {
            toValue: sheetOpenY,
            useNativeDriver: false,
          }).start();
        } else {
          // snap to closed
          Animated.spring(sheetAnim, {
            toValue: sheetClosedY,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // On mount, we want the sheet at the "semi-open" position.
    sheetAnim.setValue(sheetClosedY);
  }, []);

  // Video logic
  const handlePlaybackStatusUpdate = (statusUpdate) => {
    setStatus(statusUpdate);
    if (statusUpdate.isLoaded) {
      setVideoPosition(statusUpdate.positionMillis);
      setVideoDuration(statusUpdate.durationMillis);
    }
  };

  const handleSeek = (value) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(value);
    }
    if (value >= videoDuration) {
      videoRef.current.stopAsync();
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleLeftArrowPress = () => {
    if (arrposition > 0) {
      const newPos = arrposition - 1;
      setArrposition(newPos);
      fetchData(newPos);
    } else {
      setArrposition(arrlength - 1);
      fetchData(arrlength - 1);
    }
  };

  const handleRightArrowPress = () => {
    if (arrposition < arrlength - 1) {
      const newPos = arrposition + 1;
      setArrposition(newPos);
      fetchData(newPos);
    } else {
      setArrposition(0);
      fetchData(0);
    }
  };

  const handleClosePress = () => {
    // Example: skip to next profile on "X"
    handleRightArrowPress();
  };

  const fetchData = async (position) => {
    try {
      const response = await axios.get(
        `https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userUid}`
      );
      const arrsize = response.data.result.length;
      setArrlength(arrsize);

      const fetchedData = response.data.result[position];
      if (fetchedData) {
        const uid = fetchedData.user_uid;
        const data = await fetchUserInfo(uid);
        setUserInfo(data);
      } else {
        setError('No match data available.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching matches.');
    } finally {
      setLoading(false);
    }
  };

  const getUserUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('user_uid');
      if (uid !== null) {
        setUserUid(uid);
      } else {
        setError('User UID not found.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to retrieve user UID.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserUid();
  }, []);

  useEffect(() => {
    if (userUid) {
      fetchData(arrposition);
    }
  }, [userUid, arrposition]);

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
    try {
      videoUrl = JSON.parse(videoUrl);
    } catch (e) {
      console.error('Invalid video URL format:', e);
      videoUrl = null;
    }
  }

  return (
    <View style={styles.container}>
      {/* Top bar with "12 of 47" and settings icon */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.topCounter}>
            {arrposition + 1} of {arrlength}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="options" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Background Video */}
      {isValidUrl(videoUrl) ? (
        <>
          <Video
            ref={videoRef}
            style={styles.backgroundVideo}
            source={{ uri: videoUrl }}
            shouldPlay={status.isPlaying || false}
            isLooping={false}
            resizeMode="cover"
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          {/* Play/Pause Button */}
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={() => {
              if (status.isPlaying) {
                videoRef.current.pauseAsync();
              } else {
                videoRef.current.playAsync();
              }
            }}
          >
            <Text style={styles.playPauseText}>
              {status.isPlaying ? '❚❚' : '►'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noVideoContainer}>
          <Text style={styles.noVideoText}>No Video</Text>
        </View>
      )}

      {/* 
        MATCH ACTIONS CONTAINER 
        Bring these to the top via high zIndex
      */}
      <View style={styles.matchActionsContainer}>
        <TouchableOpacity style={styles.roundButton} onPress={handleLeftArrowPress}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: '#fff' }]}
            onPress={handleClosePress}
          >
            <Ionicons name="close" size={24} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: 'red', marginLeft: 25 }]}
          >
            <Image source={likeImg} style={styles.centerImage} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.roundButton} onPress={handleRightArrowPress}>
          <Ionicons name="chevron-forward" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* BOTTOM SHEET (behind the matchActionContainer, zIndex lower) */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {
            top: sheetAnim,
          },
        ]}
      >
        <View style={styles.dragIndicator} />
        <ScrollView style={styles.bottomSheetScroll}>
          {/* Name, Age, and Heart */}
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>
              {userInfo?.user_first_name}, {userInfo?.user_age}
            </Text>
            <Ionicons name="heart" size={20} color="red" style={{ marginLeft: 6 }} />
          </View>

          {/* 5-star rating + attendance rating */}
          <View style={styles.starRatingContainer}>
            {[...Array(5).keys()].map((i) => (
              <Ionicons key={i} name="star" size={18} color="#FFD700" />
            ))}
            <Text style={styles.attendanceText}> attendance rating</Text>
          </View>

          {/* Example "chips" for user interests */}
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Cooking / Baking</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Music</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Health & Fitness</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Dance</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Animals & Wildlife</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Dinner</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Coffee</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Drinks</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Movies</Text>
            </View>
          </View>

          {/* Example details - use your userInfo if desired */}
          <View style={styles.detailRow}>
            <Ionicons name="location" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>12 miles away</Text>
          </View>
          <View style={styles.detailRow}>
            <Image source={heightImg} style={styles.detailIcon} />
            <Text style={styles.detailText}>{userInfo.user_height}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="people" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>{userInfo.user_kids !== null ? `${userInfo.user_kids} children` : '0 children'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Image source={genderImg} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              Sex assigned at birth was {userInfo?.user_gender}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="wifi" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Identifies as female temp</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="heart-half-outline" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Straight temp</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="male-female" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>User is open to {Array.isArray(userInfo.user_open_to)
                ? userInfo.user_open_to.join(', ')
                : JSON.parse(userInfo.user_open_to).join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="flag" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>User sexuality {userInfo.user_sexuality}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="flag" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>American</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="flag" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>User Suburb {userInfo.user_suburb}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="body" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Athletic body type</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="school" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Bachelor’s Degree</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="briefcase" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Accountant</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cafe" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Does not smoke</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="beer" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Drinks 1-2 times per week</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="alert-circle" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Atheist</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="planet" size={16} color="#bbb" style={{ marginRight: 8 }} />
            <Text style={styles.detailText}>Virgo</Text>
          </View>

          {/* Example slider for video position if you want */}
          {/* 
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={videoDuration}
              value={videoPosition}
              onValueChange={handleSeek}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FF6347"
            />
          </View>
          */}
        </ScrollView>
      </Animated.View>

      {/* 
        BOTTOM NAV BAR 
        Also on top (high zIndex)
      */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleClosePress}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------------------------
// STYLES
// ----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Top bar (zIndex automatically above the video)
  topBar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999, // ensure it's on top
  },
  topCounter: {
    color: '#ccc',
    fontSize: 16,
  },

  // Background video
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideoText: {
    color: '#fff',
    fontSize: 18,
  },

  // Play/Pause
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 15,
    borderRadius: 50,
    zIndex: 9999,
  },
  playPauseText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  // Floating L/R arrows, X, heart
  matchActionsContainer: {
    position: 'absolute',
    bottom: 120, // above the nav bar
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 9999, // keep on top
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  // The bottom sheet (zIndex lower than the top items, so behind them)
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 11, // behind matchActions and nav bar
  },
  dragIndicator: {
    alignSelf: 'center',
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#555',
    marginVertical: 10,
  },
  bottomSheetScroll: {
    paddingHorizontal: 20,
    paddingBottom: 100, // space for nav
  },

  // Name + heart
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  nameText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  attendanceText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },

  // Chips
  chipsRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#333',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    color: '#fff',
    fontSize: 13,
  },

  // Details
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#bbb',
    marginRight: 8,
  },
  detailText: {
    color: '#ccc',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },

  // The persistent bottom nav bar
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 9999, // always on top
  },
  navItem: {
    padding: 10,
  },

  // Info text for loading/error
  infoText: {
    color: '#fff',
  },
});
