import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const LandingPage = () => {
  const navigation = useNavigation(); 

  const handleStartClick = () => {
    navigation.navigate('LandingPage3'); 
  };

  const handleSkipClick = () => {
    navigation.navigate('AccountSetup1Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Browse a <Text style={styles.bold}>soulmate</Text> or new friend 
        {'\n'}and <Text style={styles.bold}>fastrack</Text> to meeting.
      </Text>

      <Image source={require('../assets/image2.png')} style={styles.customImage} />

      <Text style={styles.descriptionText}>
        <Text style={styles.bold}>Remove</Text> that <Text style={styles.bold}>awkwardness</Text> asking for <Text style={styles.bold}>the first date</Text>.
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
    marginTop: '30px'
  },
  subHeaderText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 10,
  },
  descriptionText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
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
