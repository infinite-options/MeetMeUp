import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import MapView, { Marker } from 'react-native-maps';

// Replace this with your Google Maps API key
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

export default function AccountSetup3Create({ navigation }) {
  const [userData, setUserData] = useState({});
  const [savedAddress, setSavedAddress] = useState("");
  const [center, setCenter] = useState({ lat: -32.015001263602, lng: 115.83650856893345 });
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    profileBio: "",
    suburb: "",
    country: "",
    sexuality: "",
    openTo: [],
  });
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = useRef(null); // UseRef to store userId instead of localStorage
  const genders = ["Male", "Female", "Nonbinary"];
  const sexuality = ["Straight", "Bisexual", "Transgender", "LGBTQ", "Homosexual"];
  const openTo = ["Straight", "Bisexual", "Transgender", "LGBTQ", "Homosexual"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdValue = await AsyncStorage.getItem("user_uid");
        userId.current = userIdValue;

        if (userIdValue) {
          const response = await axios.get(`https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo/${userIdValue}`);
          const fetchedData = response.data.result[0];
          setUserData(fetchedData);
          setFormData({
            ...formData,
            name: `${fetchedData.user_first_name} ${fetchedData.user_last_name}` || "",
            age: fetchedData.user_age || "",
            gender: fetchedData.user_gender || "",
            profileBio: fetchedData.user_profile_bio || "",
            suburb: fetchedData.user_suburb || "",
            sexuality: fetchedData.user_sexuality || "",
            openTo: fetchedData.user_open_to ? fetchedData.user_open_to.split(",") : [],
          });
          if (fetchedData.user_latitude && fetchedData.user_longitude) {
            setCenter({
              lat: Number(fetchedData.user_latitude),
              lng: Number(fetchedData.user_longitude),
            });
            await handleAddress(fetchedData.user_latitude, fetchedData.user_longitude);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
      if (response.ok) {
        const result = await response.json();
        if (result.results.length > 0) {
          const address = result.results[0].formatted_address;
          setSavedAddress(address);
        }
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
  };

  const handleChange = (name, value) => {
    setIsChanged(true);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButton = (id, type) => {
    setIsChanged(true);
    if (formData[type].includes(id)) {
      const newArray = formData[type].filter((item) => item !== id);
      setFormData({ ...formData, [type]: newArray });
    } else {
      setFormData({ ...formData, [type]: [...formData[type], id] });
    }
  };

  const handleNext = async () => {
    const url = "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo";
    const fd = new FormData();
    const nameArray = formData.name.split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray.length > 1 ? nameArray[nameArray.length - 1] : "";

    fd.append("user_uid", userId.current);
    fd.append("user_email_id", await AsyncStorage.getItem("user_email"));
    fd.append("user_first_name", firstName);
    fd.append("user_last_name", lastName);
    fd.append("user_age", formData.age);
    fd.append("user_gender", formData.gender);
    fd.append("user_suburb", formData.suburb);
    fd.append("user_profile_bio", formData.profileBio);
    fd.append("user_country", formData.country);
    fd.append("user_latitude", center.lat);
    fd.append("user_longitude", center.lng);
    fd.append("user_sexuality", formData.sexuality);
    fd.append("user_open_to", formData.openTo.join(","));

    if (isChanged) {
      try {
        const response = await fetch(url, {
          method: "PUT",
          body: fd,
        });
        if (response.ok) {
          const result = await response.json();
          console.log("Response from server:", result);
        }
      } catch (error) {
        console.log("Error updating user data:", error);
      }
    }
    navigation.navigate("AccountSetup4Create");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>About You</Text>
      <Text style={styles.subHeaderText}>These details are about you and will be public to potential matches on meet me up.</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { width: "48%" }]}
          label= "Age"
          placeholder="Age"
          value={formData.age}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("age", text)}
        />
        <TextInput
          style={[styles.input, { width: "48%" }]}
          placeholder="Gender"
          value={formData.gender}
          onChangeText={(text) => handleChange("gender", text)}
        />
      </View>
      <Text style={styles.label}>Suburb</Text>
      <TextInput
        style={styles.input}
        placeholder="Suburb"
        value={formData.suburb}
        onChangeText={(text) => handleChange("suburb", text)}
      />
      <Text style={styles.label}>Profile Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Profile Bio"
        value={formData.profileBio}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => handleChange("profileBio", text)}
      />

      <Text style={styles.headerText}>Location</Text>
      <Text style={styles.subHeaderText}>Your location helps us pin point where you are to provide better matches to you.</Text>
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={savedAddress}
        editable={false}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={{ latitude: center.lat, longitude: center.lng }} />
      </MapView>

    

      <Text style={styles.headerText}>Your Sexuality</Text>

      <Text style={styles.headerText}>Open To...</Text>

  

      <Pressable onPress={handleNext}><Text>Next</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#E4423F",
    marginBottom: 5,
},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
});

