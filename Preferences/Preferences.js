import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PreferenceSlider from './PreferencesSlider';
import arrow2 from '../src/Assets/Images/arrow2.png';
import BackButton from '../src/Assets/Images/BackButton.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MatchPreferences = () => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation();

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

                    <PreferenceSlider preference="Maximum distance" measurement="km." start={80} min={1} max={160} />
                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Looking for</Text>
                        <View style={styles.row}>
                            <Text style={styles.option}>Men</Text>
                            <Image source={arrow2} style={[styles.arrow, styles.arrowSpacing]} />
                        </View>
                    </View>
                    <View style={styles.separator} />

                    <PreferenceSlider preference="Age range" start={[20, 40]} min={18} max={80} />
                    <View style={styles.separator} />

                    <PreferenceSlider preference="Height in centimetres" start={150} min={75} max={225} />
                    <View style={styles.separator} />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Match')}>
                            <Text style={styles.buttonText}>Match Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectionResults')}>
                            <Text style={styles.buttonText}>My Matches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
    container: {
        marginHorizontal: '5%',
        paddingHorizontal: '10%',
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 24,
        fontFamily: 'Lexend', // You can define custom fonts if needed
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: 'Lexend',
    },
    option: {
        fontSize: 18,
    },
    arrow: {
        width: 20,
        height: 20,
    },
    arrowSpacing: {
        marginLeft: 10,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#CECECE',
        marginVertical: 10,
    },  buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: 180,
        backgroundColor: '#E4423F',
        borderRadius: 25,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Segoe UI',
        textAlign: 'center',
    },
});

export default MatchPreferences;
