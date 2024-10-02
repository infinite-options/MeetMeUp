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
    const navigation = useNavigation();
    const route = useRoute();
    const { user, source } = route.params || {};
    const [isRightHeartFilled, setIsRightHeartFilled] = useState(source === 'usersWhoYouSelected');
    const [showPopup, setShowPopup] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [liked, setLiked] = useState(like);
    const popupRef = useRef(null);
    const isLeftHeartVisible = source === 'usersWhoSelectedYou';

    const handleRightHeartClick = () => {
        const newHeartState = !isRightHeartFilled;
        setIsRightHeartFilled(newHeartState);
        if (isLeftHeartVisible && newHeartState) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    };

    const handleSetLiked = () => {
        setLiked(prevState => !prevState);
        handleRightHeartClick();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleNavigate = () => {
        navigation.navigate('GridScreen');
    };

    const AccountUser = [
        { name: 'Hawk Tuah Tey', age: 40, gender: 'female', where: 'Mandurah', src: AccountUserImg, source: 'Account user' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClosePopup();
            }
        };
        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.cardContainer}>
                {isLeftHeartVisible && isRightHeartFilled && showPopup && (
                    <View style={styles.popup}>
                        <View style={styles.popupContent} ref={popupRef}>
                            <MatchPopUp user={user} AccountUser={AccountUser} />
                        </View>
                    </View>
                )}
                <View style={styles.card}>
                    <Image source={user.src ? { uri: user.src } : profileImg} style={styles.profileImage} />
                    <Text style={styles.userName}>
                        {user.user_first_name + ' ' + user.user_last_name}
                    </Text>
                    <Text style={styles.userDetails}>
                        {user.user_age} - {user.user_gender} - {user.user_country}
                    </Text>
                    <TouchableOpacity onPress={() => setIsFlipped(true)}>
                        <Text style={styles.flipText}>Tap to See Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSetLiked}>
                        <Image source={liked ? like : likedImg} style={styles.likeIcon} />
                    </TouchableOpacity>
                    {isLeftHeartVisible && (
                        <Image source={likedImg} style={styles.leftHeartIcon} />
                    )}
                </View>

                <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>

            <ViewProfile
                setIsFlipped={setIsFlipped}
                liked={liked}
                onClick={handleSetLiked}
                showPopup={showPopup}
                isLiked={isLeftHeartVisible}
                user={user}
                AccountUser={AccountUser}
                setShowPopup={setShowPopup}
                userData={user}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    cardContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#E4423F',
        paddingTop: 30,
        paddingBottom: 50,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 600,
        maxWidth: 414,
        margin: '0 auto',
        marginTop: 20,
    },
    profileImage: {
        width: '100%',
        height: 400,
    },
    userName: {
        position: 'absolute',
        zIndex: 10,
        top: '10%',
        color: 'white',
        fontSize: 20,
    },
    userDetails: {
        position: 'absolute',
        zIndex: 10,
        top: '14%',
        color: 'white',
        fontSize: 10,
    },
    flipText: {
        position: 'absolute',
        zIndex: 10,
        bottom: '2%',
        color: 'white',
        fontSize: 18,
    },
    likeIcon: {
        position: 'absolute',
        right: '2%',
        top: '1%',
        width: 30,
        height: 30,
    },
    leftHeartIcon: {
        position: 'absolute',
        left: '2%',
        top: '1%',
        width: 30,
        height: 30,
    },
    button: {
        backgroundColor: '#E4423F',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    popup: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
});

export default MatchDetails;
