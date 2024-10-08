import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import PreferenceSlider from './PreferencesSlider';
import arrow2 from '../src/Assets/Images/arrow2.png'; // Ensure you correctly reference your assets
import BackButton from '../src/Assets/Images/BackButton.png';
import { SafeAreaView } from 'react-native-safe-area-context';
const MatchPreferences = ({ prev }) => {
    const [open, setOpen] = useState(false);
    const navigation = useNavigation(); // Use this to navigate between screens in React Native

    const handleOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    const handleBack=()=>{
        navigation.replace('AccountSetup7Summary');
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
               <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image onPress={handleBack} source={BackButton} style={styles.arrowIcon} />
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
                <TouchableOpacity onPress={() => navigation.navigate('SelectionResults')}>
                    <Text style={styles.button}>Match Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Match')}>
                    <Text style={styles.button}>Grid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SelectionResults')}>
                    <Text style={styles.button}>My Matches</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        
    },
    button: {
        width: 130,
        backgroundColor: '#E4423F',
        borderRadius: 25,
        height: 45,
        color: 'white',
        textAlign: 'center',
        lineHeight: 45, // Centers text vertically
        marginBottom: 20,
        fontSize: 18,
        fontFamily: 'Segoe UI',
        
    },
    backButton: {
        marginRight: 16,
        position: 'absolute',
        top: 10, // Adjust based on your design
        left: 10, // Adjust based on your design
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, // Circular button
        backgroundColor: '#f0f0f0',
      },
});

export default MatchPreferences;
