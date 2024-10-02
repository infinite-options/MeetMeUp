import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function MatchPopUp({ user, userStates, setUserStates, index }) {
    const navigation = useNavigation();
    const [AccountUser, setAccountUser] = useState([]);

    const handleBegin = (user) => {
        navigation.navigate('BeginScreen', { user, AccountUser });
    };

    const handleContinue = async () => {
        const userId = await AsyncStorage.getItem('user_uid');
        if (userStates) {
            const updatedStates = [...userStates];
            updatedStates[index].liked = false;
            updatedStates[index].showPopup = false;
            setUserStates(updatedStates);

            const fd = new FormData();
            fd.append('liker_user_id', userId);
            fd.append('liked_user_id', user.user_uid);

            axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: fd })
                .then(res => {
                    console.log(res);
                });
        }
        navigation.navigate('MatchScreen');
    };

    useEffect(() => {
        const fetchAccountUser = async () => {
            const userId = await AsyncStorage.getItem('user_uid');
            axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`)
                .then(res => {
                    const userData = res.data.result[0];
                    setAccountUser([{
                        name: userData.user_first_name,
                        age: userData.user_age,
                        gender: userData.user_gender,
                        where: userData.suburb,
                        photo: userData.user_photo_url
                    }]);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchAccountUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.avatarsContainer}>
                <Image
                    source={{ uri: AccountUser.length > 0 && AccountUser[0].photo ? JSON.parse(AccountUser[0].photo)[0] : '' }}
                    style={styles.avatar}
                />
                <Image
                    source={{ uri: user.user_photo_url ? JSON.parse(user.user_photo_url) : '' }}
                    style={[styles.avatar, styles.matchedAvatar]}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.titleText}>It's A Match!</Text>
                <Text style={styles.bodyText}>
                    Let's start by creating a date with {user.user_first_name} {user.user_last_name} and you
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => handleBegin(user)}>
                    <Text style={styles.buttonText}>Begin!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    matchedAvatar: {
        marginLeft: -30,
        borderWidth: 5,
        borderColor: 'white',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 20,
    },
    titleText: {
        fontSize: 24,
        color: '#E4423F',
        marginTop: 10,
        textAlign: 'center',
    },
    bodyText: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#E4423F',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});
