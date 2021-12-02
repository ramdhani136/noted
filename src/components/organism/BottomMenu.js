import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomMenu = () => {
  return (
    <View
      style={{
        height: 55,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#222D31',
        // backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 5,
        borderTopWidth: 1,
      }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons
          name="home-variant"
          style={{fontSize: 16, color: '#ccc'}}
        />
        <Text style={{color: '#ccc'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name="sticky-note" style={{fontSize: 16, color: '#ccc'}} />
        <Text style={{color: '#ccc'}}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons name="cases" style={{fontSize: 16, color: '#999'}} />
        <Text style={{color: '#999'}}>Schedules</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name="user" style={{fontSize: 16, color: '#ccc'}} />
        <Text style={{color: '#ccc'}}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;
