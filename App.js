import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PrayerTimes from './PrayerTimes';
import SettingsScreen from './SettingsScreen';
import AboutUsScreen from './AboutUsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="PrayerTimes">
        <Drawer.Screen name="PrayerTimes" component={PrayerTimes} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
