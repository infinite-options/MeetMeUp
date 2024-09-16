import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Progress from '../src/Assets/Components/Progress';
import NextButton from '../src/Assets/Components/NextButton';
import HelperTextBox from '../src/Assets/Components/helperTextBox';

export default function AccountSetup2Create() {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        user_email_id: '',
        user_phone_number: '',
        user_password_hash: '',
        //passwordConfirm: '',
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

   /* const handleNext = () => {
        console.log('formData: ', formData);
        navigation.navigate('AccountSetup3Create');
    }; */

    const handleNext = async () => {
        const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo"
        let fd = new formData();
        fd.append('user_email_id', 'shrutisen03@gmail.com')
        fd.append('user_phone_number', '123456789')
        fd.append('user_password_hash', 'test123')

        try{
            const response = await fetch(url, {
                method: 'POST',
                body: fd,
            });

            if(!response.ok) {
                const statusCode = response.status;
                const errorText = await response.text();
                console.log(response);
            }

            const result = await response.json();
            console.log('Success: ' + JSON.stringify(result));
        } catch (error) {
            console.log('Error--: ' + error.message);
        } finally{
            setLoading(false);
        }

    
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
        marginTop: 30,
      //  fontFamily: 'sans-serif',
    },
    headerContainer: {
        marginVertical: 10,
    },
    headerText: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: 'sans-serif',
        
    },
    subHeaderText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
        fontFamily: 'sans-serif',
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
