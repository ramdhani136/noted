import React from 'react';
import {View, Text, Modal, Dimensions, TouchableOpacity} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const CreateNote = ({isActive, setIsActive}) => {
  const navigation = useNavigation();
  const ViewCreatNote = () => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#fffafa',
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',

            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setIsActive(!isActive)}>
            <AntDesign
              name="arrowleft"
              style={{
                marginLeft: 10,
                fontSize: 25,
                color: '#ff6d6d',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 17,
              color: '#555',
              flex: 1,
              textAlign: 'center',
            }}>
            Create Note
          </Text>
          <TouchableOpacity
            style={{flex: 1}}
            //    onPress={PressCheckIcon}
          >
            <AntDesign
              name="check"
              style={{
                marginLeft: 75,
                fontSize: 25,
                color: '#ff6d6d',
                textAlign: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="fadeIn"
      visible={isActive}
      onRequestClose={() => {
        setIsActive(!isActive);
      }}>
      <Layout Child={ViewCreatNote} />
    </Modal>
  );
};

export default CreateNote;
