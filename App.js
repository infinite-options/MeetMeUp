import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSetup2Create from './AccountSetup/AccountSetup2Create';
import AccountSetup3Create from './AccountSetup/AccountSetup3Create';
import AccountSetup4Create from './AccountSetup/AccountSetup4Create';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccountSetup2Create">
        <Stack.Screen name="AccountSetup2Create" component={AccountSetup2Create} />
        <Stack.Screen name="AccountSetup3Create" component={AccountSetup3Create} />
        <Stack.Screen name="AccountSetup4Create" component={AccountSetup4Create} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
