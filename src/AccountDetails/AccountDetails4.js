import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import arrow from '../Assets/Images/arrow.png'; 

const { width } = Dimensions.get('window');

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back clicked')} style={styles.backButton}>
          <Image source={arrow} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update Password</Text>
      </View>

      <Text style={styles.sectionTitle}>Security</Text>

      <Text style={styles.sectionDescription}>
        We need some basic account details to help verify your identity and account.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Current Password</Text>
        <Text style={styles.infoText}>*******</Text>
      </View>

      <TouchableOpacity style={styles.nextButtonContainer} onPress={() => console.log('next')}>
        <Text style={styles.nextButtonContainerText}>Next</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 16,
  },
  arrowIcon: {
    width: 28,
    height: 28,
  },
  headerText: {
    fontFamily: 'Segoe UI',
    fontSize: 22,
    fontWeight: 450,
    color: '#1A1A1A',
    flexGrow: 1,
    alignText:'center',
    marginLeft: 60
  },
  sectionTitle: {
    fontFamily: 'Segoe UI',
    fontSize: 18,
    fontWeight: 400,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#E2E2E2',
    width: 384,
    height: 60,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoBoxMargin: {
    marginRight: 50,
  },
  infoLabel: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: 600,
    color: '#E4423F',
    marginBottom: 4,
    marginTop: 0
  },
  infoText: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  nextButtonContainer: {
    backgroundColor: '#E4423F',
    borderRadius: 20,
    width: 130,
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 90,
    alignItems: 'center',
    marginLeft: 120
  },
  nextButtonContainerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Segoe UI',
    alignItems: 'center'
  },
});

export default SettingsPage;