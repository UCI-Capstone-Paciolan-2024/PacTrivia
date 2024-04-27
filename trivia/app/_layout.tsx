import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './index';
import { Stack } from 'expo-router';



export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  return (

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="trivia" options={{headerShown: false}} />
      </Stack>
  );
}
