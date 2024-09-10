import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountSetup2Create from "./AccountSetup/AccountSetup2Create";
import AccountSetup3Create from "./AccountSetup/AccountSetup3Create";
import AccountSetup4Create from "./AccountSetup/AccountSetup4Create";
import * as Font from "expo-font";
import LandingPage from "./Intro/LandingPage";
import LandingPage2 from "./Intro/LandingPage2";
import LandingPage3 from "./Intro/LandingPage3";
import LandingPage4 from "./Intro/LandingPage4";
import Start from "./Intro/Start";
import TrialAccount from "./Intro/TrialAccount";
import Location from "./Profile/Location";
import Location2 from "./Profile/Location2";
import AccountDetails from "./AccountDetails/AccountDetails";
import AccountDetails2 from "./AccountDetails/AccountDetails2";
import AccountDetails3 from "./AccountDetails/AccountDetails3";
import AccountDetails4 from "./AccountDetails/AccountDetails4";
import AccountDetails5 from "./AccountDetails/AccountDetails5";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          'Lexend-Regular': require('./assets/fonts/Lexend-Regular.ttf'),
        });
        setFontLoaded(true); 
      } catch (error) {
        console.error("Error loading font", error);
      }
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AccountDetails5' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='LandingPage' component={LandingPage} />
        <Stack.Screen name='LandingPage2' component={LandingPage2} />
        <Stack.Screen name='LandingPage3' component={LandingPage3} />
        <Stack.Screen name='LandingPage4' component={LandingPage4} />
        <Stack.Screen name='TrialAccount' component={TrialAccount} />
        <Stack.Screen name='AccountSetup2Create' component={AccountSetup2Create} />
        <Stack.Screen name='AccountSetup3Create' component={AccountSetup3Create} />
        <Stack.Screen name='AccountSetup4Create' component={AccountSetup4Create} />
        <Stack.Screen name='Location' component={Location} />
        <Stack.Screen name='Location2' component={Location2} />
        <Stack.Screen name='AccountDetails' component={AccountDetails} />
        <Stack.Screen name='AccountDetails2' component={AccountDetails2} />
        <Stack.Screen name='AccountDetails3' component={AccountDetails3} />
        <Stack.Screen name='AccountDetails4' component={AccountDetails4} />
        <Stack.Screen name='AccountDetails5' component={AccountDetails5} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
