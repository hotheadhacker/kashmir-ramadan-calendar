// AboutUsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Us Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F0E4', // Creamy background color
  },
  text: {
    fontSize: 20,
    color: '#2E2E2E', // Dark gray text color
  },
});
