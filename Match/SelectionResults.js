import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SelectionResults = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [peopleYouSelected, setPeopleYouSelected] = useState([]);
  const [peopleSelectedYou, setPeopleSelectedYou] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noId, setNoId] = useState(false);

  // Load the user ID from AsyncStorage
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('user_uid');
        if (id) {
          setUserId(id);
        } else {
          setNoId(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading user ID', error);
      }
    };

    loadUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likesResponse, matchesResponse] = await Promise.all([
          axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/likes/${userId}`),
          axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/matches/${userId}`)
        ]);

        const { matched_results, people_whom_you_selected, people_who_selected_you } = likesResponse.data;
        const matchesData = matchesResponse.data.result;

        const enrichUserData = (users) => users.map(user => {
          const matchData = matchesData.find(match => match.user_uid === user.user_uid);
          return { ...user, ...matchData };
        });

        const enrichedMatched = enrichUserData(matched_results);
        const enrichedYouSelected = enrichUserData(people_whom_you_selected);
        const enrichedSelectedYou = enrichUserData(people_who_selected_you);

        setUserData(enrichedMatched);
        setPeopleYouSelected(enrichedYouSelected);
        setPeopleSelectedYou(enrichedSelectedYou);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleEditPreferences = () => {
    navigation.navigate('MatchPreferences');
  };

  const handleMatchList = () => {
    navigation.navigate('Match');
  };

  const handleUserClick = (user, source) => {
    navigation.navigate('UserDetails', { user, source });
  };

  const handleNext = (user) => {
    navigation.navigate('Message', { user });
  };

  const renderUserBox = ({ item, type }) => (
    <View style={styles.userBox}>
      <TouchableOpacity onPress={() => handleUserClick(item, type)} style={styles.userButton}>
        <Image source={{ uri: item.user_photo_url ? JSON.parse(item.user_photo_url)[0] : 'No photo' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user_first_name} {item.user_last_name}</Text>
          <Text style={styles.userDetails}>{item.user_age} {item.user_gender} {item.user_suburb}</Text>
        </View>
      </TouchableOpacity>
      <Button title="Message" onPress={() => handleNext(item)} />
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (noId) {
    Alert.alert("Error", "User ID not found, redirecting...");
    navigation.navigate('AccountSetup1Login');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selection Results</Text>

      <Text style={styles.sectionTitle}>Matched Results</Text>
      <FlatList
        data={userData}
        renderItem={({ item }) => renderUserBox({ item, type: 'matchedResults' })}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.sectionTitle}>People Who Selected You</Text>
      <FlatList
        data={peopleSelectedYou}
        renderItem={({ item }) => renderUserBox({ item, type: 'usersWhoSelectedYou' })}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.sectionTitle}>People You Selected</Text>
      <FlatList
        data={peopleYouSelected}
        renderItem={({ item }) => renderUserBox({ item, type: 'usersWhoYouSelected' })}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleEditPreferences} style={styles.actionButton}>
          <Text style={styles.buttonText}>Edit Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMatchList} style={styles.actionButton}>
          <Text style={styles.buttonText}>Match List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    width: '40%',
    backgroundColor: '#E4423F',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectionResults;
