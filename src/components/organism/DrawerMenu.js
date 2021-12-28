import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CheckListScreen,
  CreateSchedule,
  HomeScreen,
  LoginScreen,
  NotesScreen,
  ProfileScreen,
} from '../../screens';
import {DrawerContent} from '.';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  const MainStackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
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
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotesScreen"
          component={NotesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  const LoginStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
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
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotesScreen"
          component={NotesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  const Stack = createNativeStackNavigator();
  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name="LoginScreen"
  //       component={LoginScreen}
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //     <Stack.Screen
  //       name="HomeScreen"
  //       component={HomeScreen}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="CreateSchedule"
  //       component={CreateSchedule}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="CheckListScreen"
  //       component={CheckListScreen}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="ProfileScreen"
  //       component={ProfileScreen}
  //       options={{headerShown: false}}
  //     />
  //     <Stack.Screen
  //       name="Drawernya"
  //       component={Drawernya}
  //       options={{headerShown: false}}
  //     />
  //   </Stack.Navigator>
  // );
  return (
    <Drawer.Navigator
      initialRouteName="login"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen
        name="login"
        component={LoginStack}
        options={{swipeEnabled: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
