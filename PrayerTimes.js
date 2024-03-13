import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function PrayerTimes() {
  const [saharTime, setSaharTime] = useState(null);
  const [iftarTime, setIftarTime] = useState(null);
  const [playSound, setPlaySound] = useState(false);
  const [soundObject, setSoundObject] = useState(null);


  function getFormattedDate() {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
}

  useEffect(() => {
    // Fetch prayer times from API
    const today = getFormattedDate();
    // console.log(today);
    const fetchPrayerTimes = async () => {
      try {
        // Replace this with your API call to get prayer times
        const response = await fetch('https://raw.githubusercontent.com/hotheadhacker/json-data/main/ramdan-2024.json');
        const data = await response.json();

        // Assuming the API returns prayer times in an object like { sahar: '5:00 AM', iftar: '6:00 PM' }
        setSaharTime(data.data[today].sehri);
        setIftarTime(data.data[today].iftar);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();

    return () => {
      // Clean up sound object when component unmounts
      if (soundObject !== null) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  // Play the sound when the iftar time is reached
  useEffect(() => {
    const playSoundOnIftar = async () => {
      if (playSound && iftarTime !== null) {
        console.log('Playing sound on iftar');
        const now = new Date();
        const iftarDateTime = new Date(now);
        const [hour, minute] = iftarTime.split(':').map(Number);

        // Only play sound if it's PM
        if (hour >= 12) {
          iftarDateTime.setHours(hour, minute, 0, 0);
          console.log(iftarDateTime.getTime());

          if (now.getTime() >= iftarDateTime.getTime()) {
            const { sound } = await Audio.Sound.createAsync(
              require('./src/assets/audio/iftar.mp3')
            );
            await sound.playAsync();
            setPlaySound(false); // Disable sound after playing once
            setSoundObject(sound);
          }
        }
      }
    };

    playSoundOnIftar();
  }, [playSound, iftarTime]);

  return (
    <ImageBackground source={require('./src/assets/img/mosque.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>End of Dawn (Sahar):</Text>
        <Text style={styles.time}>{saharTime} AM</Text>
        <Text style={styles.heading}>Breaking of Fast (Iftar):</Text>
        <Text style={styles.time}>{iftarTime} PM</Text>
        <Button
          title={playSound ? 'Disable Sound' : 'Enable Sound'}
          onPress={() => setPlaySound(!playSound)}
        />
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
