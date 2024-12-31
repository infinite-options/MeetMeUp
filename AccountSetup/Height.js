import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  TextInput, // For the cm input
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../src/Assets/Components/ProgressBar";

export default function Height({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    heightFt: 0,
    heightIn: 0,
    heightCm: "",
    numChildren: 0,
  });

  // "cm" or "ft"
  const [selectedUnit, setSelectedUnit] = useState("ft");

  const handleIncrement = (name) => {
    setFormData({ ...formData, [name]: formData[name] + 1 });
  };

  const handleDecrement = (name) => {
    setFormData({
      ...formData,
      [name]: formData[name] > 0 ? formData[name] - 1 : 0,
    });
  };

  // CHANGED: ft must be >= 1 to enable 'Continue'
  const isFormComplete =
    (selectedUnit === "ft" && formData.heightFt >= 1 && formData.heightIn !== "") ||
    (selectedUnit === "cm" && formData.heightCm.trim() !== "");

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

      {/* Title / Subtitle */}
      <View style={styles.content}>
        <Text style={styles.title}>How tall are you?</Text>
        <Text style={styles.subtitle}>Your height will be public.</Text>

        {/* Toggle for cm vs. ft & in */}
        <View style={styles.unitToggleContainer}>
          <TouchableOpacity style={styles.toggleSpacing} onPress={() => setSelectedUnit("cm")}>
            <Text
              style={[
                styles.unitToggleText,
                selectedUnit === "cm" ? styles.unitToggleActive : null,
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toggleSpacing} onPress={() => setSelectedUnit("ft")}>
            <Text
              style={[
                styles.unitToggleText,
                selectedUnit === "ft" ? styles.unitToggleActive : null,
              ]}
            >
              ft & in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Show ft/in selectors if "ft" is selected */}
        {selectedUnit === "ft" && (
          <View style={styles.row}>
            {/* Feet Selector */}
            <View style={styles.selector}>
              <TouchableOpacity
                onPress={() => handleIncrement("heightFt")}
                style={styles.arrowButton}
              >
                <Ionicons name="caret-up" size={30} color="#888" />
              </TouchableOpacity>

              <Text style={styles.selectorValue}>
                <Text style={styles.valueText}>{formData.heightFt}</Text>
                <Text style={styles.unitText}> ft</Text>
              </Text>

              <TouchableOpacity
                onPress={() => handleDecrement("heightFt")}
                style={styles.arrowButton}
              >
                <Ionicons name="caret-down" size={30} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Inches Selector */}
            <View style={styles.selector}>
              <TouchableOpacity
                onPress={() => handleIncrement("heightIn")}
                style={styles.arrowButton}
              >
                <Ionicons name="caret-up" size={30} color="#888" />
              </TouchableOpacity>

              <Text style={styles.selectorValue}>
                <Text style={styles.valueText}>{formData.heightIn}</Text>
                <Text style={styles.unitText}> in</Text>
              </Text>

              <TouchableOpacity
                onPress={() => handleDecrement("heightIn")}
                style={styles.arrowButton}
              >
                <Ionicons name="caret-down" size={30} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Show cm input if "cm" is selected */}
        {selectedUnit === "cm" && (
          <View style={styles.row}>
            <TextInput
              style={styles.cmInput}
              placeholder="Enter height in cm"
              keyboardType="numeric"
              value={formData.heightCm}
              onChangeText={(text) =>
                setFormData({ ...formData, heightCm: text })
              }
            />
          </View>
        )}
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isFormComplete ? "#E4423F" : "#ccc" },
        ]}
        onPress={
          isFormComplete
            ? () => navigation.navigate("HaveChildren")
            : null
        }
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
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    justifyContent: "flex-start", // Align content to the top
    alignItems: "stretch",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selector: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingVertical: 10,
  },
  selectorValue: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
  },
  valueText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  unitText: {
    fontSize: 16,
    color: "#000",
  },
  arrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  continueButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4423F",
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  unitToggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  unitToggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    marginHorizontal: 20,
  },
  unitToggleActive: {
    color: "red",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  cmInput: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
  },
  toggleSpacing: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "55%",
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingVertical: 10, // Adjust as needed
  },
  
});
