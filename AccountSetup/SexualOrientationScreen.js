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

export default function SexualOrientationScreen({ navigation }) {
  // Track which option is currently selected (if any)
  const [selectedOption, setSelectedOption] = useState(null);

  // The list of sexual orientation options
  const orientationOptions = [
    'Straight',
    'Gay',
    'Bisexual',
    'Asexual',
    'Pansexual',
    'Queer',
    'Questioning',
    'Other',
  ];

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  // The Continue button is enabled only if there's a selection
  const isFormComplete = selectedOption !== null;

  const handleContinue = () => {
    if (isFormComplete) {
      // Move to the next screen or do something with the selected option
      navigation.navigate('OpenToScreen', { orientation: selectedOption });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar (adjust progress as needed) */}
      <ProgressBar startProgress={40} endProgress={50} />

      {/* Title / Subtitle */}
      <Text style={styles.header}>What’s your sexual orientation?</Text>
      <Text style={styles.subHeader}>Your sexual orientation will be public.</Text>

      {/* Options list */}
      {orientationOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            {
              backgroundColor: selectedOption === option ? '#000' : '#FFF',
              // You can keep the border color #CCC for consistency
              borderColor: '#CCC',
            },
          ]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={{ color: selectedOption === option ? '#FFF' : '#000' }}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

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
    // Align content to the top
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    // Add top padding for Android
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
  // Each option button (pill-shaped)
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  // Continue button styling
  continueButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20, // extra space at bottom
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
