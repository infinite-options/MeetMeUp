import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ViewProfile from './ViewProfile'; // Assuming this is correctly set up
import AccountContext from '../AccountSetup/AccountContext';

import profileImg from '../src/Assets/Images/profileimg.png'; // Correct the path if necessary
import like from '../src/Assets/Images/like.png'; // Correct the path if necessary
import likedImg from '../src/Assets/Images/filledheart.png'; // Correct the path if necessary

const Match = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [userSelections, setUserSelections] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state to handle async requests
    const { selections, setSelections } = useContext(AccountContext);

    const loadUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_uid');
            console.log("FOR MATCH PAGE", userId);
            return userId;
        } catch (error) {
            console.error("Error loading user ID from AsyncStorage:", error);
        }
    };

    const handleNavigate = async () => {
        // Save the final data
        let selectArray = [];
        for (let i = 0; i < userStates.length; i++) {
            if (userStates[i].liked === true) {
                selectArray.push(userData[i]);
            }
        }
        setSelections(selectArray);
        console.log('final userSelections:', selectArray);
        navigation.navigate('GridScreen');
    };

    useEffect(() => {
        const fetchMatches = async () => {
            const userId = await loadUserId();
            if (userId) {
                axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`)
                    .then(res => {
                        console.log("Full API Response:", res.data);
                        if (res.data.result && Array.isArray(res.data.result)) {
                            setUserData(res.data.result);
                            const initialUserStates = res.data.result.map(() => ({
                                isFlipped: false,
                                liked: false
                            }));
                            setUserStates(initialUserStates);
                            setIsLoading(false);
                        } else {
                            console.log('API did not return expected data structure:', res.data);
                            setIsLoading(false);
                        }
                    })
                    .catch(error => {
                        console.log('Error fetching data:', error);
                        setIsLoading(false);
                    });
            } else {
                console.log("No userId found.");
                setIsLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const handleFlip = (index) => {
        const updatedStates = [...userStates];
        updatedStates[index].isFlipped = !updatedStates[index].isFlipped;
        setUserStates(updatedStates);
    };

    const handleLike = (index, user) => {
        const updatedStates = [...userStates];
        updatedStates[index].liked = !updatedStates[index].liked;
        setUserStates(updatedStates);

        const fd = new FormData();
        AsyncStorage.getItem('user_uid').then(userId => {
            fd.append('liker_user_id', userId);
            fd.append('liked_user_id', user.user_uid);

            if (updatedStates[index].liked === true) {
                axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', fd)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));
            } else {
                axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: fd })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err));
            }
        });
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
                {userData && userData.map((user, index) => (
                    <View key={user.user_id || index} style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Image source={profileImg} style={styles.profileImage} />

                            <Text style={styles.userName}>
                                {user?.user_first_name || 'Unknown'} {user?.user_last_name || 'User'}
                            </Text>
                            <Text style={styles.userDetails}>
                                {user?.user_age || 'N/A'} - {user?.user_gender || 'N/A'} - {user?.user_suburb || 'N/A'}
                            </Text>
                            <TouchableOpacity onPress={() => handleFlip(index)}>
                                <Text style={styles.flipText}>Tap to See Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLike(index, user)}>
                                <Image source={userStates[index]?.liked ? likedImg : like} style={styles.likeIcon} />
                            </TouchableOpacity>
                        </View>

                        {userStates[index]?.isFlipped && (
                            <ViewProfile
                                setIsFlipped={() => handleFlip(index)}
                                liked={userStates[index]?.liked}
                                onClick={() => handleLike(index, user)}
                                userData={user}
                            />
                        )}
                    </View>
                ))}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('MatchPreferences')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNavigate}>
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
        padding: 20,
        borderRadius: 10,
        position: 'relative',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: 200,
    },
    userName: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        top: '10%',
    },
    userDetails: {
        fontSize: 10,
        color: 'white',
        position: 'absolute',
        top: '14%',
    },
    flipText: {
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        bottom: '2%',
    },
    likeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 30,
        height: 30,
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
