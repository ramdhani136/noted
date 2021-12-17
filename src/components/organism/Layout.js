import React, {useEffect, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {BottomMenu} from './';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Layout = ({Child, doc, btnActive}) => {
  const [isConnected, setConnected] = useState(true);

  // const unsubscribe = NetInfo.addEventListener(state => {
  //   // // console.log(state.isConnected);
  //   // setConnected(state.isConnected);
  // });

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });
  };

  useEffect(() => {
    checkNetwork();
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('isLogin').then(value => {
      if (!value) {
        navigation.replace('LoginScreen');
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
        {!isConnected && (
          <View
            style={{
              backgroundColor: 'red',
              width: '100%',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6,
            }}>
            <Text style={{color: 'white'}}>No Internet Connection</Text>
          </View>
        )}
        {/* {console.log(isConnected)} */}
        <View style={{flex: 1}}>
          <Child doc={doc} />
        </View>
        <BottomMenu btnActive={btnActive}></BottomMenu>
      </View>
    </>
  );
};

export default Layout;
