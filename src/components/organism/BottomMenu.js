import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const BottomMenu = ({btnActive}) => {
  const navigation = useNavigation();
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
        onPress={() => navigation.replace('CheckListScreen')}
        style={{
          width: 45,
          height: 45,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <MaterialCommunityIcons
          name="home-variant"
          style={{fontSize: 16, color: '#ccc'}}
        /> */}
        <FontAwesome
          name="check-square-o"
          style={{fontSize: 23, color: btnActive === 'task' ? '#ccc' : '#888'}}
        />
        {/* <Text style={{color: '#ccc'}}>Check</Text> */}
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name="sticky-note" style={{fontSize: 16, color: '#ccc'}} />
        <Text style={{color: '#ccc'}}>Notes</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => navigation.replace('HomeScreen')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 45,
          height: 45,
        }}>
        <MaterialIcons
          name="date-range"
          style={{
            fontSize: 23,
            color: btnActive === 'schedule' ? '#ccc' : '#888',
          }}
        />
        {/* <Text style={{color: '#999'}}>Schedules</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 45,
          height: 45,
        }}>
        <FontAwesome
          name="user"
          style={{
            fontSize: 23,
            color: btnActive === 'profile' ? '#ccc' : '#888',
          }}
        />
        {/* <Text style={{color: '#ccc'}}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;
