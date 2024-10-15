import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HelperTextBox from '../src/Assets/Components/helperTextBox';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({ images: [], video: '' });
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
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        requestPermissionsAndFetchUserData();
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userId}`);
            const fetchedData = response.data.result[0];

            if (fetchedData.user_photo_url) {
                const imageArray = JSON.parse(fetchedData.user_photo_url);
                setFormData(prevData => ({ ...prevData, images: imageArray }));
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

            if (!result.canceled && result.assets) {
                const selectedImage = result.assets[0].uri;
                setFormData(prevData => ({
                    ...prevData,
                    images: [...prevData.images, selectedImage],
                }));
            }
        } catch (error) {
            console.error("Error selecting or uploading image:", error);
            Alert.alert("Error", "There was an issue processing the image. Please try again.");
        }
    };

    const handleVideoUpload = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 0.5,
            });

            if (!result.canceled && result.assets) {
                const selectedVideo = result.assets[0].uri;
                setFormData(prevData => ({ ...prevData, video: selectedVideo }));
            }
        } catch (error) {
            console.error("Error selecting or uploading video:", error);
            Alert.alert("Error", "There was an issue processing the video. Please try again.");
        }
    };

    const uploadMediaToBackend = async () => {
        setIsLoading(true);

        const uploadData = new FormData();
        uploadData.append('user_uid', userId);
        uploadData.append('user_email_id', userEmail);

        formData.images.forEach((imageUri, index) => {
            uploadData.append(`image_${index}`, {
                uri: imageUri,
                type: 'image/jpeg',
                name: `image_${index}.jpg`,
            });
        });

        if (formData.video) {
            uploadData.append('user_video', {
                uri: formData.video,
                type: 'video/mp4',
                name: 'video_filename.mp4',
            });
        }

        try {
            const response = await axios.put(
                'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo',
                uploadData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Media uploaded successfully!");
            } else {
                console.error("Failed to upload media:", response);
                Alert.alert("Error", "Failed to upload media to the server. Please try again.");
            }
        } catch (error) {
            console.error("Upload Error:", error);
            Alert.alert("Error", "There was an error uploading the media. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = async () => {
        await uploadMediaToBackend();
        navigation.replace("AccountSetup7Summary");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Profile Creation</Text>
                </View>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <View style={styles.progress}></View>
                    </View>
                    <Text style={styles.progressText}>80%</Text>
                </View>
                
                <Text style={styles.sectionTitle}>Images and Video</Text>
                <Text style={styles.sectionSubtitle}>Upload media to represent yourself.</Text>

                <View style={styles.imagePreviewContainer}>
                    {formData.images.map((img, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri: img }} style={styles.image} />
                        </View>
                    ))}
                    {formData.video ? (
                        <View style={styles.videoContainer}>
                            <Text>Video Recorded</Text>
                        </View>
                    ) : null}
                </View>

                <HelperTextBox text="Why do I need to upload media?" />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                        <Text style={styles.uploadText}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleVideoUpload} style={styles.uploadButton}>
                        <Text style={styles.uploadText}>Record Video</Text>
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
    safeArea: { flex: 1 },
    container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backButton: { marginRight: 10 },
    header: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    backText: { fontSize: 24, color: '#000' },
    progressBarContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    progressBar: { flex: 1, height: 10, backgroundColor: '#ddd', borderRadius: 5, overflow: 'hidden', marginRight: 10 },
    progress: { width: '80%', height: '100%', backgroundColor: '#E4423F' },
    progressText: { fontSize: 14, fontWeight: 'bold', color: '#E4423F' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 5 },
    sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 10 },
    imagePreviewContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
    imageContainer: { margin: 5 },
    image: { width: 100, height: 150, borderRadius: 5 },
    videoContainer: { padding: 20, backgroundColor: '#ddd', borderRadius: 5, marginTop: 10 },
    uploadButton: { backgroundColor: '#1A1A1A', width: 200, padding: 15, borderRadius: 45, alignItems: 'center', marginVertical: 10 },
    uploadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    nextButton: { backgroundColor: '#E4423F', padding: 15, width: 200, borderRadius: 45, alignItems: 'center' },
    nextText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
