import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../Assets/Components/NextButton';
import HelperTextBox from '../Assets/Components/helperTextBox'; 
import Progress from '../Assets/Components/Progress';


import backButton from '../Assets/Images/BackButton.png';
import progressBar from '../Assets/Images/progressBar60.png';

export default function AccountSetup4Create() {
    const [option, setOption] = useState('');
    const [formData, setFormData] = useState({
        interestsEatingOut: false,
        interestsBikeRides: false,
        interestsDrinking: false,
        interestsDancing: false,
        interestsCooking: false,
        interestsBaking: false,
        interestsCrafting: false,
        interestsPainting: false,
        interestsSurfing: false,
        interestsTraveling: false,
        height: '',
        education: '',
        body: '',
        star: '',
        drinking: '',
        smoking: '',
        children: '',
        position: '',
        religion: '',
        gender: '',
        nationality: '',
    });

    const [specifics, setSpecifics] = useState({
        height: '',
        education: '',
        body: '',
        star: '',
        drinking: '',
        smoking: '',
        children: '',
        position: '',
        religion: '',
        gender: '',
        nationality: '',
    });

    const handleSetSpecifics = (name, value) => {
        setSpecifics(prev => ({
            ...prev,
            [name]: value,
        }));
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleButtonBoolean = (name) => {
        setFormData(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleNext = () => {
        console.log(formData);
    };

    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Progress percent="60%" prev="AccountSetup3Create" />
            <Text style={styles.headerText}>Your General Interests</Text>
            <Text style={styles.subHeaderText}>
                These interests help match you to better people on meet me up. Select or add as many interests as you want.
            </Text>

            <View style={styles.optionContainer}>
                {['Eating Out', 'Bike Rides', 'Drinking', 'Dancing', 'Cooking', 'Baking', 'Crafting', 'Painting', 'Surfing', 'Traveling'].map((interest) => (
                    <TouchableOpacity
                        key={interest}
                        style={[styles.option, { backgroundColor: formData[`interests${interest.replace(' ', '')}`] ? '#E4423F' : '#ffffff' }]}
                        onPress={() => handleButtonBoolean(`interests${interest.replace(' ', '')}`)}
                    >
                        <Text style={styles.optionText}>{interest}</Text>
                    </TouchableOpacity>
                ))}
            </View>    
            <Text style={styles.headerText}>Some Specifics</Text>
            <Text style={styles.subHeaderText}>
                These help give a better insight into who you are and will allow matches to better understand you as a person.
            </Text>
            <View style={styles.specificContainer}>
                {['height', 'education', 'body', 'star', 'drinking', 'smoking', 'children', 'position', 'religion', 'gender', 'nationality'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={styles.specificOption}
                        onPress={() => setOption(item)}
                        activeOpacity={0.8}  // Gives a slight opacity change on press
                    >
                        <Text style={styles.optionLabel}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                        <Text style={styles.optionValue}>
                            {specifics[item] || 'Not Entered'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <HelperTextBox text="That's a lot of information..."/>
      

            <View style={styles.buttonContainer}>
                {/* <NextButton next="AccountSetup4Create" onPress={handleNext} /> */}
                <NextButton next="LocationPage" onPress={handleNext} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, 
        backgroundColor: '#ffffff',
        padding: 20,
        marginTop: 30,
    },
    progressBar: {
        width: '100%',
        height: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 16,
    //    fontWeight: 'bold',
        marginVertical: 10,
        fontFamily: 'sans-serif',
    },
    subHeaderText: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
        fontFamily: 'sans-serif',
    },
    button: {
        padding: 15,
        borderRadius: 41,
        marginVertical: 5,
        marginRight: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
    },

    optionValue: {
        fontSize: 16,
        color: '#888',
    },
    helperText: {
        fontSize: 14,
        color: '#888',
        marginVertical: 20,
    },
    nextButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E4423F',
        borderRadius: 41,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'sans-serif',
    },

    optionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
    },
    option: {
        backgroundColor: '#ffffff',
        borderRadius: 41,
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    optionText: {
        color: '#000000',
        fontSize: 12,
        fontFamily: 'sans-serif',
    },

    specificContainer: {
        flexDirection: 'column',
        padding: 10,
    },
    specificOption: {
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',  
        padding: 15,  
        borderRadius: 25,  
        backgroundColor: '#f8f8f8',  
        borderWidth: 1,
        borderColor: '#ddd',  
        marginBottom: 10,  
        elevation: 2, 
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.1,  
        shadowRadius: 2,  
    },
    optionLabel: {
        fontSize: 12,
        color: '#333',
        flex: 1,  
    },
    optionValue: {
        fontSize: 12,
        color: '#666',
        flex: 2,  
        textAlign: 'right',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
    },
    buttonContainer: {
        marginTop: 20, 
    },
});
