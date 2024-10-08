import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import axios from 'axios';

export default function AccountSetup5Create() {
    const [formData, setFormData] = useState({ video: '', image: '', imgFav: '' });
    const [hasPermission, setHasPermission] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    // Ensure Camera.Constants.Type is defined with a fallback
    const cameraType = Camera?.Constants?.Type?.front || Camera.Constants?.Type?.back;

    // Request camera permissions
    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        requestPermission();
    }, []);

    const handleStartRecording = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);
                const videoData = await cameraRef.current.recordAsync();
                setRecordedVideo(videoData.uri);
                setIsRecording(false);
            } catch (error) {
                console.log("Error recording video:", error);
                setIsRecording(false);
            }
        }
    };

    const handleStopRecording = () => {
        if (cameraRef.current && isRecording) {
            cameraRef.current.stopRecording();
        }
    };

    const handleImageUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setFormData(prevData => ({
                ...prevData,
                image: prevData.image ? `${prevData.image},${result.uri}` : result.uri
            }));
        }
    };

    const handleFavorite = (imgUri) => {
        setFormData(prevData => ({
            ...prevData,
            imgFav: prevData.imgFav === imgUri ? '' : imgUri
        }));
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
        try {
            const formData = new FormData();
            if (recordedVideo) {
                const videoFile = {
                    uri: recordedVideo,
                    name: 'video.mp4',
                    type: 'video/mp4',
                };
                formData.append('user_video', videoFile);
            }

            formData.append('user_uid', 'your_user_uid');
            formData.append('user_email_id', 'your_email_id');
            const images = formData.image.split(',').filter(Boolean);
            images.forEach((imageUri, index) => {
                formData.append(`img_${index}`, { uri: imageUri, name: `image${index}.jpg`, type: 'image/jpeg' });
            });

            await axios.put('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert("Success", "Profile updated successfully!");
            navigation.navigate('AccountSetup6Availability');
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "There was an error updating your profile. Please try again.");
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Your Profile Recording</Text>
            <Text style={styles.subHeader}>Record a short video about yourself.</Text>
            
            <View style={styles.cameraContainer}>
                <Camera ref={cameraRef} style={styles.camera} type={cameraType}>
                    {isRecording ? (
                        <Button title="Stop Recording" onPress={handleStopRecording} />
                    ) : (
                        <Button title="Start Recording" onPress={handleStartRecording} />
                    )}
                </Camera>
            </View>

            {recordedVideo && (
                <Video source={{ uri: recordedVideo }} style={styles.video} useNativeControls />
            )}

            <Text style={styles.header}>Upload Images</Text>
            <Button title="Upload Image" onPress={handleImageUpload} />
            <ScrollView horizontal>
                {formData.image.split(',').filter(Boolean).map((img, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: img }} style={styles.image} />
                        <TouchableOpacity onPress={() => handleFavorite(img)}>
                            <Text>{formData.imgFav === img ? '❤️' : '🤍'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(img)}>
                            <Text>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Button title="Next" onPress={handleNext} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
    subHeader: { fontSize: 14, color: '#333', marginBottom: 10 },
    cameraContainer: { height: 300, marginBottom: 20 },
    camera: { flex: 1 },
    video: { height: 200, marginTop: 10 },
    imageContainer: { margin: 10, alignItems: 'center' },
    image: { width: 100, height: 100, borderRadius: 5 },
});
