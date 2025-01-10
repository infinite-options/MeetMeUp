import React, { useState } from 'react';
import {
    SafeAreaView,
    Platform,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MatchPreferences = () => {
    const [maxDistance, setMaxDistance] = useState(80);
    const [ageRange, setAgeRange] = useState([18, 99]);
    const [heightRange, setHeightRange] = useState([122, 213]);
    const [numChildren, setNumChildren] = useState(0);
    const [bodyType, setBodyType] = useState(['Slim', 'Athletic', 'Curvy']);
    const [smokingHabit, setSmokingHabit] = useState('No');
    const [drinkingHabit, setDrinkingHabit] = useState('No');
    const [religiousPreference, setReligiousPreference] = useState('Any');
    const navigation = useNavigation();

    const handleAgeValueChange = (values) => setAgeRange(values);
    const handleHeightValueChange = (values) => setHeightRange(values);

    const toggleSelection = (category, value) => {
        switch (category) {
            case 'BodyType':
                setBodyType(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
                break;
            case 'Smoking':
                setSmokingHabit(value);
                break;
            case 'Drinking':
                setDrinkingHabit(value);
                break;
        }
    };

    const storePreferencesLocally = async () => {
        try {
            await AsyncStorage.setItem('user_prefer_body_type', JSON.stringify(bodyType));
            await AsyncStorage.setItem('user_prefer_smoking', smokingHabit);
            await AsyncStorage.setItem('user_prefer_drinking', drinkingHabit);
            await AsyncStorage.setItem('user_prefer_religion', religiousPreference);
        } catch (error) {
            console.error('Error storing preferences:', error);
        }
    };

    const handleFindMatch = async () => {
        try {
            const uid = await AsyncStorage.getItem('user_uid');
            const email = await AsyncStorage.getItem('user_email_id');

            if (!uid || !email) {
                console.error('Missing user credentials');
                return;
            }

            const formData = new FormData();
            formData.append('user_uid', uid);
            formData.append('user_email_id', email);
            formData.append('user_prefer_distance', maxDistance.toString());
            formData.append('user_prefer_age_min', ageRange[0].toString());
            formData.append('user_prefer_age_max', ageRange[1].toString());
            formData.append('user_prefer_height_min', heightRange[0].toString());
            // formData.append('user_prefer_height_max', heightRange[1].toString());
            formData.append('user_prefer_kids', numChildren.toString());
            formData.append('user_prefer_gender', 'Female');

            // First store preferences locally
            await storePreferencesLocally();

            // Make the API call with proper headers
            const response = await axios.put(
                'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo', 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 10000 // 10 second timeout
                }
            );

            console.log('API Response:', response.data);
            
            // Only navigate if the API call was successful
            navigation.navigate('MatchProfileDisplay');
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // You might want to show an error message to the user here
            Alert.alert(
                'Error',
                'Unable to update preferences. Please try again later.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#E4423F" />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>My Preferences</Text>

                    <Text style={styles.label}>Maximum distance from you (km)</Text>
                    <View style={styles.sliderContainer}>
                        <Slider
                            value={maxDistance}
                            onValueChange={setMaxDistance}
                            minimumValue={1}
                            maximumValue={300}
                            step={1}
                            thumbStyle={styles.sliderThumb}
                            minimumTrackTintColor="#E4423F"
                            maximumTrackTintColor="#E5E5E5"
                            trackStyle={styles.trackStyle}
                        />
                        <Text style={styles.valueText}>{maxDistance} km</Text>
                    </View>

                    <Text style={styles.label}>Age Range</Text>
                    <View style={styles.sliderContainer}>
                        <MultiSlider
                            values={ageRange}
                            onValuesChange={handleAgeValueChange}
                            min={18}
                            max={99}
                            selectedStyle={{ backgroundColor: '#E4423F', height: 5 }}
                            trackStyle={[styles.trackStyle, { height: 5 }]}
                            markerStyle={styles.sliderThumb}
                            unselectedStyle={{ backgroundColor: '#E5E5E5', height: 5 }}
                        />
                        <Text style={styles.valueText}>{ageRange[0]} - {ageRange[1]}</Text>
                    </View>

                    <Text style={styles.label}>Height Range (cm)</Text>
                    <View style={styles.sliderContainer}>
                        <MultiSlider
                            values={heightRange}
                            onValuesChange={handleHeightValueChange}
                            min={122}
                            max={213}
                            selectedStyle={{ backgroundColor: '#E4423F' }}
                            trackStyle={styles.trackStyle}
                            markerStyle={styles.sliderThumb}
                            unselectedStyle={{ backgroundColor: '#E5E5E5' }}
                        />
                        <Text style={styles.valueText}>{heightRange[0]} cm - {heightRange[1]} cm</Text>
                    </View>

                    <Text style={styles.label}>Maximum # of children</Text>
                    <View style={styles.sliderContainer}>
                        <Slider
                            value={numChildren}
                            onValueChange={setNumChildren}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            thumbStyle={styles.sliderThumb}
                            minimumTrackTintColor="#E4423F"
                            maximumTrackTintColor="#E5E5E5"
                            trackStyle={styles.trackStyle}
                        />
                        <Text style={styles.valueText}>{numChildren}</Text>
                    </View>

                    <Text style={styles.label}>Body Type</Text>
                    <View style={styles.interestsContainer}>
                        {['Slim', 'Athletic', 'Curvy', 'Plus Sized', 'Few Extra Pounds'].map((type) => {
                            const isSelected = bodyType.includes(type);
                            return (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleSelection('BodyType', type)}
                                    style={[
                                        styles.interestButton,
                                        {
                                            borderColor: isSelected ? '#000' : '#CCC',
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            {
                                                backgroundColor: isSelected ? '#000' : 'transparent',
                                                borderColor: isSelected ? '#000' : '#CCC',
                                            },
                                        ]}
                                    >
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={14} color="#FFF" />
                                        )}
                                    </View>
                                    <Text style={{ color: '#000', marginLeft: 5, fontSize: 16 }}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.label}>Smoking Habits</Text>
                    <View style={styles.interestsContainer}>
                        {['Yes', 'No', 'Either'].map((option) => {
                            const isSelected = smokingHabit === option;
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => toggleSelection('Smoking', option)}
                                    style={[
                                        styles.interestButton,
                                        {
                                            borderColor: isSelected ? '#000' : '#CCC',
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            {
                                                backgroundColor: isSelected ? '#000' : 'transparent',
                                                borderColor: isSelected ? '#000' : '#CCC',
                                            },
                                        ]}
                                    >
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={14} color="#FFF" />
                                        )}
                                    </View>
                                    <Text style={{ color: '#000', marginLeft: 5, fontSize: 16 }}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.label}>Drinking Habits</Text>
                    <View style={styles.interestsContainer}>
                        {['Yes', 'No', 'Either'].map((option) => {
                            const isSelected = drinkingHabit === option;
                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => toggleSelection('Drinking', option)}
                                    style={[
                                        styles.interestButton,
                                        {
                                            borderColor: isSelected ? '#000' : '#CCC',
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circle,
                                            {
                                                backgroundColor: isSelected ? '#000' : 'transparent',
                                                borderColor: isSelected ? '#000' : '#CCC',
                                            },
                                        ]}
                                    >
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={14} color="#FFF" />
                                        )}
                                    </View>
                                    <Text style={{ color: '#000', marginLeft: 5, fontSize: 16 }}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.label}>Religious Preference</Text>
                    <TextInput
                        style={styles.input}
                        value={religiousPreference}
                        onChangeText={setReligiousPreference}
                        placeholder="Any"
                    />
                </View>
            </ScrollView>

            <Pressable
                style={styles.continueButton}
                onPress={handleFindMatch}
            >
                <Text style={styles.continueButtonText}>Find my match!</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    backButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 8,
        marginBottom: 20,
        marginTop: 30,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    interestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    circle: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderContainer: {
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    valueText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'right',
        marginTop: 5,
        paddingRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 12,
        marginBottom: 25,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
    },
    continueButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4423F',
        borderRadius: 30,
        marginBottom: 20,
    },
    continueButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sliderThumb: {
        width: 19,
        height: 19,
        backgroundColor: '#E4423F',
        borderRadius: 19/2,
        borderWidth: 0,
    },
    trackStyle: {
        height: 5,
        borderRadius: 2.5,
    },
});

export default MatchPreferences;
