import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HelperTextBox from '../src/Assets/Components/helperTextBox';
import Progress from '../src/Assets/Components/Progress';
import NextButton from '../src/Assets/Components/NextButton';
import DrawerContext from '../src/Assets/Components/DrawerContext';
import DrawerOptions from '../src/Assets/Components/DrawerOptions';

export default function AccountSetup4Create() {
  const [option, setOption] = useState('');
  const [noId, setNoId] = useState(false);
  const navigation = useNavigation();
  const [pickerValue, setPickerValue] = useState({ single: '' });
  const [userId, setUserId] = useState(null); // Change useRef to useState
  const[userEmail,setUserEmail]=useState(null);
  const [formData, setFormData] = useState({
    user_height: '',
    user_education: '',
    user_body_composition: '',
    user_star_sign: '',
    user_drinking: '',
    user_smoking: '',
    user_kids: '',
    user_job: '',
    user_religion: '',
    user_nationality: '',
    user_general_interests: [],
  });
  
  const [specifics, setSpecifics] = useState({
    height: '',
    education: '',
    body: '',
    star: '',
    drinking: '',
    smoking: '',
    children: '',
    position: '',
    religion: '',
    gender: '',
    nationality: '',
    general_interests: [],
  });

  const [loading, setLoading] = useState(true);
  const [passData, setPassData] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdValue = await AsyncStorage.getItem("user_uid");
        const userEmail = await AsyncStorage.getItem("user_email_id");
        console.log("EMAILL",userEmail)
        if (userIdValue) {
          setUserEmail(userEmail);
          setUserId(userIdValue); // Set the userId in state
          const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userIdValue}`);
          const fetchedData = response.data.result[0];
          setLoading(false);
          
          handleSetSpecifics('height', fetchedData.user_height || '');
          handleSetSpecifics('education', fetchedData.user_education || '');
          handleSetSpecifics('body', fetchedData.user_body_composition || '');
          handleSetSpecifics('star', fetchedData.user_star_sign || '');
          handleSetSpecifics('drinking', fetchedData.user_drinking || '');
          handleSetSpecifics('smoking', fetchedData.user_smoking || '');
          handleSetSpecifics('children', fetchedData.user_kids || '');
          handleSetSpecifics('position', fetchedData.user_job || '');
          handleSetSpecifics('religion', fetchedData.user_religion || '');
          handleSetSpecifics('nationality', fetchedData.user_nationality || '');

          const interestsArray = fetchedData.user_general_interests ? fetchedData.user_general_interests.split(',') : [];
          setFormData((prevFormData) => ({
            ...prevFormData,
            user_general_interests: interestsArray,
          }));
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSetSpecifics = (name, value) => {
    setSpecifics((prevSpecifics) => ({
      ...prevSpecifics,
      [name]: value,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [specificsName[name]]: value,
    }));
  };

  const handleNext = async () => {
    const specificsForm = populateFormData();
    try {
      const response = await axios.put(
        'https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo',
        specificsForm
      );
      if (response.status === 200) {
        console.log(response.data);
        navigation.navigate('AccountSetup7Summary');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const populateFormData = () => {
    const specificsForm = new FormData();
    specificsForm.append('user_uid', userId); // Ensure userId is appended here
    specificsForm.append('user_email_id',userEmail);
    Object.entries(formData).forEach(([key, value]) => {
      specificsForm.append(key, value);
    });
    return specificsForm;
  };

  const generalInterests = [
    'Eating Out',
    'Bike Rides',
    'Drinking',
    'Dancing',
    'Cooking',
    'Baking',
    'Crafting',
    'Painting',
    'Surfing',
    'Traveling',
  ];

  const specificsName = {
    height: 'user_height',
    education: 'user_education',
    body: 'user_body_composition',
    star: 'user_star_sign',
    drinking: 'user_drinking',
    smoking: 'user_smoking',
    children: 'user_kids',
    position: 'user_job',
    religion: 'user_religion',
    nationality: 'user_nationality',
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Progress percent="60%" />

      {/* <Text style={styles.headerText}>Your General Interests</Text>
      <Text style={styles.subHeaderText}>
        These interests help match you to better people on meet me up. Select or add as many interests as you want.
      </Text>

      {generalInterests.map((interest, index) => (
        <TouchableOpacity key={index} style={styles.interestButton}>
          <Text>{interest}</Text>
        </TouchableOpacity>
      ))} */}

      <Text style={styles.headerText}>Some Specifics</Text>
      <Text style={styles.subHeaderText}>
        These help give a better insight into who you are and will allow matches to better understand you as a person.
      </Text>

      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('height')}
      >
        <Text>Height: {specifics.height || 'Not Entered'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('education')}
      >
        <Text>Education: {specifics.education || 'Not Entered'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('body')}
      >
        <Text>Body Composition: {specifics.body || 'Not Entered'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('star')}
      >
        <Text>Star Sign: {specifics.star || 'Not Entered'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('drinking')}
      >
        <Text>Drinking: {specifics.drinking || 'Not Entered'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('smoking')}
      >
        <Text>Smoking: {specifics.smoking || 'Not Entered'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('children')}
      >
        <Text>Kids: {specifics.children || 'Not Entered'}</Text>
      </TouchableOpacity>
      {/*JOB*/}
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('position')}
      >
        <Text>Job: {specifics.position || 'Not Entered'}</Text>
      </TouchableOpacity>
      {/*Religion*/}
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('religion')}
      >
        <Text>Religion: {specifics.religion || 'Not Entered'}</Text>
      </TouchableOpacity>
      {/*Nationality*/}
      <TouchableOpacity
        style={styles.specificButton}
        onPress={() => setOption('nationality')}
      >
        <Text>Nationality: {specifics.nationality || 'Not Entered'}</Text>
      </TouchableOpacity>
      <HelperTextBox
        text="That's a lot of information..."
        title="Why so much information?"
        subtitle="Sharing more about yourself enhances compatibility and increases the likelihood of finding a match."
      />

      <NextButton onPress={handleNext} />
      <DrawerContext.Provider
        value={{
          specifics,
          option,
          setOption,
          handleSetSpecifics,
          passData,
          setPassData,
          complete,
          setComplete,
          pickerValue,
          setPickerValue,
        }}
      >
        <DrawerOptions />
      </DrawerContext.Provider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
  },
  specificButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  interestButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
