import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import ProgressBar from '../src/Assets/Components/ProgressBar'; 
  // Reuse your existing ProgressBar or any placeholder if you prefer.
  import {
    getProfileSteps,
    getProfileCompletion,
  } from './profileStepsState'; 
export default function MyProfile() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 
  // Example data showing sub-profile tasks
  const [profileSteps, setProfileSteps] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(80);

  useEffect(() => {
    // Each time this screen is focused, load the current steps
    const steps = getProfileSteps();
    setProfileSteps(steps);

    const completion = getProfileCompletion();
    setProfileCompletion(completion);
  }, [isFocused]);

  const isProfileComplete = profileSteps.length === 0;

  const handlePressLink = (index) => {
    const step = profileSteps[index];
  
    if (step.title === 'your date preferences') {
      // 2 sub-pages
      if (step.count === 2) {
        navigation.navigate('DateAvailability', { stepIndex: index });
      } else if (step.count === 1) {
        navigation.navigate('TypeOfDate', { stepIndex: index });
      }
    }
    else if (step.title === 'a few more details about you') {
      // 8 sub-pages
      switch (step.count) {
        case 8:
          navigation.navigate('AdditionalDetailsOne', { stepIndex: index });
          break;
        case 7:
          navigation.navigate('AdditionalDetailsTwo', { stepIndex: index });
          break;
        case 6:
          navigation.navigate('AdditionalDetailsThree', { stepIndex: index });
          break;
        case 5:
          navigation.navigate('AdditionalDetailsFour', { stepIndex: index });
          break;
        case 4:
          navigation.navigate('AdditionalDetailsFive', { stepIndex: index });
          break;
        case 3:
          navigation.navigate('AdditionalDetailsSix', { stepIndex: index });
          break;
        case 2:
          navigation.navigate('AdditionalDetailsSeven', { stepIndex: index });
          break;
        case 1:
          navigation.navigate('AdditionalDetailsEight', { stepIndex: index });
          break;
        default:
          // If count is 0 or some unexpected value, do nothing or handle error
          break;
      }
    }
    else if (step.title === 'profile bio') {
      // 1 sub-page
      if (step.count === 1) {
        navigation.navigate('ProfileBio', { stepIndex: index });
      }
    }
    else if (step.title === 'verify your account') {
      // 2 sub-pages
      if (step.count === 2) {
        navigation.navigate('VerifyPhoneNumber1', { stepIndex: index });
      } else if (step.count === 1) {
        navigation.navigate('AddDriversLicense', { stepIndex: index });
      }
    }
    else {
      // Fallback or other steps
      // e.g. navigation.navigate(step.route, { stepIndex: index });
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Profile Media Section */}
        <View style={styles.mediaRow}>
          {/* Big photo/video on the left */}
          <View style={styles.bigMediaContainer}>
            <Image
              source={require('../assets/image1.png')} 
              // Replace with your actual image or video thumbnail
              style={styles.bigPhoto}
            />
            {/* If you want a "play" icon overlay for a video, do something like: */}
            <View style={styles.playIconOverlay}>
              <Ionicons name="play-circle" size={40} color="white" />
            </View>
          </View>

          {/* Two smaller photos on the right */}
          <View style={styles.smallMediaColumn}>
            <Image
              source={require('../assets/image2.png')}
              style={styles.smallPhoto}
            />
            <Image
              source={require('../assets/image3.png')}
              style={styles.smallPhoto}
            />
          </View>
        </View>

        {/* Page Indicator (3 dots) — for show only */}
        <View style={styles.pageIndicator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Lachlan Collis</Text>
          <Text style={styles.userEmail}>lachlan@konnectdigital.io</Text>
        </View>

        {/* Profile Completion Card (only if not fully complete) */}
        {!isProfileComplete && (
          <View style={styles.completionCard}>
            <Text style={styles.completionText}>
              Profile: {profileCompletion}% complete
            </Text>

            {/* ProgressBar usage (adapt to your component’s props) */}
            <ProgressBar startProgress={0} endProgress={profileCompletion} />

            {/* Links */}
            {profileSteps.map((step, index) => (
              <Pressable
                key={index}
                onPress={() => handlePressLink(index, step.route)}
              >
                <Text style={styles.completionLink}>
                  {step.title} ({step.count})
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Interests Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My interests</Text>
          <View style={styles.interestsRow}>
            {[
              'Cooking / Baking',
              'Gaming',
              'Sports',
              'Music',
              'Animals & Wildlife',
            ].map((interest, i) => (
              <View key={i} style={styles.interestChip}>
                <Text style={styles.interestChipText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* A little bit about me */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>A little bit about me</Text>
          {/* Example line items */}
          <View style={styles.aboutItem}>
            <Ionicons name="calendar-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> Born on April 26, 2001</Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="man-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> 5’11”</Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="people-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> 0 children</Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="male-female-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}>
              {' '}
              Sex assigned at birth was male
            </Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="male-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> Identifies as male</Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="heart-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> Bisexual</Text>
          </View>
          <View style={styles.aboutItem}>
            <Ionicons name="happy-outline" size={18} color="#999" />
            <Text style={styles.aboutItemText}> Open to men & women</Text>
          </View>
        </View>

        {/* Find My Match Button */}
        <TouchableOpacity style={styles.findMatchButton} onPress={() => navigation.navigate('VerifyPhoneNumber1')}>
          <Text style={styles.findMatchButtonText}>Find my match!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    // This row holds the title on the left and icons on the right
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 18,
  },
  mediaRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bigMediaContainer: {
    flex: 1,
    marginRight: 10,
    position: 'relative',
  },
  bigPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#DDD', // placeholder
  },
  playIconOverlay: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    opacity: 0.8,
  },
  smallMediaColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  smallPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#DDD',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'red',
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'gray',
    fontSize: 14,
    marginTop: 4,
  },
  completionCard: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  completionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  completionLink: {
    color: 'red',
    fontSize: 14,
    marginVertical: 3,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestChip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  interestChipText: {
    fontSize: 14,
    color: '#000',
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  aboutItemText: {
    marginLeft: 5,
    fontSize: 14,
  },
  findMatchButton: {
    backgroundColor: '#E4423F',
    marginTop: 30,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findMatchButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
