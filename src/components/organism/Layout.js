import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {BottomMenu} from './';
import {AsyncStorage} from 'react-native';

const Layout = ({Child, doc, btnActive}) => {
  return (
    <>
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
