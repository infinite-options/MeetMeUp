import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({ image: '', imgFav: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigation();

    // Request permissions and fetch user data on mount
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

    // Handle image selection and upload
    const handleImageUpload = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
            });

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                console.log("Selected image URI:", imageUri);

                const response = await fetch(imageUri);
                const blob = await response.blob();
                const filename = `img_${Date.now()}.jpg`;

                setFormData(prevData => ({
                    ...prevData,
                    image: prevData.image ? `${prevData.image},${filename}` : filename,
                }));

                await uploadImageToBackend(blob, imageUri, filename);
            } else {
                console.log("Image picker was cancelled or returned no URI.");
            }
        } catch (error) {
            console.error("Error selecting or uploading image:", error);
            Alert.alert("Error", "There was an issue processing the image. Please try again.");
        }
    };

    const uploadImageToBackend = async (blob, imageUri, filename) => {
        try {
            const formData = new FormData();
            const uri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
            
            formData.append('user_photo_url', {
                uri: uri,
                name: filename,
                type: 'image/jpeg'
            });
    
            const response = await axios.put(
                'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
    
            if (response.status === 200) {
                console.log("Image uploaded successfully.");
            } else {
                console.error("Failed to upload image.");
                Alert.alert("Error", "Failed to upload image to the server. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Error", "There was an error uploading the image. Please try again.");
        }
    };
    
    const handleDelete = (imgUri) => {
        const updatedImages = formData.image
            .split(',')
            .filter((img) => img !== imgUri)
            .join(',');

        setFormData(prevData => ({
            ...prevData,
            image: updatedImages,
            imgFav: prevData.imgFav === imgUri ? '' : prevData.imgFav,
        }));
    };

    const handleNext = async () => {
        setIsLoading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('user_uid', userId);
            uploadData.append('user_email_id', userEmail);

            const images = (formData.image || '').split(',').filter(Boolean);
            if (images.length > 0) {
                uploadData.append('user_photo_url', JSON.stringify(images));
            }

            if (formData.imgFav) {
                uploadData.append('user_favorite_photo', formData.imgFav);
            }

            const response = await axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                Alert.alert("Success", "Profile updated successfully!");
                navigation.navigate('AccountSetup7Summary');
            } else {
                Alert.alert("Error", "Unexpected server response.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "There was an error updating your profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Profile Creation</Text>
            <View style={styles.progressBar}>
                <View style={styles.progress} />
                <Text style={styles.progressText}>80%</Text>
            </View>
            <Text style={styles.subheader}>Your Profile Recording</Text>
            <Text style={styles.description}>
                This is a short 30 second to 5 minute video to tell us a bit about who you are and what you like.
            </Text>
            <View style={styles.imagePreviewContainer}>
                {(formData.image ? formData.image.split(',') : []).filter(Boolean).map((img, index) => (
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
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    progress: {
        width: '80%',
        backgroundColor: '#E4423F',
        height: '100%',
    },
    progressText: {
        position: 'absolute',
        right: 0,
        fontWeight: 'bold',
        color: '#E4423F',
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#000',
        marginBottom: 20,
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
