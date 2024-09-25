import React, { useState } from 'react';
import backgroundImage from '../assets/accountSetup1Login.jpg';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Pressable,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
export default function AccountSetup1Login() {

    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('AccountSetup7Summary');
    };

    const handleChange = (name, value) => {
        setFormDataLogin({
            ...formDataLogin,
            [name]: value
        });
    };

    const handleSubmitLogin = async () => {
        if (formDataLogin.email === "" || formDataLogin.password === "") {
            setErrorMessage("Please fill out all fields");
            Alert.alert("Error", "Please fill out all the fields");
            return;
        }
    
        const saltUrl = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt/MMU";
        const loginUrl = "https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login/MMU";
    
        try {
            setShowSpinner(true);
            const saltResponse = await axios.post(saltUrl, { email: formDataLogin.email });
            const saltObject = saltResponse.data;
    
            if (saltObject.code === 200) {
                let hashAlg = saltObject.result[0].password_algorithm;
                let salt = saltObject.result[0].password_salt;
    
                if (hashAlg === "SHA256") {
                    hashAlg = "SHA-256";
                }
    
                if (hashAlg === "SHA-256" && salt) {
                    const saltedPassword = formDataLogin.password + salt;
                    const hashedPassword = sha256(saltedPassword);
    
                    const loginResponse = await axios.post(loginUrl, {
                        email: formDataLogin.email,
                        password: hashedPassword
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });
    
                    await AsyncStorage.setItem('user_uid', loginResponse.data.result.user_uid);
                    const uid = await AsyncStorage.getItem('user_uid');
                    console.log('Retrieved user_uid:', uid);
                    await AsyncStorage.setItem('user_email_id', loginResponse.data.result.user_email_id);
                    await AsyncStorage.setItem('phone_number', loginResponse.data.result.user_phone_number);
    
                    navigation.navigate('AccountSetup7Summary');
                } else {
                    console.error('Unsupported hashing algorithm:', hashAlg);
                    throw new Error('Unsupported hashing algorithm');
                }
            } else {
                Alert.alert('Error', 'User does not exist.');
            }
        } catch (error) {
            console.error("Error occurred:", error);
            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'Invalid credentials. Please try again.');
            } else {
                Alert.alert('Error', 'An error occurred. Please try again later.');
            }
        } finally {
            setShowSpinner(false);
        }
    };
    
    const handleSubmitCreate = () => {
        navigation.navigate('AccountSetup2Create');
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.overlay}>
                {showSpinner && <ActivityIndicator size="large" color="#E4423F" />}
                <View style={styles.content}>
                    <Text style={styles.title}>meet me up</Text>
                    <Text style={styles.header}>Let’s get you out there</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formDataLogin.email}
                        onChangeText={(text) => handleChange('email', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={formDataLogin.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                    <Pressable style={styles.button} onPress={handleSubmitLogin}>
                        <Text style = {styles.loginButtonText}>
                            Login
                        </Text>
                      </Pressable>
                    <Text style={styles.linkText} onPress={() => Alert.alert("Retrieve password", "Password retrieval link")}>
                        Forgot password? Retrieve here
                    </Text>
                    <View style={styles.separator} />
                    <Text style={styles.header}>Not with us yet?</Text>
                    <Text style={styles.subHeader}>
                        Diam pulvinar pharetra nulla dolor nullam. Neque aliquam est amet scelerisque. Massa aenean.
                    </Text>
                    <Pressable style = {styles.button} onPress={handleSubmitCreate}>
                        <Text style = {styles.loginButtonText}>
                            Create Account
                        </Text>
                    </Pressable>

                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Add a white overlay with transparency
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        color: 'white',
        backgroundColor:'#E4423F'
      },
    title: {
        fontSize: 36,
        fontFamily: 'Inria Sans',
        color: '#E4423F',

        textAlign: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#FFFFFF', // White text
        fontSize: 18,
        fontFamily: 'Lexend'
    },
    header: {
        fontSize: 24,
        fontFamily: 'Lexend',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'DM Sans',
        marginBottom: 20,
    },
    text:{
        color: 'white',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    linkText: {
        color: '#E4423F',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#CECECE',
        marginVertical: 20,
        width: '100%',
    },
});
