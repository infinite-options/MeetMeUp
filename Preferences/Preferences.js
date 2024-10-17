import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PreferenceSlider from './PreferencesSlider';
import arrow2 from '../src/Assets/Images/arrow2.png';
import BackButton from '../src/Assets/Images/BackButton.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MatchPreferences = () => {
    const [gender, setGender] = useState('Male');
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [maxDistance, setMaxDistance] = useState(80);
    const [ageRange, setAgeRange] = useState({ min: 20, max: 50 });
    const [height, setHeight] = useState(150);
    
    const navigation = useNavigation();
    const prefer_gender = ["Male", "Female", "Nonbinary"];

    useEffect(() => {
        // Fetch user data on component mount if needed
        // similar to the web code
    }, []);

    const handleBack = () => {
        navigation.replace('AccountSetup7Summary');
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            console.log('All AsyncStorage data cleared on logout');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
        navigation.navigate('AccountSetup1Login');
    };

    const handleGenderSelect = async (selectedGender) => {
        setGender(selectedGender);
        setGenderModalVisible(false);
        
        // Fetch user data from AsyncStorage (or directly from API if needed)
        const userId = await AsyncStorage.getItem('user_uid');
        const userEmail = await AsyncStorage.getItem('user_email_id');

        // Create form data for the PUT request
        const formData = new FormData();
        formData.append('user_uid', userId);
        formData.append('user_email_id', userEmail);
        formData.append('user_prefer_gender', selectedGender);

        // Make the API call
        axios.put("https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo", formData)
            .then(() => {
                console.log(`Gender preference updated to ${selectedGender}`);
            })
            .catch((error) => {
                console.error('Error updating gender preference:', error);
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Image source={BackButton} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Match Preferences</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Location</Text>
                        <Image source={arrow2} style={styles.arrow} />
                    </View>
                    <View style={styles.separator} />

                    <PreferenceSlider 
                        preference="Maximum distance" 
                        measurement="km." 
                        start={maxDistance} 
                        min={1} 
                        max={160}
                        onChange={(value) => setMaxDistance(value)} 
                    />
                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Looking for</Text>
                        <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
                            <View style={styles.row}>
                                <Text style={styles.option}>{gender}</Text>
                                <Image source={arrow2} style={[styles.arrow, styles.arrowSpacing]} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator} />

                    <PreferenceSlider 
                        preference="Age range" 
                        start={[ageRange.min, ageRange.max]} 
                        min={18} 
                        max={80}
                        onChange={(value) => setAgeRange({ min: value[0], max: value[1] })} 
                    />
                    <View style={styles.separator} />

                    <PreferenceSlider 
                        preference="Height in centimetres" 
                        start={height} 
                        min={75} 
                        max={225}
                        onChange={(value) => setHeight(value)} 
                    />
                    <View style={styles.separator} />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Match', { gender, maxDistance, ageRange, height })}>
                            <Text style={styles.buttonText}>Match Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectionResults')}>
                            <Text style={styles.buttonText}>My Matches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Gender Selection Modal */}
                    <Modal
                        transparent={true}
                        visible={genderModalVisible}
                        animationType="slide"
                        onRequestClose={() => setGenderModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Select Gender</Text>
                                <FlatList
                                    data={prefer_gender}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleGenderSelect(item)} style={styles.modalOption}>
                                            <Text style={styles.modalOptionText}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity onPress={() => setGenderModalVisible(false)} style={styles.modalCloseButton}>
                                    <Text style={styles.modalCloseButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};





const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    container: {
         marginHorizontal: '5%', 
         paddingHorizontal: '10%' 
    },
    title: { 
        textAlign: 'center', 
        marginTop: 20, 
        fontSize: 24, 
        fontFamily: 'Lexend' 
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 20 
    },
    label: { 
        fontSize: 18, 
        fontFamily: 'Lexend' 
    },
    option: { fontSize: 18 },
    arrow: { width: 20, height: 20 },
    separator: { borderBottomWidth: 1, borderBottomColor: '#CECECE', marginVertical: 10 },
    buttonsContainer: { flexDirection: 'column', alignItems: 'center', marginTop: 40 },
    button: { width: 180, backgroundColor: '#E4423F', borderRadius: 25, height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    buttonText: { color: 'white', fontSize: 18, fontFamily: 'Segoe UI', textAlign: 'center' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    modalOption: { paddingVertical: 10, width: '100%', alignItems: 'center' },
    modalOptionText: { fontSize: 18 },
    modalCloseButton: { marginTop: 10 },
    modalCloseButtonText: { fontSize: 16, color: 'red' },
});

export default MatchPreferences;
