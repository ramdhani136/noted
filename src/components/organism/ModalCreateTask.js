import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import KeyboardStickyView from 'rn-keyboard-sticky-view';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '../../config';

const ModalCreateTask = ({
  isActive,
  setActive,
  setDate,
  getSchedules,
  date,
}) => {
  const navigation = useNavigation();
  const defaultValue = {
    date: date,
    // id_user: null,
    is_alarm: '0',
    status: '1',
    time: moment().format('HH:mm:ss'),
    time_alarm: moment().format('HH:mm:ss'),
    name: null,
  };
  const [value, setValue] = useState(defaultValue);
  const [userId, setUserId] = useState('');

  const onClose = () => {
    setActive(!isActive);
    setValue({...value, name: ''});
  };

  const onSubmit = () => {
    if (value.name === '' || value.name === undefined || value.name === null) {
      Alert.alert('Error', 'Check your data!');
    } else {
      axios
        .post(`${API_URL}schedule`, value)
        .then(res => {
          setActive(!isActive);
          setValue({...value, name: ''});
          getSchedules();
        })
        .catch(err => JSON.stringify(err));
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const valueJson = JSON.parse(data);
      setUserId(valueJson.id);
      setValue({...value, id_user: valueJson.id});
    });
  }, []);

  useEffect(() => {
    // AsyncStorage.getItem('user').then(data => {
    //   const valueJson = JSON.parse(data);
    //   setValue({...value, id_user: valueJson.id});
    // });
    setValue({...value, date: date});
  }, [date]);

  return (
    <>
      <StatusBar hidden={true} />
      <Modal
        statusBarTranslucent
        animationType="fade"
        visible={isActive}
        onRequestClose={onClose}
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
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" style={{fontSize: 20, marginLeft: 15}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateSchedule')}>
            <FontAwesome
              name="compress"
              style={{fontSize: 20, marginRight: 15, color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onClose}
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: 'black',
            opacity: 0.2,
          }}></TouchableOpacity>
        <KeyboardStickyView>
          <View
            style={{
              width: '100%',
              height: 90,
              backgroundColor: 'white',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              position: 'absolute',
              bottom: 0,
              padding: 5,
              paddingBottom: 10,
            }}>
            <TextInput
              onChangeText={text => setValue({...value, name: text})}
              placeholder="What would you like to do?"
              style={{
                marginLeft: 10,
                fontSize: 15,
                marginBottom: 5,
              }}
              placeholderTextColor="#ddd"
            />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{marginLeft: 13}}
                  onPress={() => setDate(true)}>
                  <Ionicons
                    name="calendar"
                    style={{fontSize: 17, color: 'gray'}}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 10, fontSize: 15, color: '#ddd'}}>
                  {moment(date).format('DD MMMM YYYY')}
                </Text>
              </View>
              <TouchableOpacity style={{marginRight: 10}} onPress={onSubmit}>
                <Ionicons
                  name="send"
                  style={{fontSize: 20, color: '#ff4c4c'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardStickyView>
      </Modal>
    </>
  );
};

export default ModalCreateTask;
