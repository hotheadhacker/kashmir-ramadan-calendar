import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { BlurView } from '@react-native-community/blur';


export default function PrayerTimes() {
  const [saharTime, setSaharTime] = useState(null);
  const [currDate, setCurrDate] = useState(null);
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
    const today = getFormattedDate();
    setCurrDate(today);
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/hotheadhacker/json-data/main/ramdan-2024.json');
        const data = await response.json();
        setSaharTime(data.data[today].sehri);
        setIftarTime(data.data[today].iftar);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };
    fetchPrayerTimes();
    return () => {
      if (soundObject !== null) {
        soundObject.release();
      }
    };
  }, []);

  useEffect(() => {
    const playSoundOnIftar = async () => {
      if (playSound && iftarTime !== null || true) {
        const now = new Date();
        const iftarDateTime = new Date(now);
        const [hour, minute] = iftarTime.split(':').map(Number);
        if (hour >= 12) {
          iftarDateTime.setHours(hour, minute, 0, 0);
          if (now.getTime() >= iftarDateTime.getTime()) {
            const sound = new Sound('iftar.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.error('Error loading sound:', error);
                return;
              }
              sound.play((success) => {
                if (success) {
                  console.log('Sound played successfully');
                  setPlaySound(false);
                } else {
                  console.error('Sound playback failed');
                }
              });
              setSoundObject(sound);
            });
          }
        }
      }
    };
    playSoundOnIftar();
  }, [playSound, iftarTime]);

  return (
    <ImageBackground source={require('./src/assets/img/mosque.png')} style={styles.backgroundImage}>
       <View style={styles.container}>
        <Text style={styles.date}>Today's Date: {currDate}</Text>
        <BlurView style={styles.blurContainer} blurType="dark" blurAmount={10}>
            <View style={styles.card}>
            <Text style={styles.heading}>Sahar:</Text>
            <Text style={styles.digitalTime}>{saharTime} AM</Text>
            <Text style={styles.heading}>Iftar:</Text>
            <Text style={styles.digitalTime}>{iftarTime} PM</Text>
            {/* <TouchableOpacity style={styles.button} onPress={() => setPlaySound(!playSound)}>
                <Text style={styles.buttonText}>{playSound ? 'Disable Sound' : 'Enable Sound'}</Text>
            </TouchableOpacity> */}
            </View>
        </BlurView>
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
  button: {
    backgroundColor: 'teal',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    justifyContent: 'center',
  },
  blurContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    padding: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
  },
  digitalTime: {
    fontSize: 36,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'Digital-7', // Example custom font for digital clock appearance
  },
    date: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
});
