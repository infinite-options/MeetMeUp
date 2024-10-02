import React, { useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MatchPopUp from './MatchPopUp';
import Info from './Info';
import profile from '../src/Assets/Images/profile.png';
import searchImg from '../src/Assets/Images/search.png';
import groupImg from '../src/Assets/Images/group.png';
import img1Img from '../src/Assets/Images/img1.png';
import img2Img from '../src/Assets/Images/img2.png';
import img3Img from '../src/Assets/Images/img3.png';
import heightImg from '../src/Assets/Images/height.png';
import genderImg from '../src/Assets/Images/gender.png';
import faithImg from '../src/Assets/Images/faith.png';
import starImg from '../src/Assets/Images/star.png';
import multiImg from '../src/Assets/Images/multi.png';
import hatImg from '../src/Assets/Images/hat.png';
import heartImg from '../src/Assets/Images/heart.png';
import jobImg from '../src/Assets/Images/job.png';
import drinkImg from '../src/Assets/Images/drink.png';
import smokeImg from '../src/Assets/Images/smoke.png';
import flagImg from '../src/Assets/Images/flag.png';
import redlike from '../src/Assets/Images/redlike.png';
import redliked from '../src/Assets/Images/redliked.png';

const ViewProfile = ({ setIsFlipped, liked, onClick, isLiked, showPopup, user, AccountUser, userData }) => {
    // Check if userData exists and fallback to default values if not.
    const name = userData?.user_first_name && userData?.user_last_name
        ? `${userData.user_first_name} ${userData.user_last_name}`
        : 'Unknown Name';
    const age = userData?.user_age || 'Unknown Age';
    const gender = userData?.user_gender || 'Unknown Gender';
    const where = userData?.user_suburb || 'Unknown Location';
    const height = userData?.user_height || 'Unknown Height';
    const religion = userData?.user_religion || 'Unknown Religion';
    const sign = userData?.user_star_sign || 'Unknown Sign';
    const status = userData?.user_open_to || 'Unknown Status';
    const education = userData?.user_education || 'Unknown Education';
    const heart = userData?.user_body_composition || 'Unknown Body Composition';
    const job = userData?.user_job || 'Unknown Job';
    const drink = userData?.user_drinking || 'Unknown Drinking';
    const smoke = userData?.user_smoking || 'Unknown Smoking';
    const flag = userData?.user_nationality || 'Unknown Nationality';
    const popupRef = useRef(null);

    console.log("HELLO HERE IS THE DATA", userData);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {showPopup && (
                <View style={styles.popup}>
                    <View style={styles.popupContent} ref={popupRef}>
                        <MatchPopUp user={user} AccountUser={AccountUser} />
                    </View>
                </View>
            )}
            
            <View style={styles.header}>
                {isLiked && <Image source={redliked} style={styles.likedIcon} />}
                <TouchableOpacity onPress={onClick}>
                    <Image source={liked ? redliked : redlike} style={styles.likeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                <Image source={img1Img} style={styles.image} />
                <Image source={img3Img} style={styles.image} />
            </View>

            <View style={styles.imageContainer}>
                <Image source={img2Img} style={styles.image} />
            </View>

            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.detailsText}>{`${age} - ${gender} - ${where}`}</Text>

            <View style={styles.interestsSection}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.interestsContainer}>
                    {/* <Type type="Cooking" />
                    <Type type="Eating Out" />
                    <Type type="Bike Rides" />
                    <Type type="Travelling" /> */}
                </View>
                <Text style={styles.sectionTitle}>...</Text>
                <Text style={styles.descriptionText}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut.
                    Consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut.
                </Text>

                <Info img={heightImg} info={height} />
                <Info img={genderImg} info={gender} />
                <Info img={faithImg} info={religion} />
                <Info img={starImg} info={sign} />
                <Info img={multiImg} info={status} />
                <Info img={hatImg} info={education} />
                <Info img={heartImg} info={heart} />
                <Info img={jobImg} info={job} />
                <Info img={drinkImg} info={drink} />
                <Info img={smokeImg} info={smoke} />
                <Info img={flagImg} info={flag} />
            </View>

            <View style={styles.videoSection}>
                <TouchableOpacity onPress={() => setIsFlipped(false)}>
                    <Text style={styles.videoText}>Tap To See Video</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    likedIcon: {
        position: 'absolute',
        left: '5%',
        top: '1%',
        width: 30,
        height: 30,
    },
    likeIcon: {
        position: 'absolute',
        right: '5%',
        top: '1%',
        width: 30,
        height: 30,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    image: {
        width: '48%',
        height: 200,
    },
    nameText: {
        fontSize: 30,
        fontFamily: 'Lexend',
        textAlign: 'center',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    interestsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 14,
        marginBottom: 20,
    },
    videoSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    videoText: {
        fontSize: 18,
        fontFamily: 'Lexend',
        marginTop: 10,
    },
});

export default ViewProfile;
