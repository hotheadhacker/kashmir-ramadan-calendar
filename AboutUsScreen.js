import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function AboutUsScreen() {
  const salmanUrl = 'https://isalman.dev';
  const githubUrl = 'https://github.com/hotheadhacker/kashmir-ramadan-calendar';

  const handleSalmanLinkPress = () => {
    Linking.openURL(salmanUrl);
  };
  const handleGithubLinkPress = () => {
    Linking.openURL(githubUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        This app has been developed by{' '}
        <TouchableOpacity onPress={handleSalmanLinkPress}>
          <Text style={styles.link}>Salman Qureshi</Text>
        </TouchableOpacity>{' '}
        and is an open-source app.{'\n\n'}
        It was developed and made live in less than 3 hours, currently featuring the Ramadan calendar only for central Kashmir.{'\n\n'}
        The app is available on GitHub, and you can find all the source code at:
      </Text>
      <TouchableOpacity onPress={handleGithubLinkPress}>
        <Text style={styles.link}>{githubUrl}</Text>
      </TouchableOpacity>
      <Text style={styles.note}>
        * Ignore all bugs and poorly designed UI as this was developed in a short time.{'\n'}
        This app will be fully implemented for the 2025 Ramadan year, insha Allah.{'\n'}
        Until then, it can still be used to check Iftar and Sahar time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F0E4', // Creamy background color
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  note: {
    fontSize: 14,
    color: '#6E6E6E',
    textAlign: 'center',
  },
});
