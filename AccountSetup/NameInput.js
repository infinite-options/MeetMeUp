import React, { useState} from "react";
import {StatusBar, Platform, SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Text, TextInput } from "react-native-paper"; // Import TextInput from react-native-paper
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../src/Assets/Components/ProgressBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NameInput({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
  });

  const isFormComplete = formData.fullName.trim() !== "";
  const getUserData = async () => {
    try {
      const user_uid = await AsyncStorage.getItem('user_uid');
      const user_email_id = await AsyncStorage.getItem('user_email_id');
      
      console.log("🔹 Retrieved User UID:", user_uid);
      console.log("🔹 Retrieved User Email:", user_email_id);
  
      return { user_uid, user_email_id };
    } catch (error) {
      console.error("Error retrieving user data", error);
      return null;
    }
  };
  const saveUserName = async (fullName) => {
    try {
      await AsyncStorage.setItem('user_full_name', fullName);
    } catch (error) {
      console.error("Error saving name", error);
    }
  };
  const splitName = (fullName) => {
    const nameArray = fullName.trim().split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray.length > 1 ? nameArray.slice(1).join(" ") : "";
    return { firstName, lastName };
  };
  const updateUserName = async (fullName) => {
    const userData = await getUserData();
  
    if (!userData?.user_uid || !userData?.user_email_id) {
      console.error(" User UID or Email is missing.");
      return;
    }
  
    console.log("Sending to API:");
    console.log("User UID:", userData.user_uid);
    console.log("User Email:", userData.user_email_id);
  
    const { firstName, lastName } = splitName(fullName);
  
    const formData = new FormData();
    formData.append("user_uid", userData.user_uid);
    formData.append("user_email_id", userData.user_email_id);
    formData.append("user_first_name", firstName);
    formData.append("user_last_name", lastName);
  
    try {
      const response = await fetch(
        "https://41c664jpz1.execute-api.us-west-1.amazonaws.com/dev/userinfo",
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };
  
  const handleContinue = async () => {
    if (isFormComplete) {
      await updateUserName(formData.fullName);
      await saveUserName(formData.fullName);
      navigation.navigate("BirthdayInput"); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar */}
      <ProgressBar startProgress={10} endProgress={20} />

      {/* Title and Input Fields */}
      <View style={styles.content}>
        <Text style={styles.title}>What should we call you?</Text>
        <Text style={styles.subtitle}>Your full name will be public.</Text>
        <TextInput
          label="Full Name" // Add floating label
          mode="outlined" // Optional, choose "flat" or "outlined"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          style={styles.input}
          outlineStyle={styles.textInputOutline}
        />
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isFormComplete ? "#E4423F" : "#ccc" },
        ]}
        onPress={handleContinue}
        disabled={!isFormComplete}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start', // Align content to the top
    alignItems: 'stretch',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 8,
    marginBottom: 20,
    marginTop: 30,
  },
  content: {
    flex: 1, // Take up remaining space
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000',
        marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
        color: 'gray',
        textAlign: 'left',
        marginBottom: 20,
  },
  input: {
    marginBottom: 15, // Space between input fields
  },
  continueButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4423F",
    borderRadius: 30,
    marginBottom: 20, // Ensure some spacing at the bottom
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInputOutline: {
    borderWidth: 0,
    borderColor: '#F9F9F9',
    borderRadius:10,
    flex: 1,
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
},
});
