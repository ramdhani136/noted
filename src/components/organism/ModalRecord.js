import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalRecord = ({isActive, setActive}) => {
  const [btnStatus, setBtnStatus] = useState({
    recPlay: true,
    recPause: false,
    recStop: false,
  });

  const onRecord = () => {
    setBtnStatus({
      ...btnStatus,
      recPlay: false,
      recPause: true,
      recStop: true,
    });
  };

  const onRecPause = () => {
    setBtnStatus({
      ...btnStatus,
      recPlay: true,
      recPause: false,
      recStop: true,
    });
  };

  const onRecStop = () => {
    setBtnStatus({
      ...btnStatus,
      recPlay: true,
      recPause: false,
      recStop: false,
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={isActive}
      onRequestClose={() => {
        setActive(!isActive);
        setBtnStatus({
          ...btnStatus,
          recPlay: true,
          recPause: false,
          recStop: false,
        });
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
        }}>
        <View style={{width: '100%', flex: 1}}>
          <View style={{width: '80%', marginHorizontal: '10%'}}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 60,
                fontSize: 26,
                color: 'black',
              }}>
              00:05:00
            </Text>
            {btnStatus.recPlay && (
              <TouchableOpacity
                onPress={onRecord}
                style={{
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  marginTop: 20,
                  borderRadius: 5,
                  backgroundColor: '#ff4747',
                  borderColor: '#e52d2d',
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="fiber-manual-record"
                  style={{color: 'white', marginRight: 5}}
                />
                <Text style={{color: 'white', fontWeight: '700'}}>RECORD</Text>
              </TouchableOpacity>
            )}
            {btnStatus.recPause && (
              <TouchableOpacity
                onPress={onRecPause}
                style={{
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  marginTop: 20,
                  borderRadius: 5,
                  backgroundColor: '#ff4747',
                  borderColor: '#e52d2d',
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="pause"
                  style={{color: 'white', marginRight: 5}}
                />
                <Text style={{color: 'white', fontWeight: '700'}}>PAUSE</Text>
              </TouchableOpacity>
            )}

            {btnStatus.recStop && (
              <TouchableOpacity
                onPress={onRecStop}
                style={{
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  marginTop: 15,
                  borderRadius: 5,
                  backgroundColor: '#ff4747',
                  borderColor: '#e52d2d',
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="stop"
                  style={{color: 'white', marginRight: 5, fontSize: 15}}
                />
                <Text style={{color: 'white', fontWeight: '700'}}>STOP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView
          style={{
            width: '100%',
            flex: 1,
            backgroundColor: '#fffafa',
            shadowColor: '#666',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
          }}>
          <View
            style={{
              width: '100%',
              height: 70,
              borderBottomWidth: 1,
              borderColor: '#eee',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{display: 'flex', justifyContent: 'center'}}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                REC-06122021-0001
              </Text>
              <Text style={{marginLeft: 15, color: '#bbb', fontSize: 12}}>
                00:06:00
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo style={{fontSize: 25, marginRight: 10}} name="cross" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 70,
              borderBottomWidth: 1,
              borderColor: '#eee',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{display: 'flex', justifyContent: 'center'}}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                REC-06122021-0002
              </Text>
              <Text style={{marginLeft: 15, color: '#bbb', fontSize: 12}}>
                00:01:24
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo style={{fontSize: 25, marginRight: 10}} name="cross" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalRecord;
