import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
//import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import Progress from "../src/Assets/Components/Progress";
import NextButton from "../src/Assets/Components/NextButton";
import HelperTextBox from "../src/Assets/Components/helperTextBox";
import { Dropdown } from "react-native-element-dropdown";
import { postUserData } from "../Api.js";

const initialRegion = {
  latitude: -32.015001263602,
  longitude: 115.83650856893345,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function AccountSetup3Create() {
  console.log("In AccountSetup3Create.js");
  const navigation = useNavigation();

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Nonbinary", value: "Nonbinary" },
  ];

  const sexualityOptions = [
    { key: "sexualityStraight", label: "Straight" },
    { key: "sexualityBisexual", label: "Bi-Sexual" },
    { key: "sexualityTransgender", label: "Trans-gender" },
    { key: "sexualityLGBTQ", label: "LGBTQ" },
    { key: "sexualityHomosexual", label: "Homosexual" },
  ];

  const openTo = [
    { key: "openToStraight", label: "Straight" },
    { key: "openToBisexual", label: "Bi-Sexual" },
    { key: "openToTransgender", label: "Trans-gender" },
    { key: "openToLGBTQ", label: "LGBTQ" },
    { key: "openToHomosexual", label: "Homosexual" },
  ];

  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    profileBio: "",
    location: "",
    sexualityStraight: false,
    sexualityBisexual: false,
    sexualityTransgender: false,
    sexualityLGBTQ: false,
    sexualityHomosexual: false,
    openToStraight: false,
    openToBisexual: false,
    openToTransgender: false,
    openToLGBTQ: false,
    openToHomosexual: false,
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    console.log("In Handle Change: ", formData);
  };

  const handleButton = (key) => {
    setFormData({
      ...formData,
      [key]: !formData[key],
    });
    console.log("In Handle Change: ", formData);
  };

  const handleUpdate = async (entries) => {
    // console.log("AccountSetup3Create.js entries: ", entries);

    const formData = new FormData();

    formData.append("user_uid", "100-000001");
    formData.append("user_email_id", "bobhawk@gmail.com");
    formData.append("user_first_name", entries.firstname);
    formData.append("user_last_name", entries.lastname);
    formData.append("user_age", entries.age);
    formData.append("user_gender", entries.gender);
    formData.append("user_sexuality", entries.sexualityStraight);
    formData.append("user_open_to", entries.openToStraight);

    console.log("AccountSetup3Create.js formData: ", formData);
    await postUserData(formData);
  };

  const handleNext = () => {
    handleUpdate(formData);
    navigation.navigate("AccountSetup4Create"); // Navigate to the next screen
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Progress percent='40%' prev='AccountSetup2Create' />
        <Text style={styles.header}>About You</Text>
        <Text style={styles.subHeader}>These details are about you and will be public to potential matches on meet me up.</Text>

        {/* Name */}
        <TextInput style={styles.input} placeholder='First Name' value={formData.firstname} onChangeText={(value) => handleChange("firstname", value)} />
        <TextInput style={styles.input} placeholder='Last Name' value={formData.lastname} onChangeText={(value) => handleChange("lastname", value)} />

        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder='Age' keyboardType='numeric' value={formData.age} onChangeText={(value) => handleChange("age", value)} />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            data={genders}
            maxHeight={150}
            labelField='label'
            valueField='value'
            placeholder={!isFocus ? "Gender" : "..."}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              handleChange("gender", item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <TextInput
          style={styles.profileInput}
          placeholder='Profile Bio'
          multiline
          numberOfLines={4}
          value={formData.profileBio}
          onChangeText={(value) => handleChange("profileBio", value)}
        />

        <Text style={styles.header}>Location</Text>
        <Text style={styles.subHeader}>Your location helps us pinpoint where you are to provide better matches to you.</Text>
        <TextInput style={styles.input} placeholder='Location' value={formData.location} onChangeText={(value) => handleChange("location", value)} />
        {/*               
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                >
                    <Marker coordinate={initialRegion} />
                </MapView> 

 */}
        <HelperTextBox text='Why do we need your location?' />

        <View style={styles.optionContainer}>
          <Text style={styles.header}>Your Sexuality</Text>
          <Text style={styles.subHeader}>Select the fields that best describe your sexuality</Text>
          {sexualityOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleButton(option.key)}
              style={[
                styles.option,
                {
                  backgroundColor: formData[option.key] ? "red" : "white",
                },
              ]}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionContainer}>
          <Text style={styles.header}>Open To...</Text>
          <Text style={styles.subHeader}>Select the fields that best describe what you are open to in a partner</Text>
          {openTo.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleButton(option.key)}
              style={[
                styles.option,
                {
                  backgroundColor: formData[option.key] ? "red" : "white",
                },
              ]}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <HelperTextBox text='Why do we need this information?' />
      </View>
      <View style={styles.buttonContainer}>
        <NextButton next='AccountSetup4Create' onPress={handleNext} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    marginTop: 15,
  },
  container: {
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 16,
    //    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "sans-serif",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "sans-serif",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    height: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  halfInput: {
    width: "48%",
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
    width: "48%",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: "sans-serif",
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
  },
  option: {
    backgroundColor: "#ffffff",
    borderRadius: 41,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  optionText: {
    color: "#000000",
    fontSize: 12,
    fontFamily: "sans-serif",
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
