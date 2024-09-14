import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation for navigation
import { postUserData } from "../Api.js";

const LocationPage2 = () => {
  const navigation = useNavigation();


  const handleUpdate = async (choice) => {

    const formData = new FormData();
    formData.append('user_uid', '100-000001');
    formData.append('user_email_id', 'bobhawk@gmail.com');
    formData.append('user_notification_preference', choice);
  
    await postUserData(formData);
  
  }


  const handleYesClick = () => {
    handleUpdate('True');
    navigation.navigate('AccountSetup7Summary'); // Replace with your target screen name
  };

  const handleLaterClick = () => {
    handleUpdate('False');
    navigation.navigate('AccountSetup7Summary'); // Replace with your target screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile Creation</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/icon2.png')}
          style={styles.icon}
        />
        <Text style={styles.mainTitle}>
          Would you like to{'\n'}receive notifications{'\n'}from Meet Me Up?
        </Text>
        <Text style={styles.bodyText}>
          Notifications will be sent to your device to{'\n'}
          help you coordinate and plan dates! It will{'\n'}
          also let you know when you have received a{'\n'}
          message from a potential date!
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.yesButton} onPress={handleYesClick}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.laterButton} onPress={handleLaterClick}>
          <Text style={styles.buttonText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E4423F',
    padding: 0,
    margin: 0,
    flexDirection: 'column',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#E4423F',
    width: '100%',
  },
  arrowIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily: 'Segoe UI',
    fontSize: 22,
    fontWeight: 'normal',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  icon: {
    width: 73,
    height: 73,
    marginBottom: 8,
  },
  mainTitle: {
    fontFamily: 'Segoe UI',
    fontSize: 30,
    fontWeight: '200',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '200',
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  yesButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 130,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  laterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    color: '#000000',
  },
});

export default LocationPage2;
