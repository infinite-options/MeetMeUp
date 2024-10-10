import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HelperTextBox from '../src/Assets/Components/helperTextBox';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({ image: '', imgFav: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const requestPermissionsAndFetchUserData = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'This app needs permission to access your photo library.');
            }

            try {
                const storedUserId = await AsyncStorage.getItem('user_uid');
                const storedUserEmail = await AsyncStorage.getItem('user_email_id');
                if (storedUserId && storedUserEmail) {
                    setUserId(storedUserId);
                    setUserEmail(storedUserEmail);
                    fetchUserData(storedUserId);
                } else {
                    Alert.alert("User data not found", "Please log in again.");
                    navigation.navigate('Login');
                }
            } catch (e) {
                console.error("Error fetching user data", e);
            }
        };
        requestPermissionsAndFetchUserData();
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
            const fetchedData = res.data.result[0];

            if (fetchedData.user_photo_url) {
                try {
                    const imageArray = JSON.parse(fetchedData.user_photo_url);
                    const joinedImages = imageArray.join(',');
                    setFormData(prevData => ({
                        ...prevData,
                        image: joinedImages,
                    }));
                } catch (error) {
                    console.log("Error parsing user_photo_url", error);
                }
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const handleImageUpload = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
            });

            const imageUri = result.assets ? result.assets[0].uri : result.uri;

            if (!result.cancelled && imageUri) {
                setFormData(prevData => ({
                    ...prevData,
                    image: prevData.image ? `${prevData.image},${imageUri}` : imageUri,
                }));
            }
        } catch (error) {
            console.error("Error selecting or uploading image:", error);
            Alert.alert("Error", "There was an issue processing the image. Please try again.");
        }
    };

    const uploadImageToBackend = async () => {
        setIsLoading(true);

        const uploadData = new FormData();
        uploadData.append('user_uid', userId);
        uploadData.append('user_email_id', userEmail);

        const imageArray = formData.image.split(',').filter(img => img);
        imageArray.forEach((imageUri, index) => {
            uploadData.append(`img_${index}`, {
                uri: imageUri,
                type: 'image/jpeg',
                name: `img_${index}.jpg`
            });
        });

        try {
            const response = await axios.put(
                'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo',
                uploadData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Image uploaded successfully!");
            } else {
                console.error("Failed to upload image:", response);
                Alert.alert("Error", "Failed to upload image to the server. Please try again.");
            }
        } catch (error) {
            //console.error("Upload Error:", error.message);
            Alert.alert("Error", "There was an error uploading the image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (imgUri) => {
        const imageArray = formData.image.split(',').filter(img => img && img !== imgUri);
        const imageString = imageArray.join(',');

        setFormData(prevData => ({
            ...prevData,
            image: imageString,
            imgFav: prevData.imgFav === imgUri ? '' : prevData.imgFav,
        }));

        try {
            const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
            const fd = new FormData();
            fd.append("user_uid", userId);
            fd.append("user_email_id", userEmail);
            fd.append("user_photo_url", JSON.stringify(imageArray));

            const response = await fetch(url, {
                method: 'PUT',
                body: fd,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("Image deleted and server updated successfully");
            Alert.alert("Success", "Image has been deleted successfully.");
        } catch (error) {
            console.error("Error updating server after image deletion:", error);
            Alert.alert("Error", "There was an issue deleting the image. Please try again.");
        }
    };

    const handleNext = async () => {
        await uploadImageToBackend();
        navigation.replace("AccountSetup7Summary");
    };

    return (
        <SafeAreaView style = {styles.safeArea}>
        <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
                    <Text style={styles.header}>Profile Creation</Text>
        </View>

            {/* Custom progress bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                    <View style={styles.progress}></View>
                </View>
                <Text style={styles.progressText}>80%</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Complimentary Images</Text>
            <Text style={styles.sectionSubtitle}>Upload some complimentary images to help give a face to your personality.</Text>

            <View style={styles.imagePreviewContainer}>
                {formData.image.split(',').filter(Boolean).map((img, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: img }} style={styles.image} />
                        <TouchableOpacity onPress={() => handleDelete(img)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>✖</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <HelperTextBox text="Why do I need to upload Images?" />
            <View style = {{alignItems: 'center'}}>
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={styles.uploadText}>Upload</Text>
                <Image source={require('../src/Assets/Images/uploadImageIcon.png')} style={styles.uploadIcon} />
            </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#E4423F" />
            ) : (
                <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
                </View>
            )}
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    backText: {
        fontSize: 24,
        color: '#000',
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 10,
    },
    progress: {
        width: '80%', 
        height: '100%',
        backgroundColor: '#E4423F',
    },
    progressText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E4423F',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    imageContainer: {
        position: 'relative',
        margin: 5,
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 2,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        width: 200,
        padding: 15,
        borderRadius: 45,
        justifyContent: 'center',
        marginVertical: 10,
    },
    uploadText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    uploadIcon: {
        width: 20,
        height: 20,
    },
    nextButton: {
        backgroundColor: '#E4423F',
        padding: 15,
        width: 200,
        borderRadius: 45,
        alignItems: 'center',
    },
    nextText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
