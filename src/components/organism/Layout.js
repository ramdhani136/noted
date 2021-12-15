import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {BottomMenu} from './';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerMenu} from './';

const Layout = ({Child, doc, btnActive}) => {
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
