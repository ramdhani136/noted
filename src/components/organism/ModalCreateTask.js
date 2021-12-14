import React from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalCreateTask = ({isActive, setActive}) => {
  return (
    <>
      <StatusBar hidden={true} />
      <Modal
        statusBarTranslucent
        animationType="fade"
        visible={isActive}
        onRequestClose={() => {
          setActive(!isActive);
        }}
        style={{display: 'flex'}}
        transparent>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <AntDesign name="close" style={{fontSize: 20, marginLeft: 15}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="compress"
              style={{fontSize: 20, marginRight: 15, color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: 'black',
            opacity: 0.2,
          }}></View>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: 'white',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            position: 'absolute',
            bottom: 0,
            padding: 5,
            paddingBottom: 10,
          }}>
          <TextInput
            placeholder="What would you like to do?"
            style={{marginLeft: 10, fontSize: 16}}
            autoFocus={true}
          />
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={{marginLeft: 13}}>
              <Ionicons name="calendar" style={{fontSize: 17, color: 'gray'}} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <Ionicons name="send" style={{fontSize: 20}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalCreateTask;
