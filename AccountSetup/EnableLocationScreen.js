import React, { useState } from 'react';
import {
    Image,
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
import * as Location from 'expo-location';

export default function EnableLocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  // Request permissions and get the user’s current position
  const handleEnableLocation = async () => {
    try {
      // 1. Ask permission to use location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature. Please enable it in your device settings.'
        );
        return;
      }

      // 2. Get current position
      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation(currentPosition.coords);

      Alert.alert(
        'Location Enabled',
        `Your current coordinates:\n\nLatitude: ${currentPosition.coords.latitude}\nLongitude: ${currentPosition.coords.longitude}`
      );

      // 3. If you want, navigate or store location in your global state, etc.
      // For now, just go back or navigate somewhere else:
      navigation.navigate("EnableNotificationsScreen");
    } catch (error) {
      console.error('Error enabling location:', error);
      Alert.alert('Error', 'Something went wrong while fetching location.');
    }
  };

  const handleMaybeLater = () => {
    // If user chooses not to enable location
    navigation.navigate("EnableNotificationsScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Main content container */}
      <View style={styles.content}>
        {/* Big location icon (placeholder design) */}
        <Image 
                                source={require('../assets/map_location.png')}
                                style={styles.locationIcon}
                            />

        {/* Title */}
        <Text style={styles.title}>Enable Location?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Discover matches within your preferred distance and set up your dates through our direct
          messaging feature
        </Text>

        {/* Big red button */}
        <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
          <Text style={styles.enableButtonText}>Yes, enable my location</Text>
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
  locationIcon: {
    marginBottom: 30,
    width: 100, 
    height: 100,
    tintColor: "#CCC",
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
