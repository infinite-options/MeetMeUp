import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const StartPage = () => {
  const navigation = useNavigation();

  const handleNavigateStart = () => {
    navigation.navigate('LandingPage'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateStart} style={styles.button}>
        <Text style={styles.mainText}>meet me up</Text>
        <Text style={styles.subText}>
          optimized for mobile screens. click to begin
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4423F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    alignItems: 'center',
  },
  mainText: {
    fontFamily: 'Inria Sans',
    fontSize: 48, 
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'none',
  },
  subText: {
    fontFamily: 'Inria Sans',
    fontSize: 16, 
    color: '#FFFFFF',
    marginTop: 8,
  },
});

export default StartPage;
