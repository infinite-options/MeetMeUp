import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Progress from '../src/Assets/Components/Progress';
import NextButton from '../src/Assets/Components/NextButton';
import HelperTextBox from '../src/Assets/Components/helperTextBox';

export default function AccountSetup2Create() {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNext = () => {
        console.log('formData: ', formData);
        navigation.navigate('AccountSetup3Create');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Progress percent="20%" prev="AccountSetup1Login" />

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Account Details</Text>
                <Text style={styles.subHeaderText}>
                    We need some basic details to help verify your identity and account.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('email', text)}
                    value={formData.email}
                    placeholder='Email'
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    value={formData.phoneNumber}
                    placeholder='Phone Number'
                    keyboardType='phone-pad'
                />
            </View>

            <View style={styles.linkContainer}>
                <Text style={styles.subHeaderText}>
                    Already have an account?{' '}
                    <Text style={styles.linkText} onPress={() => navigation.navigate('AccountSetup1Login')}>
                        Click Here
                    </Text>
                </Text>
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Security</Text>
                <Text style={styles.subHeaderText}>
                    Make a strong passcode that will be very hard to guess. View our security guidelines here.
                </Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('password', text)}
                    value={formData.password}
                    placeholder='Create Password'
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('passwordConfirm', text)}
                    value={formData.passwordConfirm}
                    placeholder='Confirm Password'
                    secureTextEntry
                />
                <HelperTextBox text='How do you need to make a secure password?'/>    
            </View>
            <View style={styles.buttonContainer}>
                <NextButton next="AccountSetup3Create" onPress={handleNext} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        marginVertical: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    formContainer: {
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    linkContainer: {
        marginVertical: 10,
    },
    linkText: {
        color: '#007bff',
    },
    helperText: {
        fontSize: 14,
        color: '#888',
        marginVertical: 10,
    },
    buttonContainer: {
        marginTop: 5,
    },
});
