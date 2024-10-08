import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function MatchPopUp({ user, userStates, setUserStates, index }) {
    const navigation = useNavigation();
    const [accountUser, setAccountUser] = useState([]);
    const userId = AsyncStorage.getItem('user_uid'); // Get user ID from AsyncStorage

    const handleBegin = (user) => {
        navigation.navigate('Begin', { user, accountUser });
    };

    const handleContinue = async () => {
        if (userStates) {
            const updatedStates = [...userStates];
            updatedStates[index].liked = false;
            updatedStates[index].showPopup = false;
            setUserStates(updatedStates);

            const fd = new FormData();
            fd.append('liker_user_id', userId);
            fd.append('liked_user_id', user.user_uid);

            try {
                await axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: fd });
                console.log('User unliked successfully');
            } catch (error) {
                console.error('Error unliking user:', error);
            }
        }
        navigation.navigate('Match');
    };

    useEffect(() => {
        const fetchAccountUser = async () => {
            try {
                const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
                const userData = res.data.result[0];
                setAccountUser([{
                    name: userData.user_first_name,
                    age: userData.user_age,
                    gender: userData.user_gender,
                    where: userData.suburb,
                    photo: userData.user_photo_url ? JSON.parse(userData.user_photo_url)[0] : ''
                }]);
            } catch (error) {
                console.error('Error fetching account user data:', error);
            }
        };
        fetchAccountUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: accountUser.length > 0 && accountUser[0].photo ? accountUser[0].photo : '' }}
                    style={[styles.avatar, { zIndex: 1 }]}
                />
                <Image
                    source={{ uri: user.user_photo_url ? JSON.parse(user.user_photo_url) : '' }}
                    style={[styles.avatar, styles.overlappingAvatar]}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.matchText}>It's A Match!</Text>
                <Text style={styles.bodyText}>
                    Let's start by creating a date with {"\n"}
                    {user.user_first_name} {user.user_last_name} and you
                </Text>
                <TouchableOpacity onPress={() => handleBegin(user)} style={styles.button}>
                    <Text style={styles.buttonText}>Begin!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    overlappingAvatar: {
        marginLeft: -30,
        borderWidth: 5,
        zIndex: 0,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchText: {
        fontSize: 24,
        color: '#E4423F',
        marginTop: 10,
        textAlign: 'center',
    },
    bodyText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#E4423F',
        borderRadius: 25,
        height: 45,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textTransform: 'none',
        fontFamily: 'Segoe UI',
    },
});
