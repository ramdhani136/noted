import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {BottomMenu} from './';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Layout = ({Child, doc, btnActive}) => {
  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        // const valueJson = JSON.parse(value);
        // setUserId(valueJson.id);
        if (!value) {
          navigation.navigate('LoginScreen');
        }
      }
    });
  });
  return (
    <>
      <StatusBar hidden={true} />
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
        }}>
        <View style={{flex: 1}}>
          <Child doc={doc} />
        </View>
        <BottomMenu btnActive={btnActive}></BottomMenu>
      </View>
    </>
  );
};

export default Layout;
