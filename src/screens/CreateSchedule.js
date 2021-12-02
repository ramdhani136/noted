import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ViewCreateSchedule = () => {
  return (
    <View style={{backgroundColor: 'whitesmoke', flex: 1}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity>
          <AntDesign
            name="arrowleft"
            style={{marginLeft: 20, fontSize: 25, color: '#ff6d6d'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: '#555',
            marginLeft: 100,
          }}>
          New Task
        </Text>
      </View>
    </View>
  );
};

const CreateSchedule = () => {
  return (
    <>
      <Layout Child={ViewCreateSchedule} />
    </>
  );
};

export default CreateSchedule;
