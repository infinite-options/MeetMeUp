// import React, { useState } from "react";
// import { SafeAreaView, Platform, StatusBar, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
// import { Text, TextInput } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";
// import ProgressBar from "../src/Assets/Components/ProgressBar";

// export default function BirthdayInput({ navigation }) {
//   const [birthdate, setBirthdate] = useState("");

//   const isFormComplete = birthdate !== "";

//   const handleContinue = () => {
//     if (isFormComplete) {
//       navigation.navigate("Height"); // Replace with your next page navigation
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="red" />
//       </TouchableOpacity>

//       {/* Progress Bar */}
//       <ProgressBar startProgress={20} endProgress={30} />

//       {/* Title */}
//       <View style={styles.content}>
//         <Text style={styles.title}>When’s your birthday?</Text>
//         <Text style={styles.subtitle}>Your age will be public.</Text>

//         {/* Input Field */}
//         <TextInput
//           label="dd/mm/yyyy"
//           value={birthdate}
//           onChangeText={(text) => setBirthdate(text)}
//           mode="outlined"
//           style={styles.input}
//           keyboardType="numeric"
//           outlineStyle={styles.textInputOutline}
//         />
//       </View>

//       {/* Continue Button */}
//       <Pressable
//               style={[
//                 styles.continueButton,
//                 { backgroundColor: isFormComplete ? "#E4423F" : "#ccc" },
//               ]}
//               onPress={handleContinue}
//               disabled={!isFormComplete}
//             >
//               <Text style={styles.continueButtonText}>Continue</Text>
//             </Pressable>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//         backgroundColor: '#FFF',
//         justifyContent: 'flex-start', // Align content to the top
//     alignItems: 'stretch',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//         backgroundColor: '#F5F5F5',
//         borderRadius: 20,
//         padding: 8,
//         marginBottom: 20,
//         marginTop: 30,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "flex-start",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#888",
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "#FFF", // Optional: customize input background
//     marginBottom: 20,
//     borderRadius: 25,
//   },
//   continueButton: {
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#E4423F",
//     borderRadius: 30,
//     marginBottom: 20, // Ensure some spacing at the bottom
//   },
//   continueButtonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   textInputOutline: {
//     borderWidth: 0,
//     borderColor: '#F9F9F9',
//     borderRadius:10,
//     flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#F9F9F9',
//         paddingHorizontal: 15,
//         marginBottom: 20,
//         height: 50,
// },
// });
import React, { useState } from "react";
import { SafeAreaView, Platform, StatusBar, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "../src/Assets/Components/ProgressBar";

export default function BirthdayInput({ navigation }) {
  const [birthdate, setBirthdate] = useState("");
  const [warning, setWarning] = useState("");
  const [isValid, setIsValid] = useState(false);

  const isValidDate = (date) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const isAtLeast18 = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed
    const age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }

    return age >= 18;
  };

  const handleInputChange = (text) => {
    setBirthdate(text);

    if (!isValidDate(text)) {
      setWarning("Please enter a valid date in the format dd/mm/yyyy.");
      setIsValid(false);
      return;
    }

    if (!isAtLeast18(text)) {
      setWarning("You must be 18+ to use MeetMeUp.");
      setIsValid(false);
      return;
    }

    setWarning(""); // Clear warning if valid
    setIsValid(true);
  };

  const handleContinue = () => {
    if (isValid) {
      navigation.navigate("Height"); // Replace with your next page navigation
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar */}
      <ProgressBar startProgress={20} endProgress={30} />

      {/* Title */}
      <View style={styles.content}>
        <Text style={styles.title}>When’s your birthday?</Text>
        <Text style={styles.subtitle}>Your age will be public.</Text>

        {/* Input Field */}
        <TextInput
  label="dd/mm/yyyy"
  value={birthdate}
  onChangeText={handleInputChange}
  mode="outlined"
  style={styles.input}
  keyboardType="numeric"
  outlineStyle={[
    styles.textInputOutline,
    warning !== "" && { borderColor: "#E4423F", borderWidth: 2, borderRadius: 10 },
  ]}
/>

        {/* Warning Section */}
        {warning !== "" && (
          <View style={styles.warningContainer}>
            <MaterialIcons name="error-outline" size={20} color="red" />
            <Text style={styles.warningText}>{warning}</Text>
          </View>
        )}
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isValid ? "#E4423F" : "#ccc" },
        ]}
        onPress={handleContinue}
        disabled={!isValid}
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
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 10,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  warningText: {
    color: "red",
    fontSize: 14,
    marginLeft: 8,
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
    borderColor: "#F9F9F9",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
});
