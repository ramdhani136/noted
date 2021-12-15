import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerMenu} from '../components/organism';

const Router = () => {
  return (
    <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer>
  );
};

export default Router;
