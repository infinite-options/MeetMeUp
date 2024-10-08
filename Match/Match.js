import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import profileImg from '../src/Assets/Images/profileimg.png';
import like from '../src/Assets/Images/like.png';
import likedImg from '../src/Assets/Images/filledheart.png';
import MatchPopUp from "./MatchPopUp";
const Match = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Load userId once from AsyncStorage
    useEffect(() => {
        const loadUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('user_uid');
                console.log("FOR MATCH PAGE", storedUserId);
                setUserId(storedUserId);
            } catch (error) {
                console.error("Error loading user ID from AsyncStorage:", error);
            }
        };
        loadUserId();
    }, []);

    // Fetch match data and initialize the liked state
    useEffect(() => {
        const fetchMatches = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`);
                    console.log("Full API Response:", res.data);
                    if (res.data.result && Array.isArray(res.data.result)) {
                        setUserData(res.data.result);

                        // Initialize user states based on AsyncStorage liked status
                        const initialUserStates = await Promise.all(
                            res.data.result.map(async (user) => {
                                const isLiked = await AsyncStorage.getItem(`liked_${user.user_uid}`);
                                return { isFlipped: false, liked: isLiked === 'true' };
                            })
                        );
                        setUserStates(initialUserStates);
                    } else {
                        console.log('API did not return expected data structure:', res.data);
                    }
                } catch (error) {
                    console.log('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.log("No userId found.");
                setIsLoading(false);
            }
        };
        fetchMatches();
    }, [userId]);

    // Handle navigation to the profile view
    const handleProfile = (user) => {
        navigation.navigate("ViewProfile", { user });
    };

    // Handle like/unlike functionality and update AsyncStorage
    const handleLike = async (index, user) => {
        const updatedLikedStatus = !userStates[index]?.liked;
        setUserStates(prevStates => 
            prevStates.map((state, i) => i === index ? { ...state, liked: updatedLikedStatus } : state)
        );

        const formData = new FormData();
        formData.append('liker_user_id', userId);
        formData.append('liked_user_id', user.user_uid);

        try {
            if (updatedLikedStatus) {
                await axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', formData);
                await AsyncStorage.setItem(`liked_${user.user_uid}`, 'true');
            } else {
                await axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: formData });
                await AsyncStorage.removeItem(`liked_${user.user_uid}`);
            }
        } catch (error) {
            console.error('Error handling like action', error);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E4423F" />
                <Text>Loading Matches...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {userData.length === 0 ? (
                    <Text>No matches found.</Text>
                ) : (
                    userData.map((user, index) => (
                        <View key={user.user_uid || index} style={styles.cardContainer}>
                            <View style={styles.card}>
                                <TouchableOpacity onPress={() => handleLike(index, user)} style={styles.likeButton}>
                                    <Image source={userStates[index]?.liked ? likedImg : like} style={styles.likeIcon} />
                                </TouchableOpacity>
                                <Image source={user.user_photo_url ? { uri: user.user_photo_url } : profileImg} style={styles.profileImage} />
                                <Text style={styles.userName}>
                                    {user.user_first_name || 'Unknown'} {user.user_last_name || 'User'}
                                </Text>
                                <Text style={styles.userDetails}>
                                    {user.user_age || 'N/A'} - {user.user_gender || 'N/A'} - {user.user_suburb || 'N/A'}
                                </Text>
                                <TouchableOpacity onPress={() => handleProfile(user)} style={styles.profileButton}>
                                    <Text style={styles.flipText}>Tap to See Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('MatchPreferences')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectionResults')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#E4423F',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: 400,
        justifyContent: 'space-between',
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '75%',
        borderRadius: 10,
    },
    userName: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
    },
    userDetails: {
        fontSize: 12,
        color: 'white',
    },
    flipText: {
        color: 'white',
        fontSize: 18,
    },
    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    likeIcon: {
        width: 30,
        height: 30,
    },
    profileButton: {
        backgroundColor: '#E4423F',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#E4423F',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Match;
