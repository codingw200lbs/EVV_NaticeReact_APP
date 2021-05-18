import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import ClockinScreen from './app/screens/ClockinScreen';

import ClockoutScreen from './app/screens/ClockoutScreen';
import NotesScreen from './app/screens/NotesScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ReviewScreen from './app/screens/ReviewScreen';
import LoggedinScreen from './app/screens/LoggedinScreen';





const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="Logged In" component={LoggedinScreen} />
        <Stack.Screen name="Clock In" component={ClockinScreen} />
        <Stack.Screen name="Clock Out" component={ClockoutScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
