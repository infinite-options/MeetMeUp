import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
// added for testing age verification comment out if not testing
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';

const LandingPage = () => {
  const navigation = useNavigation(); 

  const handleStartClick = () => {
    navigation.navigate('LandingPage2'); 
  };

  const handleSkipClick = () => {
    navigation.navigate('AccountSetup1Login'); 
  };
   // TEMP FUNCTION TO CLEAR AsyncStorage KEY comment out if not testing
  //  const handleClearVerificationKey = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userIsVerified');
  //     console.log('Verification key removed. You can now test age verification again.');
  //     Alert.alert('Key Removed', 'You can now test age verification again.');
  //   } catch (error) {
  //     console.error('Error removing userIsVerified key:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Hello, online <Text style={styles.bold}>daters</Text>.
        {'\n'}Are you <Text style={styles.bold}>time poor</Text>?
      </Text>

      <Image source={require('../assets/image1.png')} style={styles.customImage} />

      <Text style={styles.subHeaderText}>
        We do <Text style={styles.bold}>small talk</Text> for you.
      </Text>

      <Text style={styles.descriptionText}>
        <Text style={styles.bold}>Arrange</Text> your <Text style={styles.bold}>meeting</Text> time & <Text style={styles.bold}>destination</Text>{' '}
        through the app with only{' '}
        <Text style={styles.bold}>automated prompting</Text>.
      </Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
        <Text style={styles.startButtonText}>Let's Start</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkipClick}>
        <Text style={styles.skipButtonText}>Skip &gt;</Text>
      </TouchableOpacity>
      {/*
        TEMPORARY BUTTON FOR TESTING:
        removes the userIsAgeVerified key so you can see the age gate again.
        comment out if not testing
      */}
      {/* <TouchableOpacity style={styles.clearButton} onPress={handleClearVerificationKey}>
        <Text style={styles.clearButtonText}>Clear Verification Key</Text>
      </TouchableOpacity> */}
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
   // NEW STYLES FOR THE CLEAR BUTTON comment out if not testing
  //  clearButton: {
  //   marginTop: 20,
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   backgroundColor: '#dddddd',
  //   borderRadius: 10,
  // },
  // clearButtonText: {
  //   fontFamily: 'Lexend-Regular',
  //   fontSize: 14,
  //   color: '#000',
  //   textTransform: 'none',
  // },
});

export default LandingPage;
