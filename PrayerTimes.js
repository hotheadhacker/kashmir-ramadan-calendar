// PrayerTimes.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// import moment from 'moment';

export default function PrayerTimes() {
  const [saharTime, setSaharTime] = useState(null);
  const [iftarTime, setIftarTime] = useState(null);

  useEffect(() => {
    // Fetch prayer times from API
    const fetchPrayerTimes = async () => {
      try {
        // Replace this with your API call to get prayer times
        const response = await fetch('https://raw.githubusercontent.com/hotheadhacker/json-data/main/ramdan-2024.json');
        const data = await response.json();

        // Assuming the API returns prayer times in an object like { sahar: '5:00 AM', iftar: '6:00 PM' }
        setSaharTime(data.data["12-03-2024"].sehri);
        setIftarTime(data.data["12-03-2024"].iftar);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <ImageBackground source={require('./src/assets/img/mosque.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>End of Dawn (Sahar):</Text>
        <Text style={styles.time}>{saharTime} AM</Text>
        <Text style={styles.heading}>Breaking of Fast (Iftar):</Text>
        <Text style={styles.time}>{iftarTime} PM</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.5)', // Slightly darkened background color with transparency
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Dark gray text color
    marginBottom: 5,
  },
  time: {
    fontSize: 20,
    color: 'yellow', // Teal text color
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
});
