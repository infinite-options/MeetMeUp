import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import arrow from '../assets/arrow.png'; 

const { width } = Dimensions.get('window');

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back clicked')} style={styles.backButton}>
          <Image source={arrow} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <Text style={styles.sectionTitle}>Account Details</Text>

      <Text style={styles.sectionDescription}>
        We need some basic account details to help verify your identity and account.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoText}>lachlan@konnectdigital.io</Text>
      </View>

      <View style={[styles.infoBox, styles.infoBoxMargin]}>
        <Text style={styles.infoLabel}>Phone Number</Text>
        <Text style={styles.infoText}>0412 345 678</Text>
      </View>
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
    marginLeft: 110
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
});

export default SettingsPage;