import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {BottomMenu} from './';

const Layout = ({Child}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
        }}>
        <View style={{flex: 1}}>
          <Child />
        </View>
        <BottomMenu></BottomMenu>
      </View>
    </>
  );
};

export default Layout;
