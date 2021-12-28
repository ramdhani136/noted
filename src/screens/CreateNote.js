import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ViewCreatNote = ({data}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState({
    date: `${moment().format('YYYY')}-${moment().format(
      'MM',
    )}-${moment().format('DD')} ${moment().format('HH:mm:ss')}`,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('Create Note');

  useEffect(() => {
    if (data.selectItem.name !== undefined) {
      setValue({
        ...value,
        name: data.selectItem.name,
        date: data.selectItem.date,
        note: data.selectItem.note,
      });
      setIsUpdate(true);
      setTitle('View Note');
    } else {
      setIsUpdate(false);
      setTitle('Create Note');
    }
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#fffafa',
        }}>
        {console.log(isUpdate)}
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
            onPress={() => {
              data.setIsActive(false);
              data.setSelectItem({});
            }}>
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
            {title}
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
        <View
          style={{
            width: '92%',
            marginHorizontal: '4%',
            marginTop: 10,
          }}>
          <TextInput
            onChangeText={text => setValue({...value, name: text})}
            value={value.name}
            placeholder="Title"
            style={{
              borderBottomWidth: 1,
              borderColor: '#ddd',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          />
          <TextInput
            onChangeText={text => setValue({...value, note: text})}
            value={value.note}
            multiline={true}
            numberOfLines={23}
            placeholder="Note"
            style={{
              //   borderBottomWidth: 1,
              //   borderColor: '#ddd',
              fontSize: 16,
              textAlignVertical: 'top',
            }}
          />
        </View>
        {console.log(value)}
      </SafeAreaView>
    </>
  );
};

const CreateNote = ({isActive, setIsActive, selectItem, setSelectItem}) => {
  return (
    <Modal
      animationType="slide"
      visible={isActive}
      onRequestClose={() => {
        setIsActive(!isActive);
        setSelectItem({});
      }}>
      <Layout
        Child={ViewCreatNote}
        data={{
          isActive: isActive,
          setIsActive: setIsActive,
          selectItem: selectItem,
          setSelectItem: setSelectItem,
        }}
      />
    </Modal>
  );
};

export default CreateNote;
