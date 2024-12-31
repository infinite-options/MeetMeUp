import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

export default function EnableNotificationsScreen({ navigation }) {
  // Store the push token if successfully obtained
  const [expoPushToken, setExpoPushToken] = useState(null);

  // Ask for notification permissions and obtain the push token
  const handleEnableNotifications = async () => {
    try {
      // 1. Ask the user for permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Notifications permission is required to stay updated. Please enable in your device settings.'
        );
        return;
      }

      // 2. Get the Expo push token
      const tokenResponse = await Notifications.getExpoPushTokenAsync();
      const token = tokenResponse.data;
      setExpoPushToken(token);

      Alert.alert('Notifications Enabled', `Your push token:\n\n${token}`);

      // 3. You could send this token to your backend for sending push notifications
      // For now, we'll just navigate away:
      navigation.navigate("MyProfile");
    } catch (error) {
      console.error('Error enabling notifications:', error);
      Alert.alert('Error', 'Something went wrong while requesting notifications permission.');
    }
  };

  const handleMaybeLater = () => {
    // If user chooses not to enable notifications
    navigation.navigate("MyProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Main content container */}
      <View style={styles.content}>
        {/* Big bell icon */}
        <Ionicons name="notifications-outline" size={100} color="#CCC" style={styles.icon} />

        {/* Title */}
        <Text style={styles.title}>Allow Notifications?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Find out when you get matched or messaged and be assisted in planning your dates
        </Text>

        {/* Big red button */}
        <TouchableOpacity style={styles.enableButton} onPress={handleEnableNotifications}>
          <Text style={styles.enableButtonText}>Yes, turn on notifications</Text>
        </TouchableOpacity>

        {/* Maybe Later link */}
        <TouchableOpacity onPress={handleMaybeLater}>
          <Text style={styles.maybeLaterText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // Align content to the top
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    // Padding for Android devices
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
    marginTop: 30,
    marginBottom: 20,
  },
  content: {
    // This view holds everything in the center
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 50,
  },
  enableButton: {
    backgroundColor: '#E4423F',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  enableButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  maybeLaterText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
});
