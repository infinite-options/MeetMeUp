import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextButton from "../src/Assets/Components/NextButton";
import HelperTextBox from "../src/Assets/Components/helperTextBox";
import Progress from "../src/Assets/Components/Progress";
export default function AccountSetup2Create() {
    const navigation = useNavigation();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        password: '',
        passwordConfirm: ''
    });
    const [existing, setExisting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(''); 

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });

        // Dummy password strength calculation
        if (name === 'password') {
            if (value.length > 8) {
                setPasswordStrength('Strong');
            } else if (value.length > 4) {
                setPasswordStrength('Weak');
            } else {
                setPasswordStrength('');
            }
        }
    };

    const handleNext = async () => {
        const url = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/CreateAccount/MMU";

        if (!formData.email || !formData.password || !formData.phone_number) {
            Alert.alert('Please fill in all required fields.');
            return;
        }

        let data = new FormData();
        data.append("email", formData['email']);
        data.append("password", formData['password']);
        data.append("phone_number", formData['phone_number']);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    phone_number: formData.phone_number,
                    password: formData.password,
                }),
            });

            const result = await response.json();

            if (result.message === "User already exists") {
                setExisting(true);
                Alert.alert('User Already Exists');
                return;
            }

            await AsyncStorage.setItem('user_uid', result.result[0].user_uid);
            await AsyncStorage.setItem('user_email_id', formData['email']);
            await AsyncStorage.setItem('user_phone_number', formData['phone_number']);
            navigation.navigate('AccountSetup3Create');
        } catch (error) {
            console.error("Error occurred:", error);
            Alert.alert("Error", "There was an issue creating your account. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}></Text>
            </View>

            <Progress percent='20%' prev='AccountSetup1Login' />

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Account Details</Text>
                <Text style={styles.subHeaderText}>We need some basic details to help verify your identity and account.</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('email', text)}
                    value={formData.email}
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('phone_number', text)}
                    value={formData.phone_number}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Security</Text>
                <Text style={styles.subHeaderText}>Make a strong passcode that will be very hard to guess. View our security guidelines <Text style={styles.linkText}>here</Text>.</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Create Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('password', text)}
                    value={formData.password}
                    placeholder="Create Password"
                    secureTextEntry
                />
                <Text style={styles.passwordStrength}>{passwordStrength}</Text>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('passwordConfirm', text)}
                    value={formData.passwordConfirm}
                    placeholder="Confirm Password"
                    secureTextEntry
                />
            </View>
            <HelperTextBox text="How do you need to make a secure password?" />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
        marginTop: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#ddd",
        borderRadius: 4,
        marginRight: 10,
    },
    progressFill: {
        width: "20%",
        height: "100%",
        backgroundColor: "#E4423F",
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: "#E4423F",
    },
    headerContainer: {
        marginVertical: 10,
    },
    headerText: {
        fontSize: 18,

        marginVertical: 10,
        fontFamily: "sans-serif",
    },
    subHeaderText: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
        fontFamily: "sans-serif",
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#E4423F",
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordStrength: {
        fontSize: 12,
        color: "green",
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#E4423F",
        borderRadius: 25,
        height: 45,
        width: 160,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    linkText: {
        color: "#E4423F",
    },
});
