import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchPopUp from './MatchPopUp';
import ViewProfile from './ViewProfile';

import AccountUserImg from '../src/Assets/Images/accountUser.jpg'; // Update the path if necessary
import profileImg from '../src/Assets/Images/profileimg.png'; // Update the path if necessary
import like from '../src/Assets/Images/like.png'; // Update the path if necessary
import likedImg from '../src/Assets/Images/filledheart.png'; // Update the path if necessary
const MatchDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { user, source } = route.params || {};
    const [isRightHeartFilled, setIsRightHeartFilled] = useState(source === 'usersWhoYouSelected' || source === 'matchedResults');
    const [showPopup, setShowPopup] = useState(false);
    const [liked, setLiked] = useState(like);
    const [isFlipped, setIsFlipped] = useState(false);
    const [AccountUser, setAccountUser] = useState([]);
    const userId = 'your_user_id'; // Replace with logic to get the userId (local storage or async storage)
    const popupRef = useRef(null);
    const isLeftHeartVisible = source === 'usersWhoSelectedYou' || source === 'matchedResults';

    useEffect(() => {
        const fetchAccountUserInfo = async () => {
            try {
                const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
                const userData = res.data.result[0];
                console.log("MATCHING DETAILS",userData)
                setAccountUser([{
                    name: userData.user_first_name,
                    age: userData.user_age,
                    gender: userData.user_gender,
                    where: userData.suburb,
                    source: 'Account user',
                }]);
            } catch (error) {
                console.error('Error fetching account user data', error);
            }
        };
        fetchAccountUserInfo();
    }, [userId]);

    const handleRightHeartClick = async () => {
        const newHeartState = !isRightHeartFilled;
        const formData = new FormData();
        formData.append('liker_user_id', userId);
        formData.append('liked_user_id', user.user_uid);

        try {
            if (newHeartState) {
                await axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', formData);
            } else {
                await axios.delete('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes', { data: formData });
            }
            setIsRightHeartFilled(newHeartState);
        } catch (error) {
            console.error('Error handling like action', error);
        }
    };

    const handleSetLiked = () => {
        setLiked(prevState => !prevState);
        handleRightHeartClick();
    };

    const handleNavigate = () => {
        // Pass the selected user's details to the ViewProfile screen
        navigation.navigate('ViewProfile', { user: user });
    };
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (!user) {
        return <ActivityIndicator size="large" color="#E4423F" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Image source={user.user_photo_url ? { uri: JSON.parse(user.user_photo_url)[0] } : profileImg} style={styles.profileImage} />
                {isLeftHeartVisible && isRightHeartFilled && showPopup && (
                    <View style={styles.popup}>
                        <MatchPopUp user={user} AccountUser={AccountUser} />
                    </View>
                )}
                <Text style={styles.userName}>{user.user_first_name + ' ' + user.user_last_name}</Text>
                <Text style={styles.userDetails}>{user.user_age} - {user.user_gender} - {user.user_country}</Text>
                <TouchableOpacity onPress={handleFlip}>
                    <Text style={styles.flipText}>Tap to See Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSetLiked}>
                    <Image source={isRightHeartFilled ? likedImg : like} style={styles.likeIcon} />
                </TouchableOpacity>
                {isLeftHeartVisible && <Image source={likedImg} style={styles.leftHeartIcon} />}
            </View>

            <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#E4423F',
        padding: 30,
        borderRadius: 10,
        justifyContent: 'center',
        position: 'relative',
        minHeight: 600,
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    userName: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
    },
    userDetails: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    flipText: {
        color: 'white',
        fontSize: 18,
        marginTop: 15,
    },
    likeIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 20,
        top: 20,
    },
    leftHeartIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 20,
        top: 20,
    },
    button: {
        backgroundColor: '#E4423F',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    popup: {
        position: 'absolute',
        bottom: '10%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 5,
    },
});

export default MatchDetails;