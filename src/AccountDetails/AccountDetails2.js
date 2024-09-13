import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, Button, StyleSheet } from 'react-native';
import account from '../Assets/Images/account.png';
import location from '../Assets/Images/location.png';
import notification from '../Assets/Images/notification.png';
import password from '../Assets/Images/password.png';
import arrow from '../Assets/Images/arrow.png';

const Account2 = () => {
  const [locationServices, setLocationServices] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const handleToggleLocationServices = () => {
    setLocationServices(!locationServices);
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back clicked')}>
          <Image source={arrow} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Image source={account} style={styles.icon} />
        <Text style={styles.sectionText}>Account Details</Text>
        <Text style={styles.arrowText}>&gt;</Text>
      </View>

      <View style={styles.section}>
        <Image source={password} style={styles.icon} />
        <Text style={styles.sectionText}>Update Password</Text>
        <Text style={styles.arrowText}>&gt;</Text>
      </View>

      <View style={styles.section}>
        <Image source={location} style={styles.icon} />
        <Text style={styles.sectionText}>Location Services</Text>
        <Switch
          value={locationServices}
          onValueChange={handleToggleLocationServices}
          style={styles.switch}
          trackColor={{ false: '#CECECE', true: '#E4423F' }} 
          thumbColor={locationServices ? '#E4423F' : '#FFFFFF'} 

        />
      </View>
      <Text style={styles.description}>
      This will help assist you in meeting up for 
potential dates and meeting in the correct 
locations.
      </Text>

      <View style={styles.section}>
        <Image source={notification} style={styles.icon} />
        <Text style={styles.sectionText}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={handleToggleNotifications}
          style={styles.switch}
          trackColor={{ false: '#CECECE', true: '#E4423F' }} 
          thumbColor={locationServices ? '#E4423F' : '#FFFFFF'}
        />
      </View>
      <Text style={styles.description}>
        Notifications will be sent to your device to help you coordinate and plan dates! It will also let you know when you have received a message from a potential date!
      </Text>

      <TouchableOpacity style={styles.settingsButton} onPress={handleLogout}>
        <Text style={styles.settingsButtonText}>Settings Saved</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Segoe UI',
    flexGrow: 1,
    width:'100%',
    alignItems: 'center',
    color:'#1A1A1A'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Segoe UI',
    flexGrow: 1,
    color:'#1A1A1A'
  },
  switch: {
    marginLeft: 'auto',
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Segoe UI',
    marginTop: -10,
    marginBottom: 24,
    color:'#1A1A1A'
  },
  settingsButton: {
    backgroundColor: '#E4423F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 90,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Segoe UI',
  },
});

export default Account2;