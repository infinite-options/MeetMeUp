import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

    const handleImageUpload = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
            });

            // Check if result contains assets array (newer ImagePicker format)
            const imageUri = result.assets ? result.assets[0].uri : result.uri;

            if (!result.cancelled && imageUri) {
                console.log("Selected image URI:", imageUri);

                // Append new image to formData
                setFormData(prevData => ({
                    ...prevData,
                    image: prevData.image ? `${prevData.image},${imageUri}` : imageUri,
                }));
                
                // Log formData to verify it updates correctly
                console.log("Updated formData:", formData);
            } else {
                console.log("Image picker was cancelled or returned no URI.");
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
            console.error("Upload Error:", error.message);
            Alert.alert("Error", "There was an error uploading the image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (imgUri) => {
        const updatedImages = formData.image.split(',').filter((img) => img !== imgUri).join(',');
        setFormData(prevData => ({
            ...prevData,
            image: updatedImages,
            imgFav: prevData.imgFav === imgUri ? '' : prevData.imgFav,
        }));
    };

    const handleNext = async () => {
        await uploadImageToBackend();
        navigation.replace("AccountSetup7Summary");
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Profile Creation</Text>
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
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator size="large" color="#E4423F" />
            ) : (
                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 20,
    },
    backText: {
        fontSize: 24,
        color: '#000',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 100,
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
        backgroundColor: '#E4423F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#E4423F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    nextText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
