import React, { useState } from 'react';
import { Pressable, SafeAreaView, Platform, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from '../src/Assets/Components/ProgressBar';
import { Ionicons } from "@expo/vector-icons";

export default function AssignedSex({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleContinue = () => {
    if (selectedOption) {
      navigation.navigate('GenderIdentity', { selectedSex: selectedOption });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={28} color="red" />
    </TouchableOpacity>
      <ProgressBar startProgress={30} endProgress={35} />
      <Text style={styles.header}>What sex were you assigned?</Text>
      <Text style={styles.subHeader}>Your sex assigned at birth will NOT be public.</Text>
      {['Man', 'Woman', 'Prefer not to say'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            { backgroundColor: selectedOption === option ? '#000' : '#FFF' },
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={{ color: selectedOption === option ? '#FFF' : '#000' }}>{option}</Text>
        </TouchableOpacity>
      ))}
      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: selectedOption ? "#E4423F" : "#ccc" },
        ]}
        onPress={handleContinue}
        disabled={!selectedOption}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      justifyContent: 'flex-start', // Align content to the top
  alignItems: 'stretch',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    },
    backButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 8,
        marginBottom: 20,
    },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 14, color: 'gray', marginBottom: 20 },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  continueButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4423F",
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 25, // Ensure some spacing at the bottom
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
