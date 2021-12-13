import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';

const LoginScreen = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fffafa',
      }}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../assets/icon.svg')}
      />
    </View>
  );
};

export default LoginScreen;
