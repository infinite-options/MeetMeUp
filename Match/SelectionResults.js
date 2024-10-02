import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView,View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AccountContext from '../AccountSetup/AccountContext';
// import TopTitle from '../Assets/Components/TopTitle';
import HawkImg from '../src/Assets/Images/Hawk.jpg'
import TiffanyImg from '../src/Assets/Images/Tiffany.jpeg';
import ButterflyImg from '../src/Assets/Images/Butterfly.jpg';
import CherryImg from '../src/Assets/Images/Cherry.jpg';
import BobImg from '../src/Assets/Images/Bob.jpg'
import ArrowForwardIcon from '../src/Assets/Images/arrow2.png'; // Replace with your actual icon
import AccountContext from '../AccountSetup/AccountContext.js';

const usersWhoSelectedYou = [
  { name: 'Hawk Tuah Tey', age: 40, where: 'Mandurah', gender: 'female', src: HawkImg, source: 'usersWhoSelectedYou' },
  { name: 'Cherrywood', age: 23, gender: 'female', where: 'Mandurah', src: CherryImg, source: 'usersWhoSelectedYou' },
];

const usersWhoYouSelected = [
  { name: 'Tiffany', age: 31, gender: 'female', where: 'Mandurah', src: TiffanyImg, source: 'usersWhoYouSelected' },
  { name: 'Bob Hawk', age: 43, gender: 'male', where: 'Mandurah', src: BobImg, source: 'usersWhoYouSelected' },
  { name: 'Esmeralda Butterfly', age: 29, where: 'Mandurah', gender: 'female', src: ButterflyImg, source: 'usersWhoYouSelected' },
];

const SelectionResults = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [noId, setNoId] = useState(false);
  const [userData, setUserData] = useState({});
  const { selections, setSelections } = useState();
  const loadUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_uid'); 
      console.log("THIS IS THE USER IDDDD", storedUserId)
      if (storedUserId) {
        // Fetch user data
        fetchUserData(storedUserId);
      } else {
        setNoId(true);
      }
    } catch (error) {
      console.log("Error fetching user ID", error);
      setNoId(true);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`);
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching user data', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadUserId();
  }, []);

  const handleEditPreferences = () => {
    navigation.navigate('MatchPreferences');
  };

  const handleUserClick = (user, source) => {
    // If user.name is NaN or undefined, use a fallback value
    const userName = user && user.name ? encodeURIComponent(user.name) : 'Unknown';
    
    navigation.navigate('user-details', { user, source });
};


  const UserBox = ({ user, type }) => (
    <TouchableOpacity onPress={() => handleUserClick(user, type)} style={styles.userBox}>
      <Image source={user.src} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{`${user.name}, ${user.age}`}</Text>
        <Text style={styles.userDetails}>{user.where}</Text>
      </View>
      <Image source={ArrowForwardIcon} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E4423F" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (noId) {
    navigation.navigate('AccountSetupLogin');
    return null;
  }

  let tempArray = selections ? selections.concat(usersWhoYouSelected) : usersWhoYouSelected;

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Matched Results</Text>
      {userData.matchedResults && userData.matchedResults.map((user, index) => (
        <UserBox key={index} user={user} type="matchedResults" />
      ))}

      <Text style={styles.sectionTitle}>People who selected you</Text>
      {tempArray.map((user, index) => (
        <UserBox key={index} user={user} type="usersWhoSelectedYou" />
      ))}

      <Text style={styles.sectionTitle}>People you selected</Text>
      {usersWhoYouSelected.map((user, index) => (
        <UserBox key={index} user={user} type="usersWhoYouSelected" />
      ))}

      <TouchableOpacity style={styles.editButton} onPress={handleEditPreferences}>
        <Text style={styles.editButtonText}>Edit Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea:{
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  pageTitle:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E0E3E6',
    borderRadius: 10,
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: 'grey',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  editButton: {
    backgroundColor: '#E4423F',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default SelectionResults;
