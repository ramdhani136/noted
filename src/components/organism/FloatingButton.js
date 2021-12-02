import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

export class FloatingButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          width: 55,
          height: 55,
          borderWidth: 1,
          backgroundColor: 'red',
          position: 'absolute',
          bottom: 15,
          right: 15,
          borderRadius: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'red',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
          opacity: 0.9,
        }}>
        <Fontisto name="plus-a" style={{fontSize: 32, color: '#fff'}} />
      </TouchableOpacity>
    );
  }
}

export default FloatingButton;
