import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MatchBegin() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, AccountUser = [], accountUserData = [] } = route.params || {};

    const parseAvailableTimes = (data) => {
        try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                return parsed.map(slot => [slot.day, slot.start_time, slot.end_time]);
            } else {
                console.warn("Unexpected data format:", parsed);
                return [];
            }
        } catch (error) {
            console.error("Error parsing available times:", error);
            return [];
        }
    };

    const userTimes = user?.user_available_time ? parseAvailableTimes(user.user_available_time) : [];
    const accountUserTimes = accountUserData?.user_available_time ? parseAvailableTimes(accountUserData.user_available_time) : [];

    const getCommonAvailability = (userTimes, accountUserTimes) => {
        const commonTimes = {};
        userTimes.forEach(([userDay, userStart, userEnd]) => {
            accountUserTimes.forEach(([accountDay, accountStart, accountEnd]) => {
                if (userDay === accountDay) {
                    const start = new Date(`2000-01-01 ${userStart}`);
                    const end = new Date(`2000-01-01 ${userEnd}`);
                    const accountStartTime = new Date(`2000-01-01 ${accountStart}`);
                    const accountEndTime = new Date(`2000-01-01 ${accountEnd}`);

                    const overlapStart = new Date(Math.max(start, accountStartTime));
                    const overlapEnd = new Date(Math.min(end, accountEndTime));

                    if (overlapStart < overlapEnd) {
                        if (!commonTimes[userDay]) commonTimes[userDay] = [];
                        let current = new Date(overlapStart);
                        while (current < overlapEnd) {
                            commonTimes[userDay].push(current.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
                            current.setHours(current.getHours() + 1);
                        }
                        if (current.getTime() === overlapEnd.getTime()) {
                            commonTimes[userDay].push(current.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
                        }
                    }
                }
            });
        });

        return commonTimes;
    };

    const commonAvailability = getCommonAvailability(userTimes, accountUserTimes);

    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [isDayModalVisible, setIsDayModalVisible] = useState(false);
    const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);

    const handleNextButton = async () => {
        try {
            navigation.navigate('SelectPlace', { user, selectedDay, selectedTime, AccountUser, accountUserData });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const times = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    {AccountUser.length > 0 && AccountUser[0]?.photo ? (
                        <Image source={{ uri: JSON.parse(AccountUser[0].photo)[0] }} style={styles.avatar} />
                    ) : null}
                    {user?.user_photo_url ? (
                        <Image source={{ uri: JSON.parse(user.user_photo_url)[0] }} style={styles.avatarOverlap} />
                    ) : null}
                    <Text style={styles.username}>{user.user_first_name}</Text>
                </View>

                <Text style={styles.title}>Let's meet up on</Text>
                <Text style={styles.instructions}>
                    Pick your dates and see which ones align with your match. Show your match all your date availability.
                </Text>

                <TouchableOpacity style={styles.dropdown} onPress={() => setIsDayModalVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedDay || "Select Day"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dropdown} onPress={() => setIsTimeModalVisible(true)}>
                    <Text style={styles.dropdownText}>{selectedTime || "Select Time"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNextButton} style={styles.nextButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                {/* Day Modal */}
                <Modal visible={isDayModalVisible} transparent animationType="slide">
                    <SafeAreaView style={styles.modalContainer}>
                        <FlatList
                            data={days}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => { setSelectedDay(item); setIsDayModalVisible(false); }}>
                                    <Text style={styles.modalText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </SafeAreaView>
                </Modal>

                {/* Time Modal */}
                <Modal visible={isTimeModalVisible} transparent animationType="slide">
                    <SafeAreaView style={styles.modalContainer}>
                        <FlatList
                            data={times}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => { setSelectedTime(item); setIsTimeModalVisible(false); }}>
                                    <Text style={styles.modalText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </SafeAreaView>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    avatarOverlap: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        marginLeft: -15,
    },
    username: {
        fontSize: 20,
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: '#E4423F',
    },
    instructions: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 14,
    },
    dropdown: {
        backgroundColor: '#E8E8E8',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#E4423F',
        padding: 15,
        borderRadius: 20,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingTop: 50,
    },
    modalItem: {
        padding: 20,
        backgroundColor: 'white',
        width: 250,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
});
