import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CheckListScreen,
  CreateSchedule,
  HomeScreen,
  LoginScreen,
} from '../../screens';
const Drawer = createDrawerNavigator();
const DrawerMenu = () => {
  const MainStackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateSchedule"
          component={CreateSchedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckListScreen"
          component={CheckListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
