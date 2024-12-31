// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   Platform,
//   StatusBar,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Pressable,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import ProgressBar from "../src/Assets/Components/ProgressBar";
// import * as ImagePicker from "expo-image-picker";
// import * as DocumentPicker from "expo-document-picker";
// import { Video } from "expo-av";

// export default function AddMediaScreen({ navigation }) {
//   const [video, setVideo] = useState(null);
//   const [photos, setPhotos] = useState([null, null, null]);

//   // Handle video upload
//   const handleVideoUpload = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "video/*",
//     });

//     if (result.type === "success") {
//       setVideo(result.uri);
//     }
//   };

//   // Handle photo upload
//   const handlePhotoUpload = async (index) => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const updatedPhotos = [...photos];
//       updatedPhotos[index] = result.assets[0].uri;
//       setPhotos(updatedPhotos);
//     }
//   };

//   // Remove photo
//   const handleRemovePhoto = (index) => {
//     const updatedPhotos = [...photos];
//     updatedPhotos[index] = null;
//     setPhotos(updatedPhotos);
//   };

//   // Remove video
//   const handleRemoveVideo = () => {
//     setVideo(null);
//   };

//   const isFormComplete = video && photos.some((photo) => photo !== null);

//   const handleContinue = () => {
//     if (isFormComplete) {
//       navigation.navigate("LocationScreen", { video, photos });
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="red" />
//       </TouchableOpacity>

//       {/* Progress Bar */}
//       <ProgressBar startProgress={70} endProgress={80} />

//       {/* Title & Subtitle */}
//       <Text style={styles.title}>Add your video & photos</Text>
//       <Text style={styles.subtitle}>Please upload a short video introducing yourself.</Text>

//       {/* Trial Notice */}
//       <View style={styles.trialVersion}>
//         <Text style={styles.trialHeading}>TRIAL VERSION</Text>
//         <Text style={styles.trialBody}>
//           For the testing phase, please keep your video <Text style={styles.bold}>short</Text>.
//           {"\n"}Example: “Hi! I’m Hannah and I enjoy outdoor activities.”
//           {"\n\n"}We are also unable to crop your photos for the testing phase, so please use{" "}
//           <Text style={styles.bold}>centered photos</Text>.
//         </Text>
//       </View>

//       {/* Video Section */}
//       <View style={styles.mediaContainer}>
//         {video ? (
//           <View style={styles.uploadedVideoContainer}>
//             <Video
//               source={{ uri: video }}
//               style={styles.video}
//               useNativeControls
//               resizeMode="contain"
//             />
//             <TouchableOpacity onPress={handleRemoveVideo} style={styles.removeButton}>
//               <Ionicons name="trash-outline" size={20} color="white" />
//               <Text style={styles.removeButtonText}>Remove Video</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity onPress={handleVideoUpload} style={styles.uploadVideoButton}>
//             <Ionicons name="cloud-upload-outline" size={20} color="#E4423F" />
//             <Text style={styles.uploadVideoText}>Upload Video File</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Photos Section */}
//       <View style={styles.photoContainer}>
//         {photos.map((photo, index) => (
//           <View key={index} style={styles.photoWrapper}>
//             {photo ? (
//               <View style={styles.photo}>
//                 <Image source={{ uri: photo }} style={styles.image} />
//                 <TouchableOpacity
//                   onPress={() => handleRemovePhoto(index)}
//                   style={styles.removePhotoButton}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="white" />
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <Pressable
//                 style={styles.photoPlaceholder}
//                 onPress={() => handlePhotoUpload(index)}
//               >
//                 <Ionicons name="add" size={24} color="red" />
//               </Pressable>
//             )}
//           </View>
//         ))}
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

// // STYLES
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
//   trialVersion: {
//     marginBottom: 20,
//   },
//   trialHeading: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//     textTransform: "uppercase",
//   },
//   trialBody: {
//     fontSize: 14,
//     color: "#000",
//     lineHeight: 20,
//   },
//   bold: {
//     fontWeight: "bold",
//   },
//   mediaContainer: {
//     marginBottom: 20,
//   },
//   uploadVideoButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: "#E4423F",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   uploadVideoText: {
//     color: "#E4423F",
//     fontWeight: "bold",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   uploadedVideoContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   video: {
//     width: "100%",
//     height: 200,
//     marginBottom: 10,
//   },
//   removeButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E4423F",
//     padding: 10,
//     borderRadius: 25,
//   },
//   removeButtonText: {
//     color: "white",
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   photoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 30,
//   },
//   photoWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   photoPlaceholder: {
//     width: "100%",
//     aspectRatio: 1,
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   photo: {
//     width: "100%",
//     aspectRatio: 1,
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//   },
//   removePhotoButton: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "#E4423F",
//     padding: 5,
//     borderRadius: 15,
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
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../src/Assets/Components/ProgressBar";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

export default function AddMediaScreen({ navigation }) {
  const [video, setVideo] = useState(null);
  const [photos, setPhotos] = useState([null, null, null]);

  // Handle video upload
  const handleVideoUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0].uri) {
        setVideo(result.assets[0].uri);
      } else {
        console.log("Video picker canceled or no URI returned.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("There was an issue uploading the video. Please try again.");
    }
  };

  // Remove video
  const handleRemoveVideo = () => {
    setVideo(null);
  };

  // Handle photo upload
  const handlePhotoUpload = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const updatedPhotos = [...photos];
      updatedPhotos[index] = result.assets[0].uri;
      setPhotos(updatedPhotos);
    }
  };

  // Remove photo
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index] = null;
    setPhotos(updatedPhotos);
  };

  const isFormComplete = video && photos.some((photo) => photo !== null);

  const handleContinue = () => {
    if (isFormComplete) {
      navigation.navigate("LocationScreen", { video, photos });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="red" />
      </TouchableOpacity>

      {/* Progress Bar */}
      <ProgressBar startProgress={70} endProgress={80} />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Add your video & photos</Text>
      <Text style={styles.subtitle}>Please upload a short video introducing yourself.</Text>

      {/* Trial Notice */}
      <View style={styles.trialVersion}>
        <Text style={styles.trialHeading}>TRIAL VERSION</Text>
        <Text style={styles.trialBody}>
          For the testing phase, please keep your video <Text style={styles.bold}>short</Text>.
          {"\n"}Example: “Hi! I’m Hannah and I enjoy outdoor activities.”
          {"\n\n"}We are also unable to crop your photos for the testing phase, so please use{" "}
          <Text style={styles.bold}>centered photos</Text>.
        </Text>
      </View>

      {/* Video Section */}
      <View style={styles.mediaContainer}>
        {video ? (
          <View style={styles.uploadedVideoContainer}>
            <Video
              source={{ uri: video }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
            <TouchableOpacity onPress={handleRemoveVideo} style={styles.removeButton}>
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text style={styles.removeButtonText}>Remove Video</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleVideoUpload} style={styles.uploadVideoButton}>
            <Ionicons name="cloud-upload-outline" size={20} color="#E4423F" />
            <Text style={styles.uploadVideoText}>Upload Video File</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Photos Section */}
      <View style={styles.photoContainer}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoWrapper}>
            {photo ? (
              <View style={styles.photo}>
                <Image source={{ uri: photo }} style={styles.image} />
                <TouchableOpacity
                  onPress={() => handleRemovePhoto(index)}
                  style={styles.removePhotoButton}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <Pressable
                style={styles.photoPlaceholder}
                onPress={() => handlePhotoUpload(index)}
              >
                <Ionicons name="add" size={24} color="red" />
              </Pressable>
            )}
          </View>
        ))}
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

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  trialVersion: {
    marginBottom: 20,
  },
  trialHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  trialBody: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  mediaContainer: {
    marginBottom: 20,
  },
  uploadVideoButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#E4423F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  uploadVideoText: {
    color: "#E4423F",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  uploadedVideoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4423F",
    padding: 10,
    borderRadius: 25,
  },
  removeButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  photoWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  photoPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removePhotoButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#E4423F",
    padding: 5,
    borderRadius: 15,
  },
  continueButton: {
    height: 60,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
