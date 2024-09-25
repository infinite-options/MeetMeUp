import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountSetup2Create from "./AccountSetup/AccountSetup2Create";
import AccountSetup3Create from "./AccountSetup/AccountSetup3Create";
import AccountSetup4Create from "./AccountSetup/AccountSetup4Create";
import AccountSetup7Summary from "./AccountSetup/AccountSetup7Summary";

import * as Font from "expo-font";
// import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from "./Intro/LandingPage";
import LandingPage2 from "./Intro/LandingPage2";
import LandingPage3 from "./Intro/LandingPage3";
import LandingPage4 from "./Intro/LandingPage4";
import Start from "./Intro/Start";
import TrialAccount from "./Intro/TrialAccount";
import Location from "./Profile/Location";
import Location2 from "./Profile/Location2";
import AccountDetails from "./AccountDetails/AccountDetails";
import AccountSetup1Login from './AccountSetup/AccountSetup1Login'; 

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/*
      <Stack.Navigator initialRouteName='AccountSetup2Create'>
        <Stack.Screen name='AccountSetup2Create' component={AccountSetup2Create} />
        <Stack.Screen name='AccountSetup3Create' component={AccountSetup3Create} />
        <Stack.Screen name='AccountSetup4Create' component={AccountSetup4Create} />
      </Stack.Navigator>
  */}
      <Stack.Navigator initialRouteName='Start' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='LandingPage' component={LandingPage} />
        <Stack.Screen name='LandingPage2' component={LandingPage2} />
        <Stack.Screen name='LandingPage3' component={LandingPage3} />
        <Stack.Screen name='LandingPage4' component={LandingPage4} />
        <Stack.Screen name='TrialAccount' component={TrialAccount} />
        <Stack.Screen name='AccountSetup1Login' component={AccountSetup1Login}/>
        <Stack.Screen name='AccountSetup2Create' component={AccountSetup2Create} />
        <Stack.Screen name='AccountSetup3Create' component={AccountSetup3Create} />
        <Stack.Screen name='AccountSetup4Create' component={AccountSetup4Create} />
        <Stack.Screen name='Location' component={Location} />
        <Stack.Screen name='Location2' component={Location2} />
        <Stack.Screen name='AccountDetails' component={AccountDetails} />
        <Stack.Screen name='AccountSetup7Summary' component={AccountSetup7Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
