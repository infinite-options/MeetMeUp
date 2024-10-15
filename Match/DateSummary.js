import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export default function DateSummary() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, selectedDay, selectedTime, selectedDateIdea, AccountUser = [], formattedAddress } = route.params || {};
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserId = async () => {
            const id = await AsyncStorage.getItem('user_uid');
            setUserId(id);
        };
        getUserId();
    }, []);

    const handleMessage = () => {
        navigation.navigate('Message', { user });
    };

    const EditableItem = ({ label, value }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
            borderRadius: 20,
            padding: 10,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
        }}>
            <Text style={{ fontFamily: 'Lexend', fontSize: 14 }}>
                {label}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Lexend', fontSize: 14, color: '#555', textAlign: 'right' }}>
                    {value}
                </Text>
                <TouchableOpacity style={{ marginLeft: 5 }}>
                    <Image source={require('../src/Assets/Images/EditIcon.png')} style={{ width: 14, height: 14 }} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (newValue) => {
        if (newValue < 80) {
            setSliderValue(newValue);
        } else {
            setSliderValue(81);
        }
    };

    const handleSend = () => {
        if (!userId) return;
        
        const fd = new FormData();
        fd.append('meet_user_id', userId);
        fd.append('meet_date_user_id', user.user_uid);
        fd.append('meet_day', selectedDay);
        fd.append('meet_time', selectedTime);
        fd.append('meet_date_type', selectedDateIdea);
        fd.append('meet_location', formattedAddress);

        const msg = `Let's meet up on ${selectedDay} ${selectedTime} and go to ${selectedDateIdea} at ${formattedAddress}`;

        axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/meet', fd)
            .then(res => console.log(res));

        axios.post('https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/messages', {
            sender_id: userId,
            receiver_id: user.user_uid,
            message_content: msg
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
    };

    useEffect(() => {
        if (sliderValue > 80) {
            handleSend();
        }
    }, [sliderValue]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Image 
                        source={
                            AccountUser.length > 0 && AccountUser[0].photo 
                                ? { uri: JSON.parse(AccountUser[0].photo)[0] }
                                : require('../src/Assets/Images/account.png')// Local fallback image
                        }
                        style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'white', marginRight: -15, zIndex: 1 }} 
                    />
                    <Image 
                        source={
                            user.user_photo_url
                                ? { uri: JSON.parse(user.user_photo_url)[0] }
                                : require('../src/Assets/Images/account.png') // Local fallback image
                        }
                        style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'white', marginLeft: -15, zIndex: 0 }} 
                    />
                    <Text style={{ fontFamily: 'Lexend', fontSize: 20, marginLeft: 10 }}>{user.user_first_name}</Text>
                </View>

                <Text style={{ fontFamily: 'Lexend', fontSize: 23, textAlign: 'center', marginVertical: 20 }}>
                    Let's meet up on <Text style={{ color: '#E4423F' }}>{selectedDay} {selectedTime}</Text>, and go to <Text style={{ color: '#E4423F' }}>{selectedDateIdea}</Text> at <Text style={{ color: '#E4423F' }}>{formattedAddress}</Text>
                </Text>

                <EditableItem label="Date & Time" value={`${selectedDay} ${selectedTime}`} />
                <EditableItem label="Date Theme" value={selectedDateIdea} />
                <EditableItem label="Location" value={formattedAddress} />

                <Slider
                    style={{ width: 250, height: 50, marginVertical: 30 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={sliderValue}
                    onValueChange={handleSliderChange}
                    thumbTintColor='#E4423F'
                    minimumTrackTintColor='#E4423F'
                    maximumTrackTintColor='#f8f8f8'
                />

                <TouchableOpacity
                    onPress={handleMessage}
                    style={{
                        backgroundColor: '#E4423F',
                        borderRadius: 18,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontFamily: 'Lexend', fontSize: 16, color: 'white' }}>
                        Message!
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
