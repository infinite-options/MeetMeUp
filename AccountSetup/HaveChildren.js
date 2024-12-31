import React, { useState } from "react";
import {
  View,
  Text,
StatusBar, Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from '../src/Assets/Components/ProgressBar';
export default function HaveChildren({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    heightFt: 0,
    heightIn: 0,
    numChildren: 0,
  });

  const handleIncrement = (name) => {
    setFormData({ ...formData, [name]: formData[name] + 1 });
  };

  const handleDecrement = (name) => {
    setFormData({
      ...formData,
      [name]: formData[name] > 0 ? formData[name] - 1 : 0,
    });
  };

  const isFormComplete =
    formData.numChildren !== "" ;

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
                  <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => navigation.goBack()}
                  >
                      <Ionicons name="arrow-back" size={28} color="red" />
                  </TouchableOpacity>

      {/* Progress Bar */}
        <ProgressBar startProgress={30} endProgress={30} />

      {/* Title and Subtitle */}
      <View style={styles.content}>
      <Text style={styles.title}>How many children do you have?</Text>
      <Text style={styles.subtitle}>
        The number of children you have will be public.
      </Text>

      {/* Input Fields */}


      {/* Number of Children Section */}
      <View style={styles.fieldWrapperFull}>
        <Text style={styles.fieldLabel}># of Children</Text>
        <View style={styles.field}>
        <Text style={styles.fieldValue}>{formData.numChildren}</Text>
          <TouchableOpacity
            onPress={() => handleDecrement("numChildren")}
            style={styles.fieldButton}
          >
            <Text style={styles.fieldButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => handleIncrement("numChildren")}
            style={styles.fieldButton}
          >
            <Text style={styles.fieldButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isFormComplete ? "#E4423F" : "#ccc" },
        ]}
        onPress={isFormComplete ? () => navigation.navigate("AssignedSex") : null}
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
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
    marginBottom: 20,
    marginTop: 30,
},
content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  fieldWrapper: {
    flex: 1,
    marginRight: 10,
  },
  fieldWrapperFull: {
    width: "100%",
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  fieldValue: {
    textAlign: "left",
    flex:1,
    fontSize: 16,
    fontWeight: "bold",
  },
  fieldButton: {
    paddingHorizontal: 10,
  },
  fieldButtonText: {
    fontSize: 20,
    color: "#888",
  },
  separator: {
    width: 1,
    height: "60%",
    backgroundColor: "#ccc",
  },
  continueButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4423F",
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20, // Ensure some spacing at the bottom
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

