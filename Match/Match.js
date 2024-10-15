import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MatchPopUp from './MatchPopUp';
import like from '../src/Assets/Images/like.png';
import likedImg from '../src/Assets/Images/filledheart.png';
import { Video } from 'expo-av';

const Match = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Helper function to format dynamic alert messages
    const formatMessage = (response) => {
        return Object.entries(response)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    };

    // Initialize user data on component mount
    useEffect(() => {
        const initialize = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('user_uid');
                setUserId(storedUserId);

                if (storedUserId) {
                    const likedResponse = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${storedUserId}`);
                    const likedUserIds = likedResponse.data.people_whom_you_selected.map(user => user.user_uid);
                    const likedByUserIds = likedResponse.data.people_who_selected_you.map(user => user.user_uid);

                    await AsyncStorage.setItem('liked_user_ids', JSON.stringify(likedUserIds));
                    await AsyncStorage.setItem('liked_by_user_ids', JSON.stringify(likedByUserIds));
                }
            } catch (error) {
                console.error("Error initializing data:", error);
            }
        };
        initialize();
    }, []);

    // Fetch matches for the user
    useEffect(() => {
        const fetchMatches = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`);
                    
                    if (res.data.result && Array.isArray(res.data.result)) {
                        setUserData(res.data.result);

                        const storedLikes = await AsyncStorage.getItem('liked_user_ids');
                        const storedLikedBy = await AsyncStorage.getItem('liked_by_user_ids');
                        const likedUserIds = storedLikes ? JSON.parse(storedLikes) : [];
                        const likedByUserIds = storedLikedBy ? JSON.parse(storedLikedBy) : [];

                        const initialUserStates = res.data.result.map(user => ({
                            isFlipped: false,
                            liked: likedUserIds.includes(user.user_uid),
                            likedBy: likedByUserIds.includes(user.user_uid),
                            showPopup: likedUserIds.includes(user.user_uid) && likedByUserIds.includes(user.user_uid),
                        }));
                        setUserStates(initialUserStates);
                    } else {
                        const alertMessage = formatMessage(res.data);
                        Alert.alert("No Matches Found", alertMessage, [{ text: "OK" }]);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    Alert.alert(
                        "Error",
                        "An error occurred while fetching data. Please try again later.",
                        [{ text: "OK" }]
                    );
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchMatches();
    }, [userId]);

    // Handle like/unlike actions
    const handleLike = async (index, user) => {
        const updatedLikedStatus = !userStates[index]?.liked;
        setUserStates(prevStates => {
            const updatedStates = [...prevStates];
            updatedStates[index].liked = updatedLikedStatus;
            updatedStates[index].showPopup = updatedLikedStatus && updatedStates[index]?.likedBy;
            return updatedStates;
        });

        const formData = new FormData();
        formData.append('liker_user_id', userId);
        formData.append('liked_user_id', user.user_uid);

        try {
            if (updatedLikedStatus) {
                await axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', formData);
            } else {
                await axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: formData });
            }
        } catch (error) {
            console.error('Error handling like action', error);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E4423F" />
                <Text>Loading Matches...</Text>
            </View>
        );
    }

    // Main component rendering
    return (
        <ScrollView>
            <View style={styles.container}>
                {userData.length === 0 ? (
                    <Text>No matches found.</Text>
                ) : (
                    userData.map((user, index) => (
                        <View key={user.user_uid || index} style={styles.cardContainer}>
                            {userStates[index].showPopup && (
                                <MatchPopUp
                                    user={user}
                                    userStates={userStates}
                                    setUserStates={setUserStates}
                                    index={index}
                                />
                            )}
                            <View style={styles.card}>
                                <Image
                                    source={userStates[index].likedBy ? likedImg : like}
                                    style={styles.likeButtonLeft}
                                />
                                <TouchableOpacity onPress={() => handleLike(index, user)} style={styles.likeButtonRight}>
                                    <Image source={userStates[index]?.liked ? likedImg : like} style={styles.likeIcon} />
                                </TouchableOpacity>
                                <Video
                                    source={{ uri: JSON.parse(user.user_video_url) }}
                                    style={styles.video}
                                    useNativeControls
                                    resizeMode="cover"
                                    isLooping={true}
                                />
                                <Text style={styles.userName}>{user.user_first_name} {user.user_last_name}</Text>
                                <Text style={styles.userDetails}>{user.user_age} - {user.user_gender} - {user.user_suburb}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("ViewProfile", { user })} style={styles.profileButton}>
                                    <Text style={styles.flipText}>Tap to See Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('MatchPreferences')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Edit Preferences</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectionResults')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>My Matches</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AccountSetup1Login')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Logout</Text>
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
    video: {
        width: '100%',
        height: 300,
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
    likeButtonRight: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    likeButtonLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        width: 30,
        height: 30,
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
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#E4423F',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 25,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Match;
