import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const LandingPage = () => {
  const navigation = useNavigation(); 

  const handleStartClick = () => {
    navigation.navigate('LandingPage4'); 
  };

  const handleSkipClick = () => {
    navigation.navigate('AccountSetup1Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Get to know your matches <Text style={styles.bold}>better</Text> with {'\n'} a profile 
        and <Text style={styles.bold}>recording</Text> updated <Text style={styles.bold}>yearly</Text>.
      </Text>

      <Image source={require('../assets/image3.png')} style={styles.customImage} />

      <Text style={styles.descriptionText}>
        No <Text style={styles.bold}>disappointment</Text> that they {'\n'} look <Text style={styles.bold}>nothing</Text> like their profile.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
        <Text style={styles.startButtonText}>Let's Match</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkipClick}>
        <Text style={styles.skipButtonText}>Skip &gt;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1A1A1A',
    paddingVertical: 20,
  },
  headerText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#1A1A1A',
  },
  subHeaderText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#1A1A1A',

  },
  descriptionText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 40,
  },
  bold: {
    fontWeight: '700',
  },
  customImage: {
    width: 384,
    height: 500,
    borderRadius: 20,
    resizeMode: 'cover',
    marginVertical: 15,
  },
  startButton: {
    backgroundColor: '#E4423F',
    borderRadius: 20,
    width: 172,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  startButtonText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    textTransform: 'none',
  },
  skipButton: {
    marginVertical: 10,
  },
  skipButtonText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 12,
    color: '#000000',
    textTransform: 'none',
  },
});

export default LandingPage;