import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const LandingPage = () => {
  const navigation = useNavigation(); 

  const handleStartClick = () => {
    navigation.navigate('Location'); 
  };

  const handleSkipClick = () => {
    navigation.navigate('AccountSetup1Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        <Text style={styles.bold}>Time</Text> is so <Text style={styles.bold}> precious </Text> in
        {'\n'} today's time and day!
      </Text>

      <Image source={require('../assets/image4.png')} style={styles.customImage} />

      <Text style={styles.subHeaderText}>
       <Text style={styles.bold}>Meet me.</Text>
      </Text>

      <Text style={styles.descriptionText}>
        Meet the missing piece that{'\n'} <Text style={styles.bold}>compliments</Text> you.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
        <Text style={styles.startButtonText}>Let's Meet Up</Text>
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
    marginTop: 30,
  },
  subHeaderText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 25,
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
