import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AccountContext from '../AccountSetup/AccountContext';
import profileImg from '../src/Assets/Images/profileimg.png';
import like from '../src/Assets/Images/like.png';
import likedImg from '../src/Assets/Images/filledheart.png';

const Match = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState([]);
    const [userStates, setUserStates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { selections, setSelections } = useState();
    const [userId, setUserId] = useState(null);

    // Load userId once
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

    useEffect(() => {
        const fetchMatches = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`);
                    console.log("Full API Response:", res.data);
                    if (res.data.result && Array.isArray(res.data.result)) {
                        setUserData(res.data.result);
                        const initialUserStates = res.data.result.map(() => ({
                            isFlipped: false,
                            liked: false,
                        }));
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

    const handleNavigate = () => {
        const selectedUsers = userData.filter((_, index) => userStates[index]?.liked);
        setSelections(selectedUsers);
        console.log('final userSelections:', selectedUsers);
        navigation.navigate('GridScreen');
    };

    const handleFlip = (index) => {
        setUserStates(prevStates => prevStates.map((state, i) =>
            i === index ? { ...state, isFlipped: !state.isFlipped } : state
        ));
    };

    const handleProfile = (user) => {
        // Navigate to ViewProfile and pass the user data
        navigation.navigate("ViewProfile", { user });
    };
    

    const handleLike = (index, user) => {
        setUserStates(prevStates => prevStates.map((state, i) =>
            i === index ? { ...state, liked: !state.liked } : state
        ));

        const formData = new FormData();
        formData.append('liker_user_id', userId);
        console.log(userId);
        formData.append('liked_user_id', user.user_uid);

        if (userStates[index]?.liked === false) {
            axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: formData })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
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
                {userData.length === 0 && (
                    <Text>No matches found.</Text>
                )}
                {userData.map((user, index) => (
                    <View key={user.user_id || index} style={styles.cardContainer}>
                        <View style={styles.card}>
                            <Image source={user.user_photo_url ? { uri: user.user_photo_url } : profileImg} style={styles.profileImage} />
                            <Text style={styles.userName}>
                                {user?.user_first_name || 'Unknown'} {user?.user_last_name || 'User'}
                            </Text>
                            <Text style={styles.userDetails}>
                                {user?.user_age || 'N/A'} - {user?.user_gender || 'N/A'} - {user?.user_suburb || 'N/A'}
                            </Text>
                            <TouchableOpacity onPress={() => handleProfile(user)}>
                                <Text style={styles.flipText}>Tap to See Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLike(index, user)}>
                                <Image source={userStates[index]?.liked ? likedImg : like} style={styles.likeIcon} />
                            </TouchableOpacity>
                        </View>
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
