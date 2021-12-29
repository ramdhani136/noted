import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {Layout} from '../components/organism';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import {API_URL} from '../config';

const Loading = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const ViewCreatNote = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [idnote, setId] = useState(null);
  const navigation = useNavigation();
  const [valueDefault, setValueDefault] = useState({});
  const [value, setValue] = useState({
    date: `${moment().format('YYYY')}-${moment().format(
      'MM',
    )}-${moment().format('DD')} ${moment().format('HH:mm:ss')}`,
    id_user: 1,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('Create Note');

  const onSubmit = () => {
    setIsLoading(true);
    if (
      value.name === '' ||
      value.name === null ||
      value.name === undefined ||
      value.note === '' ||
      value.note === null ||
      value.note === undefined
    ) {
      Alert.alert('Error', 'Check your data!');
      setIsLoading(false);
    } else {
      if (!isUpdate) {
        axios
          .post(`${API_URL}notes`, value)
          .then(res => {
            data.getNotes();
            data.setIsActive(false);
            data.setSelectItem({});
            setIsLoading(false);
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            setIsLoading(false);
            Alert.alert('Error', 'Check your data!');
          });
      } else {
        getUpdate();
      }
    }
  };

  const getUpdate = () => {
    if (JSON.stringify(value) !== JSON.stringify(valueDefault)) {
      axios
        .put(`${API_URL}notes/${idnote}`, value)
        .then(res => {
          data.getNotes();
          data.setIsActive(false);
          data.setSelectItem({});
          setIsLoading(false);
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          setIsLoading(false);
          Alert.alert('Error', 'Check your data!');
        });
    } else {
      data.setIsActive(false);
      data.setSelectItem({});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data.selectItem.name !== undefined) {
      setId(data.selectItem.id);
      setValue({
        ...value,
        name: data.selectItem.name,
        date: data.selectItem.date,
        note: data.selectItem.note,
      });
      setValueDefault({
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
      {isLoading && <Loading />}
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
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
          <TouchableOpacity style={{flex: 1}} onPress={onSubmit}>
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
          <ScrollView style={{height: '81%'}}>
            <TextInput
              onChangeText={text => setValue({...value, note: text})}
              value={value.note}
              multiline={true}
              numberOfLines={22}
              placeholder="Note"
              style={{
                //   borderBottomWidth: 1,
                //   borderColor: '#ddd',
                fontSize: 16,
                textAlignVertical: 'top',
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const CreateNote = ({
  isActive,
  setIsActive,
  selectItem,
  setSelectItem,
  getNotes,
}) => {
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
          getNotes: getNotes,
        }}
      />
    </Modal>
  );
};

export default CreateNote;
