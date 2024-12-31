// still working on it this is the place holder and below code is he actujal one
import React, { useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import ProgressBar from '../src/Assets/Components/ProgressBar';

export default function LocationScreen({ navigation }) {
  // Track the text in the search bar
  const [searchText, setSearchText] = useState('');
  // Track location (latitude & longitude). Null if not chosen yet
  const [location, setLocation] = useState(null);

  // Some default region for the map to center on
  const [region, setRegion] = useState({
    latitude: 37.7749, // e.g., San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  });

  // Whether the user has a valid location to continue
  const isFormComplete = !!location;

  // Placeholder: call a geocoding or Places API to convert `searchText` into lat/lng
  const handleSearch = async () => {
    // Example only: we’ll set a dummy lat/lng, then center the map & place the marker
    if (searchText.trim().length === 0) {
      alert('Please enter a location!');
      return;
    }

    // In real usage, you'd call a geocoding endpoint here:
    // e.g., fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchText}&key=YOUR_KEY`)
    // parse JSON, and set lat/lng from the response
    // For now, we do a dummy location (San Jose, CA):
    const dummyLat = 37.3382;
    const dummyLng = -121.8863;
    setLocation({ latitude: dummyLat, longitude: dummyLng });

    // Also update map region to center on that location
    setRegion({
      ...region,
      latitude: dummyLat,
      longitude: dummyLng,
    });
  };

  // Handle map region changes if you want (optional)
  const handleRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const handleContinue = () => {
    if (location) {
      // Move to the next screen or save the location
      navigation.navigate('EnableLocationScreen', { location });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar */}
      <ProgressBar startProgress={80} endProgress={90} />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Add your location</Text>
      <Text style={styles.subtitle}>
        Discover matches within your preferred distance.
      </Text>

      {/* Trial Version Notice */}
      <View style={styles.trialBox}>
        <Text style={styles.trialHeading}>TRIAL VERSION</Text>
        <Text style={styles.trialBody}>
          For the testing phase, the location function is only available{' '}
          <Text style={styles.link}>here</Text> and the{' '}
          <Text style={styles.link}>map setting</Text> in your profile.
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search your location..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity onPress={handleSearch} style={styles.searchIconWrapper}>
          <Ionicons name="search" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {/* Marker if user has chosen a location */}
          {location && (
            <Marker
              coordinate={location}
              title="Selected Location"
              description={searchText || 'Location'}
              pinColor="red" // or any custom color
            />
          )}
        </MapView>
      </View>

      {/* Continue Button */}
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: isFormComplete ? '#E4423F' : '#ccc' },
        ]}
        onPress={handleContinue}
        disabled={!isFormComplete}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // Align content to the top
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    // Padding for Android devices
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  trialBox: {
    marginBottom: 20,
  },
  trialHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  trialBody: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  link: {
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },

  // Search row: text input + icon
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 15,
  },

  // Map container
  mapContainer: {
    width: '100%',
    height: 250, // Adjust as needed
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },

  // Continue button
  continueButton: {
    height: 60,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   Platform,
//   StatusBar,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Pressable,
//   FlatList,
//   Keyboard,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import MapView, { Marker } from "react-native-maps";
// import axios from "axios";
// import ProgressBar from "../src/Assets/Components/ProgressBar";
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// export default function LocationScreen({ navigation }) {
//   const [searchText, setSearchText] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [region, setRegion] = useState({
//     latitude: 37.7749, // Default: San Francisco
//     longitude: -122.4194,
//     latitudeDelta: 0.06,
//     longitudeDelta: 0.06,
//   });
//   const [savedAddress, setSavedAddress] = useState("");
//     const [center, setCenter] = useState({ lat: 37.3541079, lng: -121.9552356 });
  
//     const handleAddressSelection = (data, details) => {
//       const selectedAddress = details.formatted_address;
//       const lat = details.geometry.location.lat;
//       const lng = details.geometry.location.lng;
  
//       setSavedAddress(selectedAddress);
//       setCenter({ lat, lng });
//     };

//   const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with your API key

//   const isFormComplete = !!location;

//   // Fetch suggestions from Google Places API
//   const handleSearch = async (text) => {
//     setSearchText(text);

//     if (text.trim().length > 2) {
//       try {
//         const response = await axios.get(
//           `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
//           {
//             params: {
//               input: text,
//               key: GOOGLE_PLACES_API_KEY,
//               types: "geocode",
//             },
//           }
//         );
//         setSuggestions(response.data.predictions);
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionPress = async (placeId) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/details/json`,
//         {
//           params: {
//             place_id: placeId,
//             key: GOOGLE_PLACES_API_KEY,
//           },
//         }
//       );

//       const { lat, lng } = response.data.result.geometry.location;
//       const address = response.data.result.formatted_address;

//       setLocation({ latitude: lat, longitude: lng });
//       setSearchText(address);

//       setRegion({
//         latitude: lat,
//         longitude: lng,
//         latitudeDelta: 0.06,
//         longitudeDelta: 0.06,
//       });

//       setSuggestions([]);
//       Keyboard.dismiss();
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

//   const handleContinue = () => {
//     if (location) {
//       navigation.navigate("EnableLocationScreen", { location });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="red" />
//       </TouchableOpacity>

//       {/* Progress Bar */}
//       <ProgressBar startProgress={80} endProgress={90} />

//       {/* Title & Subtitle */}
//       <Text style={styles.title}>Add your location</Text>
//       <Text style={styles.subtitle}>
//         Discover matches within your preferred distance.
//       </Text>

//       {/* Trial Version Notice */}
//       <View style={styles.trialBox}>
//         <Text style={styles.trialHeading}>TRIAL VERSION</Text>
//         <Text style={styles.trialBody}>
//           For the testing phase, the location function is only available{" "}
//           <Text style={styles.link}>here</Text> and the{" "}
//           <Text style={styles.link}>map setting</Text> in your profile.
//         </Text>
//       </View>

//       {/* Search Bar */}
//       {/* <View style={styles.searchRow}>
//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search your location..."
//             value={searchText}
//             onChangeText={handleSearch}
//           />
//         </View>
//         <TouchableOpacity style={styles.searchIconWrapper} onPress={() => Keyboard.dismiss()}>
//           <Ionicons name="search" size={24} color="#888" />
//         </TouchableOpacity>
//       </View> */}

//       {/* Suggestions */}
//       {/* {suggestions.length > 0 && (
//         <FlatList
//           data={suggestions}
//           keyExtractor={(item) => item.place_id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.suggestionItem}
//               onPress={() => handleSuggestionPress(item.place_id)}
//             >
//               <Text style={styles.suggestionText}>{item.description}</Text>
//             </TouchableOpacity>
//           )}
//           style={styles.suggestionsList}
//         />
//       )} */}
      
//       <GooglePlacesAutocomplete
//         placeholder="Search for a location"
//         fetchDetails={true}  // This enables fetching more detailed location data
//         onPress={handleAddressSelection}
//         query={{
//           key: GOOGLE_API_KEY,
//           language: 'en',  // Language of the search results
//         }}
//         styles={{
//           textInput: {
//             height: 50,
//             borderColor: "#ddd",
//             borderWidth: 1,
//             borderRadius: 5,
//             paddingHorizontal: 10,
//             marginBottom: 15,
//           },
//         }}
//       />
//       <MapView
//         style={styles.mapContainer}
//         initialRegion={{
//           latitude: center.lat,
//           longitude: center.lng,
//           latitudeDelta: 0.02,
//           longitudeDelta: 0.02,
//         }}
//       >
//         <Marker coordinate={{ latitude: center.lat, longitude: center.lng }} />
//       </MapView>
//       {/* Map */}
//       <View style={styles.mapContainer}>
//         <MapView
//           style={styles.map}
//           region={region}
//           onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//         >
//           {location && (
//             <Marker
//               coordinate={location}
//               title="Selected Location"
//               description={searchText || "Location"}
//               pinColor="red"
//             />
//           )}
//         </MapView>
//       </View>

//       {/* Continue Button */}
//       <Pressable
//         style={[
//           styles.continueButton,
//           { backgroundColor: isFormComplete ? "#E4423F" : "#ccc" },
//         ]}
//         onPress={handleContinue}
//         disabled={!isFormComplete}
//       >
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     justifyContent: "flex-start",
//     alignItems: "stretch",
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   backButton: {
//     alignSelf: "flex-start",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 20,
//     padding: 8,
//     marginBottom: 20,
//     marginTop: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "gray",
//     marginBottom: 20,
//   },
//   trialBox: {
//     marginBottom: 20,
//   },
//   trialHeading: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//     textTransform: "uppercase",
//   },
//   trialBody: {
//     fontSize: 14,
//     color: "#000",
//     lineHeight: 20,
//   },
//   link: {
//     fontWeight: "bold",
//     color: "#000",
//     textDecorationLine: "underline",
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   searchWrapper: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     borderRadius: 25,
//     paddingHorizontal: 15,
//   },
//   searchInput: {
//     height: 48,
//     fontSize: 16,
//     color: "#000",
//   },
//   suggestionsList: {
//     maxHeight: 100,
//     backgroundColor: "#FFF",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     marginBottom: 10,
//   },
//   suggestionItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#EEE",
//   },
//   suggestionText: {
//     fontSize: 16,
//     color: "#000",
//   },
//   mapContainer: {
//     width: "100%",
//     height: 250,
//     borderRadius: 10,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   map: {
//     flex: 1,
//   },
//   continueButton: {
//     height: 60,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   continueButtonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
