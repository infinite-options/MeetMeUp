import React,{ useEffect, useState }  from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { useContext } from 'react';
import AccountContext from '../AccountSetup/AccountContext'; 
import { fetchUserInfo } from "../../Api.js";

// Import images
const profile = require('../Assets/Images/profile.png');
const setting = require('../Assets/Images/setting.png');
const card = require('../Assets/Images/card.png');
const search = require('../Assets/Images/search.png');
const group = require('../Assets/Images/group.png');
const img1 = require('../Assets/Images/img1.png');
const img2 = require('../Assets/Images/img2.png');
const img3 = require('../Assets/Images/img3.png');
const upload = require('../Assets/Images/upload.png');
const heightImg = require('../Assets/Images/height.png');
const genderImg = require('../Assets/Images/gender.png');
const faith = require('../Assets/Images/faith.png');
const star = require('../Assets/Images/star.png');
const multi = require('../Assets/Images/multi.png');
const hat = require('../Assets/Images/hat.png');
const heartImg = require('../Assets/Images/heart.png');
const jobImg = require('../Assets/Images/job.png');
const drinkImg = require('../Assets/Images/drink.png');
const smokeImg = require('../Assets/Images/smoke.png');
const flagImg = require('../Assets/Images/flag.png');
const diamond = require('../Assets/Images/diamond.png');
const time = require('../Assets/Images/time.png');

const AccountInfo = ({ img, info }) => (
  <View style={styles.accountInfoContainer}>
    <Image source={img} style={styles.accountInfoImage} />
    <Text style={styles.accountInfoText}>{info}</Text>
  </View>
);

const Profile = () => {
  const navigation = useNavigation();
  const { details } = '';//useContext(AccountContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 


  const separateInterests = (obj) => {
    const interests = {};
    const specifics = {};
    
    for (const key in obj) {
      if (key.startsWith('interests') && obj[key] === 'true') {
        interests[key] = obj[key];
      } else {
        specifics[key] = obj[key];
      }
    }
    
    return { interests, specifics };
  };

  const { specifics } = separateInterests(details);
  // const interestArray = Object.keys(interests).map(key => ({
  //   key: key.replace('interests', ''),
  // }));

  const handleUpdate = () => {
    navigation.navigate('AccountSetup4Create');
  };

  const handlePreferences = () => {
    navigation.navigate('Matching1PreferencesPage');
  };

  const handleSelections = () => {
    navigation.navigate('SelectionResults');
  };

  // Extract specifics
 // const { name,age,gender, where, height, religion, star: sign, status, education, body: heart, job, drinking: drink, smoking: smoke, nationality: flag } = specifics;

  

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
    try {
        const data = await fetchUserInfo('100-000001');
        if (isMounted) { 
            setUserInfo(data);
          }          
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          console.error('Error fetching userInfo:', error); 
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData(); 
    return () => {
      isMounted = false; 
    };
  }, []);


  let interestArray = [];
  if (userInfo && userInfo.user_general_interests) {
    interestArray = JSON.parse(userInfo.user_general_interests);
  }

  if (loading) {
    return <Text>Loading...</Text>; 
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={profile} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePreferences} style={styles.iconButton}>
          <Image source={search} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSelections} style={styles.iconButton}>
          <Image source={group} style={styles.iconImage} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>About You</Text>

      <View style={styles.imageContainer}>
        <Image source={img1} style={styles.image} />
        <Image source={img3} style={styles.image} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={img2} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload</Text>
        <Image source={upload} style={styles.uploadButtonImage} />
      </TouchableOpacity>

      <Text style={styles.name}>{userInfo.user_first_name} {userInfo.user_last_name}</Text>
      <Text style={styles.subtitle}>{userInfo.user_age} - {userInfo.user_gender} - {userInfo.where}</Text>

      <Text style={styles.subtitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        {interestArray.map((interest, index) => (
          <View key={index} style={styles.interestItem}>
            <Text>{interest}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>A Little About Me ...</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut. {'\n'}{'\n'}
        Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.
      </Text>

      <AccountInfo img={heightImg} info={userInfo.user_height} />
      <AccountInfo img={genderImg} info={userInfo.user_gender} />
      <AccountInfo img={faith} info={userInfo.user_religion} />
      <AccountInfo img={star} info={userInfo.user_star_sign} />
      <AccountInfo img={multi} info={userInfo.user_status} />
      <AccountInfo img={hat} info={userInfo.user_education} />
      <AccountInfo img={heartImg} info={userInfo.user_heart} />
      <AccountInfo img={jobImg} info={userInfo.user_job} />
      <AccountInfo img={drinkImg} info={userInfo.user_drinking} />
      <AccountInfo img={smokeImg} info={userInfo.user_smoking} />
      <AccountInfo img={flagImg} info={userInfo.user_flag} />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
        <View style={styles.footerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.footerIconButton}>
            <Image source={setting} style={styles.footerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerIconButton}>
            <Image source={card} style={styles.footerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerIconButton}>
            <Image source={diamond} style={styles.footerIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerIconButton}>
            <Image source={time} style={styles.footerIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Matching1PreferencesPage')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    margin: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  image: {
    width: '48%',
    height: 100,
    resizeMode: 'cover',
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
    height: 45,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  uploadButtonImage: {
    width: 24,
    height: 24,
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestItem: {
    width: '33%',
    alignItems: 'center',
    padding: 8,
  },
  description: {
    fontSize: 14,
    marginVertical: 16,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  accountInfoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  accountInfoText: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    height: 45,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footerIcons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerIconButton: {
    backgroundColor: '#CECECE',
    borderRadius: 25,
    marginHorizontal: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 25,
    height: 45,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Profile;
