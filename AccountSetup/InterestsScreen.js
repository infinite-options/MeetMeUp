import React, { useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '../src/Assets/Components/ProgressBar';

export default function InterestsScreen({ navigation }) {
  // The list of available interests
  const allInterests = [
    'Cooking / Baking',
    'Gaming',
    'Reading',
    'Health & Fitness',
    'Sports',
    'Travelling',
    'DIY',
    'Film & Movies',
    'Drawing',
    'Painting',
    'Music',
    'Dance',
    'Technology',
    'Cars / Vehicles',
    'Shopping',
    'Partying',
    'Animals & Wildlife',
    'Writing',
  ];

  // Keep track of the user’s selected interests
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Toggle a single interest on/off
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      // If it's already selected, remove it
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      // Otherwise, add it
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  // Enable the Continue button only if at least one interest is selected
  const isFormComplete = selectedInterests.length > 0;

  const handleContinue = () => {
    if (isFormComplete) {
      // Navigate to next screen, passing the chosen interests
      navigation.navigate('AddMediaScreen', { interests: selectedInterests });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar (adjust progress as needed) */}
      <ProgressBar startProgress={60} endProgress={70} />

      {/* Title / Subtitle */}
      <Text style={styles.header}>What are your interests?</Text>
      <Text style={styles.subHeader}>
        Help us better match you with others of similar interests.
      </Text>

      {/* Interests in a wrap layout */}
      <View style={styles.interestsContainer}>
        {allInterests.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <TouchableOpacity
              key={interest}
              onPress={() => toggleInterest(interest)}
              style={[
                styles.interestButton,
                // We might give a border color for the unselected state
                // or a black border if selected:
                {
                  borderColor: isSelected ? '#000' : '#CCC',
                },
              ]}
            >
              {/* Circle icon on the left (for unselected, just a ring; for selected, a checkmark) */}
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isSelected ? '#000' : 'transparent',
                    borderColor: isSelected ? '#000' : '#CCC',
                  },
                ]}
              >
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                )}
              </View>
              {/* Interest text */}
              <Text
                style={{
                  color:  '#000',
                  marginLeft: 5,
                  fontSize:16,
                }}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isFormComplete ? '#E4423F' : '#ccc' },
        ]}
        onPress={handleContinue}
        disabled={!isFormComplete}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Overall container
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  // Back button style
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
    marginBottom: 20,
    marginTop: 30,
  },
  // Title
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  // Subtitle
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  // Container for the interests, wrapping them onto multiple lines
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // wrap onto new lines
    justifyContent: 'flex-start',
    // Optionally adjust spacing or margin
  },
  // The pill-shaped interest button
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  // The small circle on the left
  circle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Continue button
  continueButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 10, 
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
