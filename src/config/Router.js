import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   CheckListScreen,
//   CreateSchedule,
//   HomeScreen,
//   LoginScreen,
// } from '../screens';
import {DrawerMenu} from '../components/organism';

const Router = () => {
  // const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer>
  );
};

export default Router;
