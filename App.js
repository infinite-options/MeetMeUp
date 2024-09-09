import React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './Intro/LandingPage'; 
import LandingPage2 from './Intro/LandingPage2';
import LandingPage3 from './Intro/LandingPage3'; 
import LandingPage4 from './Intro/LandingPage4';   
import Start from './Intro/Start';
import TrialAccount from './Intro/TrialAccount';
import Location from './Profile/Location';
import Location2 from './Profile/Location2';
import AccountDetails from './AccountDetails/AccountDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LandingPage2" component={LandingPage2} />
        <Stack.Screen name="LandingPage3" component={LandingPage3} />
        <Stack.Screen name="LandingPage4" component={LandingPage4} />
        <Stack.Screen name="TrialAccount" component={TrialAccount} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Location2" component={Location2} />
        <Stack.Screen name="AccountDetails" component={AccountDetails} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
